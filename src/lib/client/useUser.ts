import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";

const useUser = () => {
  const { data, error } = useSWR("/api/users/me");
  const router = useRouter();
  useEffect(() => {
    if (data && !data.isSuccess) {
      router.replace("/create-account");
    }
  }, [data, router]);
  return { isLoading: !data && !error, user: data?.profile };
};

export default useUser;
