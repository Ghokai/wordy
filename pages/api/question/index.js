import nextConnect from "next-connect";
import middleware from "../../../middleware/database";

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  let doc = await req.db
    .collection("dictionary")
    .aggregate([{ $sample: { size: 5 } }])
    .toArray();

  const answerIndex = Math.floor(Math.random() * 5);

  const question = {
    word: doc[answerIndex].word,
    answer: doc[answerIndex]._id,
    options: doc.map((w) => ({ turkish: w.turkish, id: w._id })),
  };

  res.json(question);
});

export default handler;
 