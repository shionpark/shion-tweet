import Button from "@/components/button";
import Layout from "@/components/layout";
import useMutation from "@/lib/client/useMutation";
import { cls } from "@/lib/utils";
import { Tweet, User } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";

interface TweetWithUser extends Tweet {
  user: User;
}
interface TweetDetailResponse {
  isLiked: boolean;
  isSuccss: boolean;
  tweetDetail: TweetWithUser;
}

const TweetDetail = () => {
  const router = useRouter();
  const { data, mutate } = useSWR<TweetDetailResponse>(
    router.query.id ? `/api/tweets/${router.query.id}` : null
  );

  const [toggleLike] = useMutation(`/api/tweets/${router.query.id}/like`);

  console.log(data);

  const onLikeClick = () => {
    if (!data) return;
    mutate({ ...data, isLiked: !data.isLiked }, false);
    toggleLike({});
  };

  return (
    <Layout hasTabBar title="Detail">
      <div className="SCREEN flex flex-col bg-white">
        <div className="px-4 py-4">
          <div className="mb-8">
            <div className="flex cursor-pointer py-3  items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-slate-300" />
              <div className="T_USER_INFO">
                <p className="text-sm font-medium text-gray-700">
                  {data?.tweetDetail?.user?.name}
                </p>
                <Link
                  className="text-xs font-medium text-gray-400"
                  href={`/users/profile/${data?.tweetDetail?.user?.id}`}
                >
                  <span className="text-sm font-medium text-gray-700">
                    @{data?.tweetDetail?.user?.email.split("@")[0]}
                  </span>
                </Link>
              </div>
            </div>
            <div className="mt-5">
              <h1 className="T_TITLE text-3xl font-bold text-gray-900">
                {data?.tweetDetail?.title}
              </h1>
              <p className="T_CONTENT my-6 text-gray-700">
                {data?.tweetDetail?.text}
              </p>
              <div className="T_BTN lex items-center justify-between space-x-2">
                <div className="flex">
                  <Button large onClick={onLikeClick} text="Click the LIKE!" />
                  <button
                    className={cls(
                      "p-3 rounded-md flex items-center hover:bg-gray-100 justify-center ",
                      data?.isLiked
                        ? "text-red-500  hover:text-red-600"
                        : "text-gray-400  hover:text-gray-500"
                    )}
                    onClick={onLikeClick}
                  >
                    {data?.isLiked ? (
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          clipRule="evenodd"
                          d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                          fillRule="evenodd"
                        ></path>
                      </svg>
                    ) : (
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
                    )}
                  </button>
                </div>
              </div>
              <div className="CREATED_DATE flex text-xs text-gray-600 mt-4">
                <p>{data?.tweetDetail?.createdAt?.toString().split("T")[0]}</p>
                <div className="px-1">|</div>
                <p>
                  {data?.tweetDetail?.createdAt
                    ?.toString()
                    .split("T")[1]
                    .slice(0, 8)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TweetDetail;
