import { useState } from "react";
import {
  Upload,
  ChevronLeft,
  ThumbsUp,
  ThumbsDown,
  User,
  Mail,
  Type,
  FileText,
  X,
} from "lucide-react";
import { useForm } from "react-hook-form";
import useAuth from "../../../Authentication/UseAuth";
import UseaxiosPublic from "../../../Hooks/UseaxiosPublic";
import { toast } from "react-toastify";

const AddPost = () => {
  const [authorImage, setAuthorImage] = useState(null);
  const { user } = useAuth();
  const axiosPublic = UseaxiosPublic();

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    const postData = {
      author: {
        name: data.name,
        email: data.email || user?.email,
        image: user?.photoURL || "",
      },
      createdAt: new Date().toISOString(),
      description: data.description,
      title: data.title,
      tag: data.tag,
      downVotes: 0,
      upVotes: 0,
      comments: [],
      commentsCount: 0,
    };

    try {
      const response = await axiosPublic.post("/addpost", postData);
      console.log(response.data);
      if (response.data.insertedId) {
        toast.success("Post created successfully");
        reset();
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to create post");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAuthorImage(imageUrl);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen px-4 md:pl-28">
      {/* Top navigation for mobile */}
      <div className="bg-white shadow-sm px-4 py-3 flex items-center justify-between md:hidden">
        <div className="flex items-center">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <ChevronLeft size={20} className="text-gray-700" />
          </button>
          <h1 className="text-lg font-bold text-gray-800 ml-2">Create Post</h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto py-6 md:py-12">
        {/* Desktop title */}
        <div className="hidden md:block mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Create New Post</h1>
          <p className="text-gray-600 mt-1">
            Share your thoughts with the community
          </p>
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden p-4 md:p-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Author Information */}
            <div className="border-b border-gray-200 pb-6 mb-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4">
                Author Information
              </h2>

              <div className="mb-6 flex flex-wrap gap-6 items-center">
                <div className="relative">
                  <div
                    className={`w-20 h-20 rounded-full flex items-center justify-center overflow-hidden border-2 ${
                      authorImage
                        ? "border-indigo-300"
                        : "border-dashed border-gray-300"
                    }`}
                  >
                    {authorImage ? (
                      <img
                        src={authorImage}
                        alt="Author"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Upload size={24} className="text-gray-400" />
                    )}
                  </div>
                  {authorImage && (
                    <button
                      type="button"
                      onClick={() => setAuthorImage(null)}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 transform translate-x-1/4 -translate-y-1/4"
                    >
                      <X size={12} />
                    </button>
                  )}
                </div>

                <div>
                  <label className="block px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-md text-white text-sm font-medium cursor-pointer">
                    {authorImage ? "Change Image" : "Upload Image"}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </label>
                  <p className="text-xs text-gray-500 mt-1">
                    JPG, PNG or GIF (Max. 2MB)
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-6">
                <div className="flex-1 min-w-[250px]">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <div className="flex items-center">
                      <User size={16} className="mr-2" />
                      Author Name
                    </div>
                  </label>
                  <input
                    defaultValue={user?.displayName}
                    {...register("name", { required: true })}
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 outline-none"
                    placeholder="Enter your name"
                  />
                </div>

                <div className="flex-1 min-w-[250px]">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <div className="flex items-center">
                      <Mail size={16} className="mr-2" />
                      Author Email
                    </div>
                  </label>
                  <input
                    defaultValue={user?.email}
                    {...register("email", { required: true })}
                    type="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 outline-none"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>
            </div>

            {/* Post Content */}
            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4">
                Post Content
              </h2>

              <div className="flex flex-wrap gap-6 mb-6">
                <div className="flex-1 min-w-[250px]">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <div className="flex items-center">
                      <Type size={16} className="mr-2" />
                      Post Title
                    </div>
                  </label>
                  <input
                    {...register("title", { required: true })}
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 outline-none"
                    placeholder="Enter a descriptive title"
                  />
                </div>

                <div className="flex-1 min-w-[250px]">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tag
                  </label>
                  <select
                    {...register("tag", { required: true })}
                    className="border border-gray-300 rounded-md px-4 py-2 w-full"
                  >
                    <option value="">Select tag</option>
                    <option value="technology">Technology</option>
                    <option value="design">Design</option>
                    <option value="python">Python</option>
                    <option value="javascript">JavaScript</option>
                    <option value="ai">Artificial Intelligence</option>
                    <option value="blockchain">Blockchain</option>
                    <option value="webdev">Web Development</option>
                    <option value="datascience">Data Science</option>
                    <option value="cybersecurity">Cybersecurity</option>
                    <option value="cloud">Cloud Computing</option>
                  </select>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center">
                    <FileText size={16} className="mr-2" />
                    Post Description
                  </div>
                </label>
                <textarea
                  {...register("description", { required: true })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 outline-none min-h-32"
                  placeholder="Write your post content here..."
                  rows={6}
                ></textarea>
              </div>
            </div>

            {/* Votes Section */}
            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4">
                Vote Information
              </h2>
              <div className="flex flex-wrap gap-4">
                <div className="flex-1 min-w-[250px] border border-gray-200 rounded-md p-4 bg-gray-50">
                  <div className="flex items-center mb-2">
                    <ThumbsUp size={16} className="text-green-600 mr-2" />
                    <span className="text-sm font-medium text-gray-700">
                      UpVote
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-gray-800">0</p>
                  <p className="text-xs text-gray-500 mt-1">Default value</p>
                </div>

                <div className="flex-1 min-w-[250px] border border-gray-200 rounded-md p-4 bg-gray-50">
                  <div className="flex items-center mb-2">
                    <ThumbsDown size={16} className="text-red-600 mr-2" />
                    <span className="text-sm font-medium text-gray-700">
                      DownVote
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-gray-800">0</p>
                  <p className="text-xs text-gray-500 mt-1">Default value</p>
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 order-2 sm:order-1"
                onClick={() => reset()}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-indigo-600 rounded-md text-white font-medium hover:bg-indigo-700 order-1 sm:order-2"
              >
                Create Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
