import React, { useRef, useState } from 'react';
import { X, User, ImagePlus } from 'lucide-react';
import ButtonUI from '@/components/ui/ButtonUI';

const mockPosts = [
  {
    id: 1,
    user: {
      name: 'John Doe',
      username: 'johndoe',
      avatar: '',
    },
    content: 'This is my first tweet! 🚀',
    image: '',
    createdAt: '2m ago',
  },
  {
    id: 2,
    user: {
      name: 'Jane Smith',
      username: 'janesmith',
      avatar: '',
    },
    content: 'Hello Twitter Clone! #firstpost',
    image: '',
    createdAt: '5m ago',
  },
];

function HomePage() {
  const [tab, setTab] = useState<'forYou' | 'following'>('forYou');
  const [tweet, setTweet] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [posts, setPosts] = useState(mockPosts);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTabChange = (tab: 'forYou' | 'following') => setTab(tab);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setImage(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handlePost = () => {
    if (!tweet.trim() && !image) return;
    setPosts([
      {
        id: Date.now(),
        user: {
          name: 'John Doe',
          username: 'johndoe',
          avatar: '',
        },
        content: tweet,
        image: image || '',
        createdAt: 'now',
      },
      ...posts,
    ]);
    setTweet('');
    setImage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="max-w-xl mx-auto w-full">
      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-2 sticky top-0 bg-white z-10">
        <button
          className={`flex-1 py-3 text-center font-semibold transition-colors ${
            tab === 'forYou'
              ? 'border-b-2 border-blue-500 text-blue-600 bg-blue-50'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
          onClick={() => handleTabChange('forYou')}
        >
          For you
        </button>
        <button
          className={`flex-1 py-3 text-center font-semibold transition-colors ${
            tab === 'following'
              ? 'border-b-2 border-blue-500 text-blue-600 bg-blue-50'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
          onClick={() => handleTabChange('following')}
        >
          Following
        </button>
      </div>

      {/* Tweet Input */}
      {tab === 'forYou' && (
        <div className="flex gap-3 p-4 border-b border-gray-200 bg-white">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-gray-600" />
            </div>
          </div>
          <div className="flex-1">
            <textarea
              className="w-full border-none outline-none resize-none text-base bg-transparent placeholder-gray-500 min-h-[48px] max-h-32"
              rows={2}
              maxLength={280}
              placeholder="What's happening?"
              value={tweet}
              onChange={(e) => setTweet(e.target.value)}
            />
            {image && (
              <div className="relative mt-2 w-fit">
                <img
                  src={image}
                  alt="Preview"
                  className="max-h-48 rounded-xl border border-gray-200 shadow-sm"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-1 right-1 bg-white/80 rounded-full p-1 text-gray-500 hover:text-red-500"
                  title="Remove image"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}
            <div className="flex items-center justify-between mt-2">
              <div>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="p-2 rounded-full hover:bg-blue-50 text-blue-500 transition-colors"
                  title="Add image"
                >
                  <ImagePlus className="w-5 h-5" />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </div>
              <ButtonUI
                className="px-6 py-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white font-semibold disabled:opacity-60"
                onClick={handlePost}
                disabled={!tweet.trim() && !image}
              >
                Post
              </ButtonUI>
            </div>
          </div>
        </div>
      )}

      {/* Feed */}
      <div className="divide-y divide-gray-200 bg-white">
        {posts.length === 0 ? (
          <div className="text-center text-gray-500 py-12">No posts yet.</div>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="flex gap-3 p-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-gray-600" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-gray-900 truncate">{post.user.name}</span>
                  <span className="text-gray-500 text-sm truncate">@{post.user.username}</span>
                  <span className="text-gray-400 text-xs ml-auto">{post.createdAt}</span>
                </div>
                <div className="text-gray-800 text-base mb-2 whitespace-pre-line break-words">
                  {post.content}
                </div>
                {post.image && (
                  <img
                    src={post.image}
                    alt="Tweet"
                    className="max-h-64 rounded-xl border border-gray-200 shadow-sm mt-2"
                  />
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default HomePage;