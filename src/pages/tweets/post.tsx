import Button from "@/components/button";
import Input from "@/components/input";
import Layout from "@/components/layout";
import TextArea from "@/components/textarea";
import useMutation from "@/lib/client/useMutation";
import { Tweet } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface PostTweetForm {
  text: string;
  title: string;
}

interface postTweetMutation {
  isSuccess: boolean;
  tweet: Tweet;
}

const Post = () => {
  const router = useRouter();
  const { handleSubmit, register } = useForm<PostTweetForm>();
  // 3. 백엔드에 데이터 mutation 요청
  const [postTweet, { data, isLoading }] =
    useMutation<postTweetMutation>("/api/tweets");

  const onValid = (data: PostTweetForm) => {
    console.log(data);
    if (isLoading) return;
    console.log(data);
    postTweet(data);
  };
  useEffect(() => {
    if (data?.isSuccess) {
      router.push(`/tweets/${data.tweet.id}`);
    }
  }, [data, router]);
  return (
    <Layout hasTabBar title="Post">
      <form className="p-4 space-y-4" onSubmit={handleSubmit(onValid)}>
        <div>
          <label className="w-full cursor-pointer text-gray-600 hover:border-orange-500 hover:text-orange-500 flex items-center justify-center border-2 border-dashed border-gray-300 h-48 rounded-md">
            <svg
              aria-hidden="true"
              className="h-12 w-12"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 48 48"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
            <input className="hidden" type="file" />
          </label>
        </div>
        <div className="pb-6 space-y-3">
          <Input
            label="Title"
            name="title"
            register={register("title", { required: true })}
            required
            type="text"
          />
          <TextArea
            label="Description"
            name="text"
            placeholder="What is happening?!"
            register={register("text", { required: true })}
            required
          />
          <Button text={isLoading ? "Loading..." : "Post tweet"} />
        </div>
      </form>
    </Layout>
  );
};

export default Post;
