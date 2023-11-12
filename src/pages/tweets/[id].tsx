import Layout from "@/components/layout";
import { useRouter } from "next/router";
import useSWR from "swr";

const TweetDetail = () => {
  const router = useRouter();
  const { data, error } = useSWR(
    router.query.id ? `/api/tweets/${router.query.id}` : null
  );
  return (
    <Layout hasTabBar title="Detail">
      <div className="SCREEN flex flex-col justify-center items-center bg-white">
        <h1>Tweet Detail</h1>
      </div>
    </Layout>
  );
};

export default TweetDetail;
