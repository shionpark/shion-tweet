import client from "@/lib/server/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await client.user.create({
    data: {
      email: "test@twitter.com",
      name: "test",
      profile: {
        create: { bio: "Hello" },
      },
      tweets: {
        create: { text: "GG" },
      },
    },
  });
  res.json({
    ok: true,
  });
}
