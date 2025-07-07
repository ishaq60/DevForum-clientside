import React, { useState } from 'react';
import { Search, Bell, User, MessageCircle, ArrowUp, ArrowDown, Share2, Clock, Filter, TrendingUp } from 'lucide-react';

const ForumHomepage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedTag, setSelectedTag] = useState('all');

  // Sample data
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

//   const posts = [
//     {
//       id: 1,
//       title: "How to implement JWT authentication in MERN stack applications",
//       description: "A comprehensive guide covering JWT token generation, verification, and secure authentication practices for modern web applications...",
//       author: {
//         name: "Sarah Johnson",
//         image: "https://images.unsplash.com/photo-1494790108755-2616b332c1ec?w=150&h=150&fit=crop&crop=face",
//         badge: "gold"
//       },
//       tags: ["javascript", "nodejs", "jwt"],
//       time: "2 hours ago",
//       votes: { up: 24, down: 3 },
//       comments: 12,
//       isPopular: true
//     },
//     {
//       id: 2,
//       title: "React Hooks vs Class Components: When to use what?",
//       description: "Exploring the differences between React Hooks and Class Components, with practical examples and best practices...",
//       author: {
//         name: "Michael Chen",
//         image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
//         badge: "bronze"
//       },
//       tags: ["react", "javascript"],
//       time: "4 hours ago",
//       votes: { up: 18, down: 2 },
//       comments: 8,
//       isPopular: false
//     },
//     {
//       id: 3,
//       title: "MongoDB Aggregation Pipeline: Advanced Queries Made Simple",
//       description: "Master complex data operations with MongoDB's aggregation framework. Learn about stages, operators, and optimization techniques...",
//       author: {
//         name: "Emma Williams",
//         image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
//         badge: "gold"
//       },
//       tags: ["mongodb", "database"],
//       time: "6 hours ago",
//       votes: { up: 31, down: 1 },
//       comments: 15,
//       isPopular: true
//     },
//     {
//       id: 4,
//       title: "Building RESTful APIs with Express.js and Middleware",
//       description: "Learn how to create robust REST APIs using Express.js, including error handling, validation, and security middleware...",
//       author: {
//         name: "David Rodriguez",
//         image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
//         badge: "bronze"
//       },
//       tags: ["express", "nodejs", "api"],
//       time: "8 hours ago",
//       votes: { up: 22, down: 4 },
//       comments: 9,
//       isPopular: false
//     },
//     {
//       id: 5,
//       title: "CSS Grid vs Flexbox: Complete Layout Guide",
//       description: "Understanding when to use CSS Grid vs Flexbox for modern web layouts. Includes practical examples and responsive design patterns...",
//       author: {
//         name: "Lisa Zhang",
//         image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
//         badge: "gold"
//       },
//       tags: ["css", "html", "responsive"],
//       time: "12 hours ago",
//       votes: { up: 45, down: 2 },
//       comments: 23,
//       isPopular: true
//     }
//   ];

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

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesTag = selectedTag === 'all' || post.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sortBy === 'popularity') {
      return (b.votes.up - b.votes.down) - (a.votes.up - a.votes.down);
    }
    return 0; // Default newest first
  });

  const getBadgeColor = (badge) => {
    switch (badge) {
      case 'gold': return 'bg-yellow-400 text-yellow-900';
      case 'bronze': return 'bg-amber-600 text-amber-100';
      default: return 'bg-gray-400 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">F</span>
                </div>
                <span className="text-xl font-bold text-gray-900">DevForum</span>
              </div>
              <div className="hidden md:flex items-center space-x-6">
                <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Home</a>
                <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Membership</a>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Bell className="w-6 h-6 text-gray-600 hover:text-blue-600 cursor-pointer" />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {announcements.length}
                </span>
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Join Us
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Welcome to DevForum
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Share knowledge, ask questions, and grow together
          </p>
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search posts by tags or keywords..."
                className="w-full pl-12 pr-4 py-3 bg-white text-gray-900 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Tags Section */}
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

            {/* Announcements */}
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

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Sort Controls */}
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

            {/* Posts Grid */}
            <div className="space-y-6">
              {sortedPosts.map(post => (
                <div
                  key={post.id}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 overflow-hidden"
                >
                  <div className="p-6">
                    {/* Author Info */}
                    <div className="flex items-center space-x-4 mb-4">
                      <img
                        src={post.author.image}
                        alt={post.author.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium text-gray-900">{post.author.name}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getBadgeColor(post.author.badge)}`}>
                            {post.author.badge}
                          </span>
                          {post.isPopular && (
                            <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                              Popular
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
                          <Clock className="w-4 h-4" />
                          <span>{post.time}</span>
                        </div>
                      </div>
                    </div>

                    {/* Post Content */}
                    <div className="mb-4">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-blue-600 cursor-pointer">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 line-clamp-2">{post.description}</p>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center space-x-6">
                        <div className="flex items-center space-x-2">
                          <button className="flex items-center space-x-1 text-gray-500 hover:text-green-600 transition-colors">
                            <ArrowUp className="w-5 h-5" />
                            <span className="text-sm font-medium">{post.votes.up}</span>
                          </button>
                          <button className="flex items-center space-x-1 text-gray-500 hover:text-red-600 transition-colors">
                            <ArrowDown className="w-5 h-5" />
                            <span className="text-sm font-medium">{post.votes.down}</span>
                          </button>
                        </div>
                        <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-600 transition-colors">
                          <MessageCircle className="w-5 h-5" />
                          <span className="text-sm font-medium">{post.comments} comments</span>
                        </button>
                      </div>
                      <button className="flex items-center space-x-2 text-gray-500 hover:text-purple-600 transition-colors">
                        <Share2 className="w-5 h-5" />
                        <span className="text-sm font-medium">Share</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex justify-center">
              <nav className="flex items-center space-x-2">
                <button className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">
                  Previous
                </button>
                <button className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium">
                  1
                </button>
                <button className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">
                  2
                </button>
                <button className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">
                  3
                </button>
                <button className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">
                  Next
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForumHomepage;