import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

export interface ResponseType {
  [key: string]: any;
  isSuccess: boolean;
  message?: string;
}

type method = "GET" | "POST" | "DELETE";

interface ConfigType {
  handler: NextApiHandler;
  isPrivate?: boolean;
  methods: method[];
}

export default function withHandler({
  handler,
  isPrivate = true,
  methods,
}: ConfigType) {
  return async function (
    req: NextApiRequest,
    res: NextApiResponse
  ): Promise<any> {
    if (req.method && !methods.includes(req.method as any)) {
      return res.status(405).end();
    }
    if (isPrivate && !req.session.user) {
      return res
        .status(401)
        .json({ isSuccess: false, message: "올바르지 않은 접근입니다." });
    }
    try {
      await handler(req, res);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ isSuccess: false, message: JSON.stringify(error) });
    }
  };
}
