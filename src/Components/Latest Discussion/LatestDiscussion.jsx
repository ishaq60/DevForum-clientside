import React, { useEffect, useState } from "react";
import { FaComment, FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import PostPage from "./PostPage";
import LoadingSppiner from "../LoadingSppiner";
import UsePost from "../../Hooks/UsePost";

const LatestDiscussion = ({ searchTerm }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [itemPerPage, setItemPerPage] = useState(5);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState("newest"); // "newest" or "popular"

  // Fetch total count for pagination
  const [count, setCount] = useState(0);

  // Fetch posts from the UsePost hook
  const [posts, , isLoading,refch] = UsePost();

  // Reset to first page when sort type changes
  useEffect(() => {
    setCurrentPage(0);
  }, [sortBy]);

  // Fetch post count for pagination
  useEffect(() => {
    fetch("http://localhost:5000/postCount")
      .then((res) => res.json())
      .then((data) => setCount(data))
      .catch((err) => console.error("Fetch count error:", err));
  }, []);

  // Fetch paginated posts based on the sortBy and pagination settings
  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/posts?page=${currentPage}&limit=${itemPerPage}&sort=${sortBy}`)
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch posts error:", err);
        setLoading(false);
      });
  }, [currentPage, itemPerPage, sortBy]);

  const numberOfPages = Math.ceil(count / itemPerPage);
  const pages = Array.from({ length: numberOfPages }, (_, i) => i);

  const handlePageChange = (page) => setCurrentPage(page);
  const handlePerPageChange = (e) => {
    setItemPerPage(parseInt(e.target.value));
    setCurrentPage(0);
  };
  const handlePrevious = () => currentPage > 0 && setCurrentPage(currentPage - 1);
  const handleNext = () => currentPage < numberOfPages - 1 && setCurrentPage(currentPage + 1);

  // Filter posts based on the search term
 const filteredPosts = searchTerm
    ? posts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.tag.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : posts;
   

  if (isLoading || loading) return <LoadingSppiner />;
  if (!filteredPosts.length) return <p className="text-center text-gray-500">No posts found.</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Latest Discussions</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setSortBy("newest")}
            className={`btn btn-sm ${sortBy === "newest" ? "btn-primary" : "btn-outline"}`}
          >
            Newest
          </button>
          <button
            onClick={() => setSortBy("popular")}
            className={`btn btn-sm ${sortBy === "popular" ? "btn-primary" : "btn-outline"}`}
          >
            Popularity
          </button>
        </div>
      </div>

      {/* Posts List */}
      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <PostPage key={post._id} post={post} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex flex-wrap items-center justify-center gap-4 mt-8 p-4 bg-base-100 rounded-xl shadow-md">
        <button onClick={handlePrevious} className="btn btn-outline btn-sm">Previous</button>

        <div className="join">
          {pages.map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`join-item btn btn-sm ${currentPage === page ? 'bg-yellow-400 text-white' : 'btn-outline'}`}
            >
              {page + 1}
            </button>
          ))}
        </div>

        <button onClick={handleNext} className="btn btn-outline btn-sm">Next</button>

        <select
          value={itemPerPage}
          onChange={handlePerPageChange}
          className="select select-bordered select-sm w-24 ml-4"
        >
          <option value="5">5 / page</option>
          <option value="10">10 / page</option>
          <option value="20">20 / page</option>
        </select>
      </div>
    </div>
  );
};

export default LatestDiscussion;
