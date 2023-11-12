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
    if (isLoading) return;

    postTweet(data);
  };
  useEffect(() => {
    if (data?.isSuccess) {
      router.push(`/tweets/${data.tweet.id}`);
    }
  }, [data, router]);
  return (
    <div className="h-screen bg-white">
      <Layout hasTabBar title="Post">
        <form className="p-4 space-y-4" onSubmit={handleSubmit(onValid)}>
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
    </div>
  );
};

export default Post;
