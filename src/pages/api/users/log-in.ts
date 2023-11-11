import db from "@/lib/server/db";
import withHandler from "@/lib/server/withHandler";
import { withApiSession } from "@/lib/server/withSession";
import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body;

  if (!email) {
    return res
      .status(404)
      .json({ isSuccess: false, message: "올바르지 않은 입력입니다." });
  }

  const user = await db.user.findUnique({
    where: {
      email,
    },
  });
  if (!user) {
    return res.status(409).json({
      isSuccess: false,
      message: "올바르지 않은 입력입니다.",
    });
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res
      .status(400)
      .json({ isSuccess: false, message: "올바르지 않은 비밀번호입니다." });
  }

  req.session.user = { id: user.id };
  await req.session.save();

  return res.status(200).json({ isSuccess: true, message: "로그인 성공!" });
};

export default withApiSession(withHandler({ handler, methods: "POST" }));
