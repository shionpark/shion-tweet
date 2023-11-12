import db from "@/lib/server/db";
import withHandler, { ResponseType } from "@/lib/server/withHandler";
import { withApiSession } from "@/lib/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    body: { text, title },
    session: { user },
  } = req;
  // 2. 데이터베이스 업데이트
  const tweet = await db.tweet.create({
    data: {
      text,
      title,
      user: {
        connect: {
          id: user?.id,
        },
      },
    },
  });
  res.json({
    isSuccess: true,
    tweet,
  });
}

export default withApiSession(
  withHandler({
    handler,
    methods: ["POST"],
  })
);
