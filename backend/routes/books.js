const booksRouter = require("express").Router();
const dbo = require("../db/conn");

const PAGE_SIZE = 10;

booksRouter.route("/books").get(async function (_req, res) {
  const dbConnect = dbo.getDb();
  const { search, page } = _req.query;
  const firstIndex = PAGE_SIZE * (page - 1);
  const findObj = search === "" ? {} : { $text: { $search: `"${search}"` } };

  try {
    const cursor = await dbConnect
      .collection("books")
      .find(findObj)
      .skip(firstIndex)
      .limit(PAGE_SIZE);
    const books = await cursor.toArray();
    const countTotal = await cursor.count();
    res.json({
      books: books,
      totalPages: Math.ceil(countTotal / PAGE_SIZE),
    });
  } catch (err) {
    res.status(400).send("Error fetching listings!");
  }
});

module.exports = booksRouter;
