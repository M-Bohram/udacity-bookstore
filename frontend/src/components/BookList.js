import Book from "./Book";

function BookList({ books }) {

  return (
    <>
      {books.map((book) => (
        <Book key={book.bookID} book={book} />
      ))}
    </>
  );
}

export default BookList;
