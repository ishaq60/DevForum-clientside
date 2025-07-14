import React, { useEffect, useState } from 'react';
import Banner from './Banner/Banner';
import PostPage from './Latest Discussion/PostPage';
import Pageination from './Pageination';
import Chatbox from './Ai chatbox/Chatbox';
import { TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import AnnouncementsComponent from './Announcements';
import TagSection from './TagSection';

import UsePost from '../Hooks/UsePost';
import UseTotaldata from '../Hooks/UseTotaldata';


const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedTag, setSelectedTag] = useState('all');
  const [Postdata, setPostdata] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
const [Postdatas]=UsePost()
  const [count]=UseTotaldata()
  console.log(Postdatas)
  
  const itemPerPage = 5; // ✅ fixed casing

  const numberOfPages = Math.max(1, Math.ceil(count / itemPerPage));
  const pages = Array.from({ length: numberOfPages }, (_, i) => i);


  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(`http://localhost:5000/posts`, {
          params: {
            q: searchTerm,
            tag: selectedTag,
            limit: itemPerPage, // ✅ use correct variable name
            page: currentPage,
          },
        });
        setPostdata(res.data.posts || []);
      } catch (err) {
        console.error(err);
        setPostdata([]);
      }
      setIsLoading(false);
    };

    fetchPosts();
  }, [searchTerm, selectedTag, currentPage]);

  const sortedPosts = [...Postdata].sort((a, b) => {
    if (sortBy === 'popularity') {
      return (b.upVotes - b.downVotes) - (a.upVotes - a.downVotes);
    }
    return 0;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mt-4">
        <Banner setSearchTerm={setSearchTerm} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm w-full  ">
            
              
                <TagSection setSelectedTag={setSelectedTag} selectedTag={selectedTag}  ></TagSection>
                <AnnouncementsComponent></AnnouncementsComponent>
              
            </div>
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
                <Link
                  to="/dashboard/addpost"
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <TrendingUp className="w-4 h-4" />
                  <span>Add Post</span>
                </Link>
              </div>
            </div>

            <PostPage Postdata={sortedPosts} isLoading={isLoading} />
            <Pageination pages={pages} numberOfPages={numberOfPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
          </div>
        </div>
      </div>


    </div>
  );
};

export default Home;
