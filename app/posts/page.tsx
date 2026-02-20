"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Heart, MessageCircle, MapPin, Send } from "lucide-react";

interface Post {
  id: string;
  user_id: string;
  content: string;
  image_url: string | null;
  location_name: string | null;
  likes_count: number;
  comments_count: number;
  created_at: string;
  user: {
    full_name: string;
    avatar_url: string | null;
  };
}

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [newPost, setNewPost] = useState("");
  const [posting, setPosting] = useState(false);

  useEffect(() => {
    fetchPosts();

    const subscription = supabase
      .channel("posts")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "posts" },
        () => {
          fetchPosts();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from("posts")
        .select(
          `
          *,
          user:user_id (full_name, avatar_url)
        `
        )
        .order("created_at", { ascending: false })
        .limit(20);

      if (error) throw error;
      setPosts(data || []);
    } catch (err) {
      console.error("Failed to fetch posts:", err);
    } finally {
      setLoading(false);
    }
  };

  const handlePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    setPosting(true);
    try {
      const { data: session } = await supabase.auth.getSession();
      if (!session?.user) return;

      const { error } = await supabase.from("posts").insert([
        {
          user_id: session.user.id,
          content: newPost,
        },
      ]);

      if (error) throw error;

      setNewPost("");
      fetchPosts();
    } catch (err) {
      console.error("Failed to create post:", err);
    } finally {
      setPosting(false);
    }
  };

  const handleLike = async (postId: string) => {
    try {
      const post = posts.find((p) => p.id === postId);
      if (!post) return;

      const { error } = await supabase
        .from("posts")
        .update({ likes_count: post.likes_count + 1 })
        .eq("id", postId);

      if (error) throw error;
      fetchPosts();
    } catch (err) {
      console.error("Failed to like post:", err);
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-display font-bold text-foreground mb-8">
          Community Feed
        </h1>

        {/* Create Post */}
        <div className="bg-card border border-border rounded-lg p-6 mb-8">
          <form onSubmit={handlePost} className="space-y-4">
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="Share your van life moment..."
              className="w-full px-4 py-3 rounded-lg bg-input border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent resize-none"
              rows={3}
            />
            <button
              type="submit"
              disabled={posting || !newPost.trim()}
              className="px-6 py-2 rounded-lg bg-accent text-accent-foreground font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              {posting ? "Posting..." : "Post"}
            </button>
          </form>
        </div>

        {/* Posts Feed */}
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin inline-block w-8 h-8 border-4 border-border border-t-accent rounded-full"></div>
          </div>
        ) : posts.length === 0 ? (
          <div className="bg-card border border-border rounded-lg p-8 text-center">
            <p className="text-muted-foreground">No posts yet. Be the first to share!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-card border border-border rounded-lg p-6 hover:border-accent transition-colors"
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                      <span className="text-sm font-semibold text-accent">
                        {post.user.full_name[0]}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">
                        {post.user.full_name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(post.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <p className="text-foreground mb-4">{post.content}</p>

                {/* Location */}
                {post.location_name && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <MapPin className="w-4 h-4" />
                    {post.location_name}
                  </div>
                )}

                {/* Image */}
                {post.image_url && (
                  <img
                    src={post.image_url}
                    alt="Post"
                    className="w-full rounded-lg mb-4 max-h-96 object-cover"
                  />
                )}

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <button
                    onClick={() => handleLike(post.id)}
                    className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors"
                  >
                    <Heart className="w-5 h-5" />
                    <span className="text-sm">{post.likes_count}</span>
                  </button>
                  <button className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors">
                    <MessageCircle className="w-5 h-5" />
                    <span className="text-sm">{post.comments_count}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
