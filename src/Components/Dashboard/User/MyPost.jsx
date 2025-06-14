import React, { useState } from "react";
import useAuth from "../../../Authentication/UseAuth";
import { useQuery } from "@tanstack/react-query";
import UseaxiosPublic from "../../../Hooks/UseaxiosPublic";
import { Heart, MessageCircle, PlusCircle } from "lucide-react";
import { Link } from "react-router";
import Swal from "sweetalert2";

import axios from "axios";

const MyPost = () => {
  const { user } = useAuth();
  const axiosPublic = UseaxiosPublic();
  const [showComments, setShowComments] = useState(false);

  const { data: myPost = [], isLoading,refetch } = useQuery({
    queryKey: ["myPost"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/myPost/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });
  console.log(myPost);

  const handleToggleComments = () => {
    setShowComments(!showComments);
  };




const handleDelete = (id) => {
  console.log("Deleting post with ID:", id);

  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    if (result.isConfirmed) {
      axiosPublic
        .delete(`/deletepost/${id}`)  // <-- Make sure the slash is correct
        .then(() => {
          Swal.fire({
            title: "Deleted!",
            text: "Your post has been deleted.",
            icon: "success"
          });
          refetch()
          // Optional: you can refetch posts or update UI here
        })
        .catch((error) => {
          Swal.fire({
            title: "Error!",
            text: "Failed to delete the post.",
            icon: "error"
          });
          console.error("Delete error:", error);
        });
    }
  });
};


  return (
    <div className="w-full  mt-8 max-w-5xl mx-auto p-4">
      {/* Add Post Section */}
      <Link to="/dashboard/addpost">
        <div className="mb-6">
          <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl shadow-sm">
            <PlusCircle size={20} />
            Add New Post
          </button>
        </div>
      </Link>
      {/* Posts List */}
      {myPost.map((post) => (
        <div
          key={post._id}
          className="bg-white w-full rounded-xl shadow-md p-6 "
        >
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-gray-200 rounded-full mr-3 flex items-center justify-center text-gray-700 font-semibold">
              {post.author?.name?.[0]?.toUpperCase() || "U"}
            </div>
            <div>
              <p className="font-semibold text-gray-800">
                {post.author?.name || "Unknown"}
              </p>
              <p className="text-xs text-gray-500">
                {new Date(post.createdAt).toLocaleString()}
              </p>
            </div>
          </div>

          <h3 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h3>
          <p className="text-gray-700 mb-4 line-clamp-3">{post.content}</p>

          {post.image && (
            <div className="w-full h-60 mb-4">
              <img
                src={post.image}
                alt="Post"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
          )}

          <div className="flex items-center text-sm text-gray-600 gap-6">
            <div className="flex items-center">
              <Heart className="mr-1 text-red-500" size={18} />
              {post.likes || 0}
            </div>
            <div>
              <div>
                {/* Comment Button */}

                <div>
                  {/* Toggle Comment Button */}
                  <div
                    className="flex items-center cursor-pointer hover:opacity-80 transition"
                    onClick={handleToggleComments}
                  >
                    <MessageCircle className="mr-2 text-indigo-500" size={18} />
                    <span className="text-sm text-gray-700">
                      {post.comments?.length || 0}
                    </span>
                  </div>

                  {/* Comments Section */}
                  {showComments && (
                    <div className="mt-4 space-y-4 ">
                      {post.comments && post.comments.length > 0 ? (
                        post.comments.map((comment, index) => (
                          <div key={index} className="flex gap-3 items-start">
                            {/* Author Image */}
                            {comment.author.image ? (
                              <img
                                src={comment.author.image}
                                alt={comment.author.name}
                                className="w-9 h-9 rounded-full object-cover shadow-sm"
                              />
                            ) : (
                              <div className="w-5 h-9 rounded-full bg-gray-300 flex items-center justify-center text-white text-sm shadow-sm">
                                {comment.author.name?.charAt(0).toUpperCase()}
                              </div>
                            )}

                            {/* Comment Body */}
                            <div className="bg-gray-100 rounded-xl px-4 py-2 max-w-[85%] shadow-sm">
                              <div className="font-semibold text-sm text-gray-800">
                                {comment.author.name}
                              </div>
                              <div className="text-sm text-gray-700 mt-1">
                                {comment.text}
                              </div>
                              <div className="text-xs text-gray-500 mt-1">
                                {new Date(comment.createdAt).toLocaleString()}
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-gray-500 text-sm">
                          No comments yet.
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <span className="ml-auto px-2 py-1 bg-gray-100 rounded text-xs">
              #{post.tag}
            </span>
               <button onClick={()=>handleDelete (post._id)} className="btn bg-red-500 text-white">Delete Post</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyPost;
