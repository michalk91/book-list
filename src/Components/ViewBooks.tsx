import { useEffect } from "react";
import { deleteBook, fetchBooks } from "../Store/BooksSlice";
import { useAppSelector, useAppDispatch } from "../Store/hooks";
import type { ViewBooksProps } from "../types";

export const ViewBooks = ({ handleEditBook, bookToEdit }: ViewBooksProps) => {
  const data = useAppSelector((state) => state.books.booksArray);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const handleDeleteBook = (id: string) => {
    dispatch(deleteBook(id));
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
        </>
      ) : (
        <div>There are no books added yet!</div>
      )}
    </div>
  );
};
