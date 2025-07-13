import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import { FaRegComment, FaArrowUp, FaArrowDown } from "react-icons/fa";
import { useParams } from "react-router";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  WhatsappIcon,
} from "react-share";
import axios from "axios";
import useAuth from "../../Authentication/UseAuth";
import { toast } from "react-toastify";
import LoadingSppiner from "../LoadingSppiner";

const PostDetailsPage = () => {
  const { user } = useAuth();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { id } = useParams();
  console.log(id);

  const {
    data: post,
    isLoading,
    isError,
    refetch,
  
  } = useQuery({
    queryKey: ["post", id],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5000/post/${id}`);
      return res.data;
    },
    enabled: !!id,
 
  });
  refetch()
  console.log(post);
  if (isLoading) return  <LoadingSppiner/>;
  if (isError || !post) return <p>Error or no data.</p>;

  const shareUrl = window.location.href;
  const shareTitle = post.title;

  const onSubmit = async (data) => {
  const newComment = {
    text: data.textarea,
    createdAt: new Date().toISOString(),
    author: {
      name: user?.displayName,
      image: user?.photoURL,
      email:user?.email
    },
  };

  try {
    const response = await axios.patch(`http://localhost:5000/comment/${id}`, newComment);
    console.log('Comment added:', response.data.success);
  if(response.data.success==true){
    toast.success('comment added successfully')
    refetch()
    reset()
  }
  
  } catch (error) {
    console.error('Error updating post:', error);
  }
};
const hanndaleVoteCount = async (voteType) => {
  if (!user?.email) {
    toast.error("You must be logged in to vote.");
    return;
  }

  try {
    const response = await axios.post(
      `http://localhost:5000/votecount/${id}`,
      {
        vote: voteType,
        user: user.email
      }
    );

    if (response.data.success) {
      toast.success("Vote updated!");
      refetch();
    } else {
      toast.error("Vote failed!");
    }
  } catch (err) {
    console.error(err);
    toast.error("Error voting!");
  }
};

refetch()
  return (
    <div className="bg-blue-50 min-h-screen pt-8 pb-16">
      <div className="max-w-3xl mx-auto px-4">
        {/* Post Card */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8 border-t-4 border-blue-600">
          {/* Post Header */}
          <div className="p-6">
            {/* Author Info */}
            <div className="flex items-center mb-6">
              <img
                src={post.author.image}
                alt={post.author.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-blue-200 shadow"
              />
              <div className="ml-4">
                <h3 className="font-semibold text-blue-900">
                  {post.author.name}
                </h3>
                <p className="text-sm text-blue-500">{post?.createdAt && new Date(post.createdAt).toLocaleString()}</p>
              </div>
            </div>

            {/* Post Content */}
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-blue-900 mb-3">
                {post.title}
              </h1>
              <div className="mb-4">
                <span className="inline-block bg-blue-100 text-blue-700 text-sm font-medium px-3 py-1 rounded-full">
                  {post.tag}
                </span>
              </div>
              <div className="prose max-w-none">
                <p className="text-blue-800 leading-relaxed">
                  {post.description}
                </p>
              </div>
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex items-center justify-between px-6 py-4 bg-blue-100 border-t border-blue-200">
          <div className="flex items-center space-x-2">
  <button
    className="p-1.5 rounded-full hover:bg-blue-200 transition duration-200"
    aria-label="Upvote"
    onClick={() => hanndaleVoteCount("up")}
  >
    <FaArrowUp className="w-5 h-5 text-blue-600" />
  </button>
  <span className="font-medium text-blue-800">{post.upVotes}</span>

  <button
    className="p-1.5 rounded-full hover:bg-blue-200 transition duration-200"
    aria-label="Downvote"
    onClick={() => hanndaleVoteCount("down")}
  >
    <FaArrowDown className="w-5 h-5 text-blue-600" />
  </button>
  <span className="font-medium text-blue-800">{post.downVotes}</span>
</div>

            {/* Share Button */}
            <div className="group relative h-40 ">
              <button className="flex items-center text-blue-600 hover:text-blue-800 transition duration-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                  />
                </svg>
                <span>Share</span>
              </button>

              {/* Share Menu */}
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-40 border border-blue-200 hidden group-hover:block">
                <div className="p-3 space-y-2">
                  <FacebookShareButton
                    url={shareUrl}
                    quote={shareTitle}
                    className="flex items-center w-full hover:bg-blue-50 p-2 rounded"
                  >
                    <FacebookIcon size={24} round />
                    <span className="ml-2 text-sm text-blue-800">Facebook</span>
                  </FacebookShareButton>
                  <TwitterShareButton
                    url={shareUrl}
                    title={shareTitle}
                    className="flex items-center w-full hover:bg-blue-50 p-2 rounded"
                  >
                    <TwitterIcon size={24} round />
                    <span className="ml-2 text-sm text-blue-800">Twitter</span>
                  </TwitterShareButton>
                  <LinkedinShareButton
                    url={shareUrl}
                    title={shareTitle}
                    className="flex items-center w-full hover:bg-blue-50 p-2 rounded"
                  >
                    <LinkedinIcon size={24} round />
                    <span className="ml-2 text-sm text-blue-800">LinkedIn</span>
                  </LinkedinShareButton>
                  <WhatsappShareButton
                    url={shareUrl}
                    title={shareTitle}
                    className="flex items-center w-full hover:bg-blue-50 p-2 rounded"
                  >
                    <WhatsappIcon size={24} round />
                    <span className="ml-2 text-sm text-blue-800">WhatsApp</span>
                  </WhatsappShareButton>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Comment Section */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden border-t-4 border-blue-400">
          <h2 className="text-xl font-bold p-6 border-b border-blue-100 text-blue-900">
            Comments ({post.comments.length})
          </h2>

          {/* Comment Form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="p-6 border-b border-blue-100 bg-blue-50">
              <div className="flex">
                <img
                  src={user?.photoURL}
                  alt="Current User"
                  className="w-10 h-10 rounded-full object-cover mr-4 border-2 border-blue-200"
                />
                <div className="flex-1">
                  <textarea
                    {...register("textarea", {
                      required: "Comment is required",
                    })}
                    className="w-full p-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 resize-none"
                    rows={3}
                    placeholder="Add a comment..."
                  />
                  {errors.textarea && (
                    <p className="text-red-500 text-sm mt-2">
                      {errors.textarea.message}
                    </p>
                  )}
                  <div className="mt-2 flex justify-end">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
                    >
                      Post Comment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>

          {/* Comments List */}
          <div>
            {post.comments.map((comment) => (
              <div
                key={comment._id}
                className="p-6 border-b border-blue-100 last:border-b-0 hover:bg-blue-50 transition duration-200"
              >
                <div className="flex">
                  <img
                    src={comment.author?.image}
                    alt={comment.author.name}
                    className="w-10 h-10 rounded-full object-cover mr-4 border-2 border-blue-100"
                  />
                  <div>
                    <div className="flex items-baseline">
                      <h4 className="font-medium text-blue-900">
                        {comment.author.name}
                      </h4>
                      <span className="ml-2 text-sm text-blue-500">
                        {comment?.createdAt && new Date(post.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <p className="mt-1">{comment.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetailsPage;
