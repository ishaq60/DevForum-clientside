





import { ArrowDown, ArrowUp, Clock,  MessageCircle, Share2 } from "lucide-react";
import { Link } from "react-router";


const PostPage = ({Postdata}) => {
 
console.log(Postdata)
  const getBadgeColor = (badge) => {
    switch (badge) {
      case "gold":
        return "bg-yellow-400 text-yellow-900";
      case "bronze":
        return "bg-amber-600 text-amber-100";
      default:
        return "bg-gray-400 text-gray-800";
    }
  };

  return (
    <div className="space-y-6 relative">
      {Postdata?.map((post) => (
       <Link to={`/post/${post._id}`}>
       
        <div
          key={post.id}
          className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 overflow-hidden"
        >
          <div className="p-6">
            {/* Author Info */}
            <div className="flex items-center space-x-4 mb-4">
              <img
                src={post.author?.image || ""}
                alt={post.author?.name || "Unknown"}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h4 className="font-medium text-gray-900">
                    {post.author?.name || "Unknown"}
                  </h4>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getBadgeColor(
                      post.author?.badge
                    )}`}
                  >
                    {post.author?.badge || "N/A"}
                  </span>
                  {post.isPopular && (
                    <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                      Popular
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
                  <Clock className="w-4 h-4" />
                  <span>{post.time || ""}</span>
                </div>
              </div>
            </div>

            {/* Post Content */}
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-blue-600 cursor-pointer">
                {post.title}
              </h3>
              <p className="text-gray-600 line-clamp-2">{post.description}</p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {(post.tags || []).map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <button className="flex items-center space-x-1 text-gray-500 hover:text-green-600 transition-colors">
                    <ArrowUp className="w-5 h-5" />
                    <span className="text-sm font-medium">{post?.upVotes || 0}</span>
                  </button>
                  <button className="flex items-center space-x-1 text-gray-500 hover:text-red-600 transition-colors">
                    <ArrowDown className="w-5 h-5" />
                    <span className="text-sm font-medium">{post?.downVotes || 0}</span>
                  </button>
                </div>
                <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-600 transition-colors">
                  <MessageCircle className="w-5 h-5" />
                  <span className="text-sm font-medium">
                    {(post.comments?.length ?? post.commentsCount) || 0} comments
                  </span>
                </button>
              </div>
              <button className="flex items-center space-x-2 text-gray-500 hover:text-purple-600 transition-colors">
                <Share2 className="w-5 h-5" />
                <span className="text-sm font-medium">Share</span>
              </button>
            </div>
          </div>
        </div>
       
       </Link>
      ))}
    </div>
  );
};

export default PostPage;
 