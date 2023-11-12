import db from "@/lib/server/db";
import withHandler, { ResponseType } from "@/lib/server/withHandler";
import { withApiSession } from "@/lib/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  // 3. 데이터 확인
  if (req.method === "GET") {
    const tweets = await db.tweet.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
          },
        },
      },
    });
    res.json({
      isSuccess: true,
      tweets,
    });
  }
  // 2. 데이터베이스 업데이트
  if (req.method === "POST") {
    const {
      body: { text, title },
      session: { user },
    } = req;
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
      include: {
        user: true,
      },
    });
    res.json({
      isSuccess: true,
      tweet,
    });
  }
}

export default withApiSession(
  withHandler({
    handler,
    methods: ["GET", "POST"],
  })
);
