import React from "react";

const Announcements = ({ announcements }) => {
  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        //{" "}
        <h2 className="text-lg font-semibold text-gray-700 mb-3">
          Announcements
        </h2>
        //{" "}
        {/* {announcements.map((announcement) => ( */}
          <div
            // key={announcement._id}
            className="bg-white rounded-lg shadow p-4 mb-2"
          >
            <div className="flex items-start">
           <img src="" alt="" />
              <div>
                <h3 className="font-medium text-lg">d</h3>
                <p className="text-gray-600">ddd</p>
                <div className="text-sm text-gray-500 mt-1">
                  Posted by gg
                </div>
              </div>
            </div>
          </div>
        {/* ))} */}
      </div>
    </div>
    //   <div>
    //       {announcements.length > 0 && (
    //   <div className="bg-yellow-50 border-l-4 border-yellow-400">
    //     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
    //       <h2 className="text-lg font-semibold text-gray-700 mb-3">Announcements</h2>
    //       {announcements.map(announcement => (
    //         <div key={announcement._id} className="bg-white rounded-lg shadow p-4 mb-2">
    //           <div className="flex items-start">
    //             <img
    //               src={announcement.author.image}
    //               alt={announcement.author.name}
    //               className="w-10 h-10 rounded-full mr-4"
    //             />
    //             <div>
    //               <h3 className="font-medium text-lg">{announcement.title}</h3>
    //               <p className="text-gray-600">{announcement.description}</p>
    //               <div className="text-sm text-gray-500 mt-1">Posted by {announcement.author.name}</div>
    //             </div>
    //           </div>
    //         </div>
    //       ))}
    //     </div>
    //   </div>
    // )}
    //   </div>
  );
};

export default Announcements;
