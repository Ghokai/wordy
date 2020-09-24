import nextConnect from "next-connect";
import middleware from "../../../middleware/database";
import delay from "../../../utils/delay";

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  await delay(3000);

  let doc = await req.db
    .collection("dictionary")
    .find()
    .sort({ word: 1 })
    .toArray();
  res.json(doc);
});

handler.post(async (req, res) => {
  await delay(3000);

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
