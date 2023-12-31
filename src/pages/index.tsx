import Item from "@/components/item";
import Layout from "@/components/layout";
import useUser from "@/lib/client/useUser";
import { Tweet } from "@prisma/client";
import useSWR from "swr";

interface TweetsResponse {
  isSuccess: boolean;
  tweets: Tweet[];
}

const Home = () => {
  const { isLoading, user } = useUser();
  const { data } = useSWR<TweetsResponse>("/api/tweets");

  return (
    <Layout hasTabBar title="Tweets">
      <div className="text-gray-900 bg-white flex flex-col w-full space-y-5">
        {data?.tweets?.map((tweet) => (
          <div
            className="flex px-4 border-b pb-5 justify-between"
            key={tweet.id}
          >
            <Item
              comments={1}
              createdAt={tweet.createdAt}
              hearts={1}
              id={tweet.id}
              key={tweet.id}
              text={
                tweet.text.length > 40
                  ? `${tweet.text.slice(0, 40)}...`
                  : tweet.text
              }
              title={tweet.title}
              email={tweet.user?.email}
              username={tweet.user?.name}
            />
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Home;
