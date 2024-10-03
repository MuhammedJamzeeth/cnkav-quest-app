import { useEffect, useState } from "react";

const useUser = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (window && typeof window !== "undefined") {
      const localUser = window.localStorage.getItem("user");

      if (!localUser) {
        return setUser(null);
      }

      setUser(JSON.parse(localUser));
    }
  }, []);

  return {
    user,
  };
};

export default useUser;
