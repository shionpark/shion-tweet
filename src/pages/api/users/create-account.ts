import db from "@/lib/server/db";
import withHandler, { ResponseType } from "@/lib/server/withHandler";
import { withApiSession } from "@/lib/server/withSession";
import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) => {
  const { email, name, password } = req.body;

  if (!email || !name || !password) {
    return res
      .status(404)
      .json({ isSuccess: false, message: "올바르지 않은 입력입니다." });
  }

  const user = await db.user.findUnique({
    where: {
      email: email,
    },
  });
  console.log(user);

  if (user) {
    return res.status(409).json({
      isSuccess: false,
      message: "이미 존재하는 이메일입니다.",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 5);

  await db.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  });

  return res.status(200).json({ isSuccess: true, message: "회원가입 완료!" });
};

export default withApiSession(withHandler({ handler, methods: ["POST"] }));
