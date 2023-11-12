import db from "@/lib/server/db";
import withHandler, { ResponseType } from "@/lib/server/withHandler";
import { withApiSession } from "@/lib/server/withSession";
import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) => {
  const { email, password } = req.body;

  const user = await db.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user)
    return res.status(404).json({
      isSuccess: false,
      message: "존재하지 않는 이메일입니다.",
    });

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res
      .status(400)
      .json({ isSuccess: false, message: "옳지 않은 비밀번호입니다." });
  }

  req.session.user = { id: user.id };
  await req.session.save();

  return res.status(200).json({ isSuccess: true, user });
};

export default withApiSession(
  withHandler({ handler, isPrivate: false, method: "POST" })
);
