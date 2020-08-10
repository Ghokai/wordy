// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// mongodb+srv://admin:wordyappx1@cluster0.dzea5.mongodb.net/<dbname>?retryWrites=true&w=majority
export default (req, res) => {
  res.statusCode = 200
  res.json({ name: 'John Doe' })
}
