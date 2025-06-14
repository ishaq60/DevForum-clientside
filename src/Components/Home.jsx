import React, { useState } from 'react';
import Banner from './Banner/Banner';
import AnnouncementsComponent from './Announcements';
import LatestDiscussion from './Latest Discussion/LatestDiscussion';
import Footer from '../layout/Footer/Footer';
import UsePost from '../Hooks/UsePost';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [posts, , isLoading] = UsePost();

 
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner with Search - pass setSearchTerm to allow search */}
      <div className='mt-4'>
        <Banner  setSearchTerm={setSearchTerm}  />
      </div>

      {/* Announcements Section */}
      <AnnouncementsComponent />

      {/* Main Content - Pass filtered posts to LatestDiscussion */}
      <LatestDiscussion searchTerm={searchTerm} isLoading={isLoading} />

      {/* Footer */}
   
    </div>
  );
};

export default Home;
