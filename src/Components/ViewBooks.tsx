import { useEffect } from "react";
import { deleteBook, fetchBooks, deleteAllBooks } from "../Store/BooksSlice";
import { useAppSelector, useAppDispatch } from "../Store/hooks";
import type { ViewBooksProps } from "../types";

export const ViewBooks = ({
  handleEditBook,
  bookToEdit,
  cancelEdit,
}: ViewBooksProps) => {
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
      <h1>Books:</h1>
      {data.length > 0 ? (
        <>
          {data.map((book) => (
            <div className="showBook" key={book.id}>
              <div>
                <h5>
                  <b>Title</b>: "{book.book.title}"
                </h5>
                <h6>
                  <b>Author</b>: "{book.book.author}"
                </h6>
              </div>

              <div>
                {bookToEdit === null && (
                  <span
                    onClick={() => handleDeleteBook(book.id)}
                    className="icon red"
                  >
                    DELETE
                  </span>
                )}

                <span
                  onClick={() => handleEditBook(book)}
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
