import { NextApiRequest, NextApiResponse } from "next";

export interface ResponseType {
  [key: string]: any;
  ok: boolean;
}

const withHandler = (
  method: "DELETE" | "GET" | "POST",
  fn: (req: NextApiRequest, res: NextApiResponse) => void
) => {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== method) {
      return res.status(405).end();
    }
    try {
      await fn(req, res);
    } catch (error) {
      console.log("ddd", error);
      return res.status(500).json({ error });
    }
  };
};

export default withHandler;
