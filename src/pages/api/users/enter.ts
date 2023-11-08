import client from "@/lib/server/client";
import withHandler from "@/lib/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.body);
  res.status(200).end();
};

export default withHandler("POST", handler);
