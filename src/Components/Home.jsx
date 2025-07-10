import React, { useEffect, useState } from 'react';
import Banner from './Banner/Banner';
import PostPage from './Latest Discussion/PostPage';
import Pageination from './Pageination';
import Chatbox from './Ai chatbox/Chatbox';
import { TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom'; // ✅ correct import
import axios from 'axios';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedTag, setSelectedTag] = useState('all');
  const [Postdata, setPostdata] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const tags = [
    { id: 'all', name: 'All', count: 234 },
    { id: 'javascript', name: 'JavaScript', count: 89 },
    { id: 'react', name: 'React', count: 67 },
    { id: 'nodejs', name: 'Node.js', count: 45 },
    { id: 'mongodb', name: 'MongoDB', count: 32 },
    { id: 'express', name: 'Express', count: 28 },
    { id: 'css', name: 'CSS', count: 41 },
    { id: 'html', name: 'HTML', count: 23 },
    { id: 'technology', name: 'Technology', count: 100 },
  ];

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      
      try {
        const res = await axios.get(`http://localhost:5000/posts?q=${searchTerm}&tag=${selectedTag}`);
        // Fix here: use res.data.posts, because backend sends { posts: [...] }
        setPostdata(res.data.posts || []);
      } catch (err) {
        console.error(err);
        setPostdata([]);
      }
      setIsLoading(false);
    };

    fetchPosts();
  }, [searchTerm, selectedTag]);

  // Sort posts by popularity or keep backend ordering (newest)
  const sortedPosts = [...Postdata].sort((a, b) => {
    if (sortBy === 'popularity') {
      return (b.upVotes - b.downVotes) - (a.upVotes - a.downVotes);
    }
    return 0; // Backend handles newest order
  });
console.log(Postdata)
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mt-4">
        <Banner setSearchTerm={setSearchTerm} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
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
          </div>

          {/* Main Content */}
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
                <Link
                  to="/dashboard/addpost"
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <TrendingUp className="w-4 h-4" />
                  <span>Add Post</span>
                </Link>
              </div>
            </div>

            <PostPage Postdata={Postdata} isLoading={isLoading} />
            <Pageination />
          </div>
        </div>
      </div>

      <Chatbox />
    </div>
  );
};

export default Home;
