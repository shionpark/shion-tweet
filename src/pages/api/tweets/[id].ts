import db from "@/lib/server/db";
import withHandler, { ResponseType } from "@/lib/server/withHandler";
import { withApiSession } from "@/lib/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { id } = req.query;

  if (id === undefined || id === null) {
    return res.status(400).json({
      error: "Tweet ID is required.",
      isSuccess: false,
    });
  }

  const tweetDetail = await db.tweet.findUnique({
    where: {
      id: +id.toString(),
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  res.json({
    isSuccess: true,
    tweetDetail,
  });
}

export default withApiSession(
  withHandler({
    handler,
    methods: ["GET"],
  })
);
