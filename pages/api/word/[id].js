import nextConnect from "next-connect";
import middleware from "../../../middleware/database";
import { ObjectId } from "mongodb";
import delay from "../../../utils/delay";

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  await delay(3000);
  const param = { _id: new ObjectId(req.query.id) };
  let doc = await req.db.collection("dictionary").findOne(param);
  res.json(doc);
});

handler.delete(async (req, res) => {
  await delay(3000);
  const param = { _id: new ObjectId(req.query.id) };
  const response = await req.db.collection("dictionary").deleteOne(param);
  res.json({ result: "ok" });
});

handler.put(async (req, res) => {
  await delay(3000);
  const { word, turkish } = req.body;
  if (!word || !turkish || !word.trim() || !turkish.trim()) {
    res.status(400);
    res.json({ error: "bad input" });
    return;
  }
  const param = { _id: new ObjectId(req.query.id) };
  const update = {
    $set: {
      word: word.trim(),
      turkish: turkish.trim(),
    },
  };
  let doc = await req.db.collection("dictionary").updateOne(param, update);
  res.json(doc);
});

export default handler;
