import { useState, useEffect, useCallback } from "react";
import axiosInstance from "../api/axiosInstance";
import useUser from "../hooks/use-user";

const useUserCommunityPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { user } = useUser();

  // Define the fetchPosts function, allowing it to be used for both initial fetch and refetch
  const fetchPosts = useCallback(async () => {
    if (!user) return;

    try {
      setLoading(true);
      const response = await axiosInstance.get(
        `/community/get?user_id=${user.id}`
      );
      setPosts(response.data);
      setError(null); // Clear any previous errors on success
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [user]);

  // useEffect to trigger the fetchPosts on the initial mount
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts, user]);

  // Return posts, loading, error, and the refetch function
  return { posts, loading, error, refetch: fetchPosts };
};

export default useUserCommunityPosts;
