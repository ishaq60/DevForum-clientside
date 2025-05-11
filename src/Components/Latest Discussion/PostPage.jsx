import React from "react";
import { FaThumbsDown, FaThumbsUp, FaComment } from "react-icons/fa";
import { Link } from "react-router";

const PostPage = ({ post }) => {
  // Add optional chaining and default values
  const tags = post?.tags || [];
  const author = post?.author || { image: "", name: "Unknown" };

  return (
    <Link to={`/post/${post._id}`}>
      <div>
        <div className="bg-white rounded-lg shadow-md p-6 mb-4 transition-all hover:shadow-lg">
          <div className="flex items-start">
            <img
              src={author.image}
              alt={author.name}
              className="w-10 h-10 rounded-full mr-4"
            />
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-2 text-indigo-900 hover:text-indigo-600 cursor-pointer">
                {post?.title || "Untitled Post"}
              </h3>
              <div className="flex flex-wrap gap-2 mb-3">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-indigo-100 text-indigo-800 text-xs px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center text-gray-500 text-sm">
                <span>
                  {post?.createdAt && new Date(post.createdAt).toLocaleString()}
                </span>

                <div className="mx-3 flex items-center">
                  <FaComment className="mr-1" />
                  <span>{post?.commentsCount || 0}</span>
                </div>
                <div className="flex items-center">
                  <div className="flex items-center mr-2">
                    <FaThumbsUp className="mr-1 text-green-600" />
                    <span>{post?.upVotes || 0}</span>
                  </div>
                  <div className="flex items-center">
                    <FaThumbsDown className="mr-1 text-red-600" />
                    <span>{post?.downVotes || 0}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PostPage;
