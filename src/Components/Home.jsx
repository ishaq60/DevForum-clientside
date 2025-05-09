import React, { useState, useEffect } from 'react';
import { FaBell, FaSearch, FaThumbsUp, FaThumbsDown, FaComment } from 'react-icons/fa';
import Banner from './Banner/Banner';
import Announcements from './Announcements';
import LatestDiscussion from './Latest Discussion/LatestDiscussion';
import Footer from '../layout/Footer/Footer';
import TagSection from './TagSection';

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [tags, setTags] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortByPopularity, setSortByPopularity] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  // Dummy data - replace with API calls
  useEffect(() => {
    // Fetch posts data
    setPosts([
      {
        _id: '1',
        author: { name: 'Sarah Johnson', image: '/images/avatar1.jpg' },
        title: 'Getting Started with MongoDB in MERN Applications',
        tags: ['MongoDB', 'Database', 'MERN'],
        time: '2 hours ago',
        commentCount: 8,
        upVote: 24,
        downVote: 3
      },
      {
        _id: '2',
        author: { name: 'David Chen', image: '/images/avatar2.jpg' },
        title: 'Best Practices for React Component Structure',
        tags: ['React', 'Frontend', 'JavaScript'],
        time: '5 hours ago',
        commentCount: 12,
        upVote: 45,
        downVote: 2
      },
      {
        _id: '3',
        author: { name: 'Maya Patel', image: '/images/avatar3.jpg' },
        title: 'Understanding JWT Authentication in Express',
        tags: ['JWT', 'Authentication', 'Express'],
        time: '1 day ago',
        commentCount: 6,
        upVote: 18,
        downVote: 1
      },
      {
        _id: '4',
        author: { name: 'Alex Turner', image: '/images/avatar4.jpg' },
        title: 'Creating Responsive Designs with Tailwind CSS',
        tags: ['Tailwind', 'CSS', 'Responsive'],
        time: '2 days ago',
        commentCount: 15,
        upVote: 32,
        downVote: 0
      },
      {
        _id: '5',
        author: { name: 'Jordan Lee', image: '/images/avatar5.jpg' },
        title: 'Optimizing Node.js Server Performance',
        tags: ['Node.js', 'Performance', 'Backend'],
        time: '3 days ago',
        commentCount: 9,
        upVote: 21,
        downVote: 4
      }
    ]);

    // Fetch tags
    setTags(['MongoDB', 'Express', 'React', 'Node.js', 'JavaScript', 'Frontend', 'Backend', 'Database', 'Authentication', 'Performance', 'Tailwind', 'JWT', 'API', 'Responsive']);

    // Fetch announcements
    setAnnouncements([
      {
        _id: 'a1',
        author: { name: 'Admin Team', image: '/images/admin.jpg' },
        title: 'New Forum Features Released',
        description: 'We\'ve just launched new features including improved search and tag filtering!'
      }
    ]);
  }, []);

  const handleSortToggle = () => {
    setSortByPopularity(!sortByPopularity);
    // Here you would re-sort the posts based on popularity or timestamp
  };

  const renderPosts = () => {
    let displayPosts = [...posts];
    
    if (sortByPopularity) {
      displayPosts.sort((a, b) => (b.upVote - b.downVote) - (a.upVote - a.downVote));
    }
    
    return displayPosts.map(post => (
      <div key={post._id} className="bg-white rounded-lg shadow-md p-6 mb-4 transition-all hover:shadow-lg">
        <div className="flex items-start">
          <img 
            src={post.author.image} 
            alt={post.author.name} 
            className="w-10 h-10 rounded-full mr-4"
          />
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-2 text-indigo-900 hover:text-indigo-600 cursor-pointer">
              {post.title}
            </h3>
            <div className="flex flex-wrap gap-2 mb-3">
              {post.tags.map(tag => (
                <span key={tag} className="bg-indigo-100 text-indigo-800 text-xs px-3 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex items-center text-gray-500 text-sm">
              <span>{post.time}</span>
              <div className="mx-3 flex items-center">
                <FaComment className="mr-1" />
                <span>{post.commentCount}</span>
              </div>
              <div className="flex items-center">
                <div className="flex items-center mr-2">
                  <FaThumbsUp className="mr-1 text-green-600" />
                  <span>{post.upVote}</span>
                </div>
                <div className="flex items-center">
                  <FaThumbsDown className="mr-1 text-red-600" />
                  <span>{post.downVote}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
     

      {/* Banner with Search */}
   <div className='mt-4'>
   <Banner/>
   </div>

      {/* Tags Section */}
     <TagSection tags={tags}/>

      {/* Announcements Section */}
      <Announcements announcements={announcements}></Announcements>

      {/* Main Content */}
     <LatestDiscussion renderPosts={renderPosts}/>

      {/* Footer */}
    <Footer/>
    </div>
  );
};

export default Home;