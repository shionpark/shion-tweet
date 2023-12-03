import db from "@/lib/server/db";
import withHandler, { ResponseType } from "@/lib/server/withHandler";
import { withApiSession } from "@/lib/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    query: { id },
    session: { user },
  } = req;

  if (id === undefined || id === null) {
    return res
      .status(400)
      .json({ isSuccess: false, error: "ID가 누락되었습니다." });
  }

  const alreadyExists = await db.like.findFirst({
    where: {
      id: +id.toString(),
      userId: user?.id,
    },
  });
  if (alreadyExists) {
    await db.like.delete({
      where: {
        id: alreadyExists.id,
      },
    });
  } else {
    await db.like.create({
      data: {
        user: {
          connect: {
            id: user?.id,
          },
        },
        tweet: {
          connect: {
            id: +id.toString(),
          },
        },
      },
    });
  }

  const isLiked = Boolean(
    await db.like.findFirst({
      where: {
        tweetId: +id,
        userId: user?.id,
      },
      select: {
        id: true,
      },
    })
  );

  res.json({
    isLiked,
    isSuccess: true,
  });
}

export default withApiSession(
  withHandler({
    handler,
    methods: ["POST"],
  })
);
