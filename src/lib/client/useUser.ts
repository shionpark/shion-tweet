import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const useUser = () => {
  const [user, setUser] = useState();
  const router = useRouter();
  useEffect(() => {
    fetch("/api/users/me")
      .then((response) => response.json())
      .then((data) => {
        if (!data.isSuccess) {
          return router.replace("/create-account");
        }
        setUser(data.profile);
      });
  }, [router]);
  return user;
};

export default useUser;
