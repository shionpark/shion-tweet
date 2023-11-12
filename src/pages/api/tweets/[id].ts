import db from "@/lib/server/db";
import withHandler, { ResponseType } from "@/lib/server/withHandler";
import { withApiSession } from "@/lib/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { id } = req.query;
  res.json({
    isSuccess: true,
  });
}

export default withApiSession(
  withHandler({
    handler,
    methods: ["GET", "POST"],
  })
);
