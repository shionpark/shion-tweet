import Button from "@/components/button";
import Layout from "@/components/layout";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";

const TweetDetail = () => {
  const router = useRouter();
  console.log(router.query);
  const { data, error } = useSWR(
    router.query.id ? `/api/tweets/${router.query.id}` : null
  );

  return (
    <Layout hasTabBar title="Detail">
      <div className="SCREEN flex flex-col bg-white">
        <div className="px-4 py-4">
          <div className="mb-8">
            <div className="flex cursor-pointer py-3  items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-slate-300" />
              <div>
                <p className="text-sm font-medium text-gray-700">
                  {data?.tweetDetail?.user?.name}
                </p>
                <Link
                  className="text-xs font-medium text-gray-500"
                  href={`/users/profile/${data?.tweetDetail?.user?.id}`}
                >
                  <p className="text-sm font-medium text-gray-700">
                    @{data?.tweetDetail?.user?.email.split("@")[0]}
                  </p>
                </Link>
              </div>
            </div>
            <div className="mt-5">
              <h1 className="text-3xl font-bold text-gray-900">
                {data?.tweetDetail?.title}
              </h1>
              <p className=" my-6 text-gray-700">{data?.tweetDetail?.text}</p>
              <div className="flex items-center justify-between space-x-2">
                <Button large text="Click the LIKE!" />
                <button className="p-3 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500">
                  <svg
                    aria-hidden="true"
                    className="h-6 w-6 "
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TweetDetail;
