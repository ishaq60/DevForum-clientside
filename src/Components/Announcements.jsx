import React, { useState } from "react";
import { Bell, Calendar, ChevronRight, ExternalLink } from "lucide-react";
import UseAnnouncement from "../Hooks/UseAnnouncement";

const AnnouncementsComponent = () => {
  const [showAll, setShowAll] = useState(false); // toggle state
  const [announcements] = UseAnnouncement();

  // Toggle view all / view less
  const handleToggle = () => {
    setShowAll(prev => !prev);
  };

  // Badge display
  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "high":
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">High Priority</span>;
      case "medium":
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">Medium</span>;
      default:
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">Low</span>;
    }
  };

  // Icon display
  const getAnnouncementIcon = (type) => {
    switch (type) {
      case "maintenance":
        return <div className="p-2 bg-blue-100 rounded-full"><Bell size={18} className="text-blue-600" /></div>;
      case "feature":
        return <div className="p-2 bg-green-100 rounded-full"><ExternalLink size={18} className="text-green-600" /></div>;
      case "policy":
        return <div className="p-2 bg-purple-100 rounded-full"><Calendar size={18} className="text-purple-600" /></div>;
      default:
        return <div className="p-2 bg-gray-100 rounded-full"><Bell size={18} className="text-gray-600" /></div>;
    }
  };

  return (
    <div className="bg-gray-50 w-full  mt-12">
      <div className=" mx-auto ">
        <div className="flex gap-2 justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Announcements</h2>
          {announcements.length > 1 && (
            <button
              onClick={handleToggle}
              className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center"
            >
              {showAll ? "Show Less" : "View All"} <ChevronRight size={16} />
            </button>
          )}
        </div>

        {announcements.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <Bell size={36} className="mx-auto text-gray-400 mb-2" />
            <p className="text-gray-500">No announcements at this time</p>
          </div>
        ) : (
          <div className="space-y-4 z-50 relative">
            {(showAll ? announcements : announcements.slice(0, 1)).map((announcement) => (
              <div
                key={announcement._id}
                className="bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-300 p-4"
              >
                <div className="flex">
                  <div className="mr-4 mt-1">
                    {getAnnouncementIcon(announcement.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-lg text-gray-800">
                        {announcement.title}
                      </h3>
                      {getPriorityBadge(announcement.priority)}
                    </div>
                    <p className="text-gray-600 my-2">{announcement.description}</p>
                    <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
                      <div className="flex items-center">
                        <img
                          src={announcement?.image}
                          alt={announcement.author.name}
                          className="w-8 h-8 rounded-full mr-2"
                        />
                        <div>
                          <div className="text-sm font-medium text-gray-700">{announcement.author.name}</div>
                          <div className="text-xs text-gray-500">{announcement.author.role}</div>
                        </div>
                      </div>
                      
                    </div>
                    <div className="text-sm text-gray-500 flex items-center">
                        <Calendar size={14} className="mr-1" />
                        {announcement.date}
                      </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AnnouncementsComponent;
