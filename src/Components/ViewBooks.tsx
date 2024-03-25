import { useEffect } from "react";
import { deleteBook, fetchBooks, deleteAllBooks } from "../Store/BooksSlice";
import { useAppSelector, useAppDispatch } from "../Store/hooks";

interface Props {
  handleEditBook: any;
  bookToEdit: any;
  cancelEdit: any;
}

export const ViewBooks = ({
  handleEditBook,
  bookToEdit,
  cancelEdit,
}: Props) => {
  const data = useAppSelector((state) => state.books.booksArray);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const handleDeleteBook = (id: string) => {
    dispatch(deleteBook(id));
  };

  const handleDeleteAllBooks = () => {
    dispatch(deleteAllBooks());
  };

  return (
    <div className="view-books">
      <h1 style={{ paddingTop: "20px" }}>Books:</h1>
      {data.length > 0 ? (
        <>
          {data.map((book) => (
            <div className="book" style={{ padding: "20px" }} key={book.id}>
              <div className="content">
                <h5>Title: {book.book.title}</h5>
                <h6>Author: {book.book.author}</h6>
              </div>

              <div className="actions">
                {bookToEdit === null && (
                  <span
                    onClick={() => handleDeleteBook(book.id)}
                    style={{
                      margin: "0 auto",
                    }}
                    className="icon red"
                  >
                    DELETE
                  </span>
                )}

                <span
                  onClick={() => handleEditBook(book)}
                  style={{
                    margin: "0 auto",
                  }}
                  className="icon blue"
                >
                  UPDATE
                </span>
              </div>
            </div>
          ))}
          {data.length > 1 &&
            (bookToEdit === null ? (
              <button onClick={handleDeleteAllBooks} className="btn btn-danger">
                Delete all
              </button>
            ) : (
              <button onClick={cancelEdit} className="btn btn-danger">
                Cancel Update
              </button>
            ))}
        </>
      ) : (
        <div>There are no books added yet!</div>
      )}
    </div>
  );
};
