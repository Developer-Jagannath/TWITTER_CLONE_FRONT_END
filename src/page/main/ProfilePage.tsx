import { useState } from 'react';
import { User, Edit2, Calendar, MapPin } from 'lucide-react';
import ButtonUI from '@/components/ui/ButtonUI';

const mockProfile = {
  name: 'John Doe',
  username: 'johndoe',
  bio: 'Web developer. Coffee lover. 🚀',
  avatar: '',
  cover: '',
  location: 'San Francisco, CA',
  joined: 'January 2022',
  followers: 123,
  following: 89,
};

const mockTweets = [
  {
    id: 1,
    content: 'Excited to join Twitter Clone! #hello',
    image: '',
    createdAt: '1h ago',
  },
  {
    id: 2,
    content: 'Working on a new project. Stay tuned! 🔥',
    image: '',
    createdAt: '3h ago',
  },
];

const tabs = [
  { key: 'tweets', label: 'Tweets' },
  { key: 'replies', label: 'Replies' },
  { key: 'media', label: 'Media' },
  { key: 'likes', label: 'Likes' },
];

function ProfilePage() {
  const [activeTab, setActiveTab] = useState('tweets');

  return (
    <div className="max-w-2xl mx-auto w-full bg-white rounded-xl shadow-sm overflow-hidden">
      {/* Cover Image */}
      <div className="relative h-48 bg-gradient-to-r from-blue-400 to-indigo-500">
        {mockProfile.cover ? (
          <img
            src={mockProfile.cover}
            alt="Cover"
            className="object-cover w-full h-full"
          />
        ) : null}
        {/* Avatar */}
        <div className="absolute -bottom-12 left-6">
          <div className="w-24 h-24 rounded-full border-4 border-white bg-gray-200 flex items-center justify-center overflow-hidden shadow-lg">
            {mockProfile.avatar ? (
              <img src={mockProfile.avatar} alt="Avatar" className="object-cover w-full h-full" />
            ) : (
              <User className="w-12 h-12 text-gray-400" />
            )}
          </div>
        </div>
      </div>

      {/* Profile Info */}
      <div className="pt-16 px-6 pb-4 border-b border-gray-100 relative">
        <div className="flex justify-end">
          <ButtonUI className="flex items-center gap-2 px-5 py-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white font-semibold text-sm">
            <Edit2 className="w-4 h-4" /> Edit Profile
          </ButtonUI>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mt-2">{mockProfile.name}</h2>
        <div className="text-gray-500 text-base mb-2">@{mockProfile.username}</div>
        <div className="text-gray-700 mb-2 whitespace-pre-line">{mockProfile.bio}</div>
        <div className="flex items-center gap-4 text-gray-500 text-sm mb-2">
          <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {mockProfile.location}</span>
          <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> Joined {mockProfile.joined}</span>
        </div>
        <div className="flex gap-6 text-sm">
          <span><span className="font-bold text-gray-900">{mockProfile.following}</span> <span className="text-gray-500">Following</span></span>
          <span><span className="font-bold text-gray-900">{mockProfile.followers}</span> <span className="text-gray-500">Followers</span></span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-100 bg-white sticky top-0 z-10">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`flex-1 py-3 text-center font-semibold transition-colors ${
              activeTab === tab.key
                ? 'border-b-2 border-blue-500 text-blue-600 bg-blue-50'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tweets Feed */}
      <div className="divide-y divide-gray-100 bg-white">
        {activeTab === 'tweets' && mockTweets.length === 0 && (
          <div className="text-center text-gray-500 py-12">No tweets yet.</div>
        )}
        {activeTab === 'tweets' && mockTweets.map((tweet) => (
          <div key={tweet.id} className="flex gap-3 p-6">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-gray-600" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-gray-900 truncate">{mockProfile.name}</span>
                <span className="text-gray-500 text-sm truncate">@{mockProfile.username}</span>
                <span className="text-gray-400 text-xs ml-auto">{tweet.createdAt}</span>
              </div>
              <div className="text-gray-800 text-base mb-2 whitespace-pre-line break-words">
                {tweet.content}
              </div>
              {tweet.image && (
                <img
                  src={tweet.image}
                  alt="Tweet"
                  className="max-h-64 rounded-xl border border-gray-200 shadow-sm mt-2"
                />
              )}
            </div>
          </div>
        ))}
        {/* Add more tab content for replies, media, likes as needed */}
      </div>
    </div>
  );
}

export default ProfilePage;