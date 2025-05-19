'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Post {
  _id: string;
  title: string;
  content: string;
  user: {
    _id: string;
    name: string;
  };
  likes: string[];
  comments: {
    _id: string;
    user: {
      _id: string;
      name: string;
    };
    content: string;
    createdAt: string;
  }[];
  tags: string[];
  createdAt: string;
}

const CommunityForum = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/community');

        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }

        const data = await response.json();
        setPosts(data.data);
      } catch (err: any) {
        setError(err.message || 'An error occurred while fetching posts');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/auth/login');
        return;
      }

      const response = await fetch('http://localhost:5000/api/community', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          content,
          tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create post');
      }

      const data = await response.json();
      
      // Add new post to the list
      setPosts([data.data, ...posts]);
      
      // Reset form
      setTitle('');
      setContent('');
      setTags('');
      setShowNewPostForm(false);
    } catch (err: any) {
      setError(err.message || 'An error occurred while creating post');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Community Forum</h2>
        <button
          onClick={() => setShowNewPostForm(!showNewPostForm)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          {showNewPostForm ? 'Cancel' : 'New Post'}
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-md">{error}</div>
      )}

      {showNewPostForm && (
        <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Create New Post</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="title" className="block text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="content" className="block text-gray-700 mb-2">
                Content
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={5}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              ></textarea>
            </div>
            <div className="mb-6">
              <label htmlFor="tags" className="block text-gray-700 mb-2">
                Tags (comma separated)
              </label>
              <input
                type="text"
                id="tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="e.g. tips, motivation, question"
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {submitting ? 'Posting...' : 'Post'}
            </button>
          </form>
        </div>
      )}

      {posts.length === 0 ? (
        <div className="p-6 bg-white rounded-lg shadow-md text-center">
          <p className="text-gray-600">No posts yet. Be the first to share your thoughts!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <div key={post._id} className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">
                <Link href={`/community/${post._id}`} className="text-indigo-600 hover:text-indigo-800">
                  {post.title}
                </Link>
              </h3>
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <span>Posted by {post.user.name}</span>
                <span className="mx-2">•</span>
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
              </div>
              <p className="text-gray-700 mb-4">
                {post.content.length > 200 
                  ? `${post.content.substring(0, 200)}...` 
                  : post.content}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <span 
                    key={tag} 
                    className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <span>{post.likes.length} likes</span>
                <span className="mx-2">•</span>
                <span>{post.comments.length} comments</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommunityForum;
