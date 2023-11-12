import db from "@/lib/server/db";
import withHandler, { ResponseType } from "@/lib/server/withHandler";
import { withApiSession } from "@/lib/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) => {
  const { email, password } = req.body;
  console.log(email, password); // 백엔드에서 정보 받기
  console.log(req.session);

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

  req.session.user = { id: user.id };
  await req.session.save();

  return res.status(200).json({ isSuccess: true, message: "로그인 완료!" });
};

export default withApiSession(withHandler({ handler, methods: "POST" }));
