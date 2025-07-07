import React from 'react';

const Announsment = () => {
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

    return (
        <div>
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
    );
};

export default Announsment;