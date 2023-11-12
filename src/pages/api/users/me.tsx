import db from "@/lib/server/db";
import withHandler, { ResponseType } from "@/lib/server/withHandler";
import { withApiSession } from "@/lib/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const profile = await db.user.findUnique({
    where: { id: req.session.user?.id },
  });
  res.json({
    isSuccess: true,
    profile,
  });
}

export default withApiSession(
  withHandler({
    handler,
    methods: ["GET"],
  })
);
