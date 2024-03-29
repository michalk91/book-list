import { useEffect, memo, useCallback } from "react";
import { deleteBook, fetchBooks } from "../Store/BooksSlice";
import { useAppDispatch } from "../Store/hooks";
import type { ViewBooksProps } from "../types";

export const ViewBooks = memo(
  ({ handleEditBook, bookToEdit, data }: ViewBooksProps) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
      dispatch(fetchBooks());
    }, [dispatch, fetchBooks]);

    const handleDeleteBook = useCallback(
      (id: string) => {
        dispatch(deleteBook(id));
      },
      [dispatch, deleteBook]
    );

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
                    <b>Author</b>: {book.book.author}
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
  }
);
