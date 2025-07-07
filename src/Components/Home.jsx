import React, { useState } from 'react';
import Banner from './Banner/Banner';
import AnnouncementsComponent from './Announcements';
import LatestDiscussion from './Latest Discussion/LatestDiscussion';
import Footer from '../layout/Footer/Footer';
import UsePost from '../Hooks/UsePost';

import { Search, Bell, User, MessageCircle, ArrowUp, ArrowDown, Share2, Clock, Filter, TrendingUp, Bot, Send, X, Minimize2 } from 'lucide-react';
import PostPage from './Latest Discussion/PostPage';
import Pageination from './Pageination';
import Chatbox from './Ai chatbox/Chatbox';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedTag, setSelectedTag] = useState('all');
 
  const tags = [
    { id: 'all', name: 'All', count: 234 },
    { id: 'javascript', name: 'JavaScript', count: 89 },
    { id: 'react', name: 'React', count: 67 },
    { id: 'nodejs', name: 'Node.js', count: 45 },
    { id: 'mongodb', name: 'MongoDB', count: 32 },
    { id: 'express', name: 'Express', count: 28 },
    { id: 'css', name: 'CSS', count: 41 },
    { id: 'html', name: 'HTML', count: 23 }
  ];

  const [Postdata, isLoading] = UsePost();

  const announcements = [
    {
      id: 1,
      title: "New Forum Features Released!",
      description: "We've added new voting and commenting features to enhance your experience."
    },
    {
      id: 2,
      title: "Weekly Code Challenge",
      description: "Join our weekly coding challenge and win exciting prizes!"
    }
  ];

  const filteredPosts = Postdata?.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesTag = selectedTag === 'all' || post.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sortBy === 'popularity') {
      return (b.votes.up - b.votes.down) - (a.votes.up - a.votes.down);
    }
    return 0;
  });

  const getBadgeColor = (badge) => {
    switch (badge) {
      case 'gold': return 'bg-yellow-400 text-yellow-900';
      case 'bronze': return 'bg-amber-600 text-amber-100';
      default: return 'bg-gray-400 text-gray-800';
    }
  };

 
  return (
    <div className="min-h-screen bg-gray-50">
      <div className='mt-4'>
        <Banner setSearchTerm={setSearchTerm} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Tags</h3>
              <div className="flex flex-wrap gap-2">
                {tags.map(tag => (
                  <button
                    key={tag.id}
                    onClick={() => setSelectedTag(tag.id)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      selectedTag === tag.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {tag.name} ({tag.count})
                  </button>
                ))}
              </div>
            </div>

            {announcements.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Announcements</h3>
                <div className="space-y-4">
                  {announcements.map(announcement => (
                    <div key={announcement.id} className="border-l-4 border-blue-500 pl-4 py-2">
                      <h4 className="font-medium text-gray-900">{announcement.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{announcement.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-3">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <h2 className="text-2xl font-bold text-gray-900">Latest Discussions</h2>
              <div className="flex items-center space-x-3">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="newest">Newest First</option>
                  <option value="popularity">Most Popular</option>
                </select>
                <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <TrendingUp className="w-4 h-4" />
                  <span>Sort by Popularity</span>
                </button>
              </div>
            </div>

            <PostPage posts={sortedPosts} isLoading={isLoading}></PostPage>
            <Pageination></Pageination>
          </div>
        </div>
      </div>
<Chatbox></Chatbox>
   
    </div>
  );
};

export default Home;
