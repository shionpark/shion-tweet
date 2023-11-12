import db from "@/lib/server/db";
import withHandler, { ResponseType } from "@/lib/server/withHandler";
import { withApiSession } from "@/lib/server/withSession";
import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) => {
  const { email, name, password, confirmPassword } = req.body;

  if (!email || !name || !password || !confirmPassword) {
    return res
      .status(404)
      .json({ isSuccess: false, message: "올바르지 않은 입력입니다." });
  }

  if (password !== confirmPassword) {
    return res
      .status(400)
      .json({ isSuccess: false, message: "비밀번호가 일치하지 않습니다" });
  }

  const user = await db.user.findUnique({
    where: {
      email: email,
    },
  });

  if (user) {
    return res.status(409).json({
      isSuccess: false,
      message: "이미 존재하는 이메일입니다.",
    });
  }

  const newUser = await db.$transaction(async (prisma) => {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const createdUser = await prisma.user.create({
        data: {
          email,
          name,
          password: hashedPassword,
        },
      });
      return createdUser;
    } catch (error) {
      console.error("Error creating user:", error);
      return null;
    }
  });

  if (!newUser) {
    return res.status(500).json({
      isSuccess: false,
      message: "사용자를 생성하는 도중 오류가 발생했습니다.",
    });
  }

  req.session.user = {
    id: newUser.id,
  };

  return res.status(200).json({ isSuccess: true, message: "회원가입 완료!" });
};

export default withApiSession(
  withHandler({ handler, isPrivate: false, method: "POST" })
);
