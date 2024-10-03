import { useState, useEffect, useCallback } from "react";
import axiosInstance from "../api/axiosInstance";

const useCommunityPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Define the fetchPosts function, allowing it to be used for both initial fetch and refetch
  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/community/get-all");
      setPosts(response.data);
      setError(null); // Clear any previous errors on success
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, []);

  // useEffect to trigger the fetchPosts on the initial mount
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  // Return posts, loading, error, and the refetch function
  return { posts, loading, error, refetch: fetchPosts };
};

export default useCommunityPosts;
