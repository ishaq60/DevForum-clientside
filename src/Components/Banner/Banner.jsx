import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import bannerImage2 from "../../assets/2.jpg";

const Banner = ({ setSearchTerm }) => {
  const popularTopics = ["Helpdesk", "Introduction", "Payment"];
  const [input, setInput] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchTerm(input);
  };

  const handleTopicClick = (topic) => {
    setInput(topic);
    setSearchTerm(topic);
  };

  // ✅ Automatically reset search when input is cleared
  useEffect(() => {
    if (input.trim() === "") {
      setSearchTerm(""); // triggers full data reload
    }
  }, [input, setSearchTerm]);

  return (
    <div className="relative w-full h-[450px] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${bannerImage2})`,
          filter: "brightness(0.4)",
        }}
      />
      <div className="relative flex flex-col items-center justify-center h-full px-4 py-8 text-white z-10">
        <h2 className="text-3xl font-bold mb-2">Join the Conversation</h2>
        <p className="text-lg mb-6 text-center max-w-lg">
          Connect with developers, share knowledge, and explore new ideas in our
          community forum.
        </p>

        {/* Search bar */}
        <div className="w-full max-w-lg">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search for Topics..."
              className="w-full py-3 px-4 pl-12 rounded-full bg-gray-800 bg-opacity-60 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search size={20} className="text-gray-400" />
            </div>
          </form>
        </div>

        {/* Popular topics */}
        <div className="mt-4 flex items-center space-x-2">
          <span className="text-sm text-gray-300">Popular topics:</span>
          {popularTopics.map((topic, index) => (
            <button
              key={index}
              onClick={() => handleTopicClick(topic)}
              className="text-sm px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded-full transition duration-200"
            >
              {topic}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;
