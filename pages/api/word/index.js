import nextConnect from "next-connect";
import middleware from "../../../middleware/database";

// This is an example of to protect an API route
// import { getSession } from 'next-auth/client'

// export default async (req, res) => {
//   const session = await getSession({ req })

//   if (session) {
//     res.send({ content: 'This is protected content.' })
//   } else {
//     res.send({ error: 'Access denied' })
//   }
// }

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  let doc = await req.db
    .collection("dictionary")
    .find()
    .sort({ word: 1 })
    .toArray();
  res.json(doc);
});

const delay = async (ms) => await new Promise((res) => setTimeout(res, ms));

handler.post(async (req, res) => {
  const { word, turkish } = req.body;
  if (!word || !turkish || !word.trim() || !turkish.trim()) {
    res.status(400);
    res.json({ error: "bad input" });
  } else {
    const obj = {
      word: word.trim().toLowerCase(),
      turkish: turkish.trim().toLowerCase(),
    };
    try {
      const doc = await req.db.collection("dictionary").insertOne(obj);
      res.json(doc.ops[0]);
    } catch (error) {
      res.status(500);
      res.json({ error: "server error" });
    }
  }
});

export default handler;
