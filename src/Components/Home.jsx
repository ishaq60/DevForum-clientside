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
 
  //   return displayPosts.map(post => (
    
  //   ));
  // };

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
     <LatestDiscussion />

      {/* Footer */}
  
    </div>
  );
};

export default Home;