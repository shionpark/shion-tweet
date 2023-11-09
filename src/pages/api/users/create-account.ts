import client from "@/lib/server/client";
import withHandler, { ResponseType } from "@/lib/server/withHandler";
import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) => {
  const { email, name } = req.body;

  const payload = email ? { email } : { name };
  const user = await client.user.upsert({
    where: {
      email: email || undefined,
    },
    create: {
      name: "Anonymous",
      ...payload,
    },
    update: {},
  });
  console.log(user);
};

export default withHandler("POST", handler);
