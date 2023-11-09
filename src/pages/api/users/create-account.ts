import client from "@/lib/server/client";
import withHandler, { ResponseType } from "@/lib/server/withHandler";
import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) => {
  const { email, name, password } = req.body;

  const user = email ? { email } : { name };
  const payload = Math.floor(100000 + Math.random() * 900000) + "";
  const hashedPassword = await bcrypt.hash(password, 10);

  const token = await client.token.create({
    data: {
      payload,
      user: {
        connectOrCreate: {
          where: {
            email: email || undefined,
            ...user,
          },
          create: {
            name: "Anonymous",
            password: hashedPassword,
            ...user,
          },
        },
      },
    },
  });
  console.log(token);
};

export default withHandler("POST", handler);
