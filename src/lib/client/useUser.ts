import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";

// const fetcher = (url: string) => fetch(url).then((response) => response.json());

const useUser = () => {
  // const { data, error } = useSWR("/api/users/me", fetcher);
  const { data, error } = useSWR("/api/users/me");
  const router = useRouter();
  useEffect(() => {
    if (data && !data.isSuccess) {
      router.replace("/enter");
    }
  }, [data, router]);
  return { isLoading: !data && !error, user: data?.profile };
};

export default useUser;
