import client from "@/lib/server/client";
import withHandler from "@/lib/server/withHandler";
import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, name, password } = req.body;

  if (!email || !name) {
    return res.status(404).end();
  }

  const user = await client.user.findUnique({
    where: {
      email: email,
    },
  });

  if (user) {
    return res.status(409).end();
  }

  const hashedPassword = await bcrypt.hash(password, 5);

  await client.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  });

  res.status(200).end();
};

export default withHandler("POST", handler);
