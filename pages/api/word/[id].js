import nextConnect from "next-connect";
import middleware from "../../../middleware/database";
import { ObjectId } from "mongodb";

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  const param = { _id: new ObjectId(req.query.id) };
  let doc = await req.db.collection("dictionary").findOne(param);
  res.json(doc);
});

handler.delete(async (req, res) => {
  const param = { _id: new ObjectId(req.query.id) };
  await req.db.collection("dictionary").deleteOne(param);
  res.json({ result: "ok" });
});

export default handler;
