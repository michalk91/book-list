import { useEffect, useState } from "react";
import { SyntheticEvent } from "react";
import { addBookToFirestore, updateBook } from "../Store/BooksSlice";
import { useAppDispatch } from "../Store/hooks";
import type { AddBooksProps } from "../types";
import { deleteAllBooks } from "../Store/BooksSlice";
import { useAppSelector } from "../Store/hooks";

export const AddBooks = ({ bookToEdit, cancelEdit }: AddBooksProps) => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.books.booksArray);

  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");

  const [editedAuthor, setEditedAuthor] = useState("");
  const [editedTitle, setEditedTitle] = useState("");

  useEffect(() => {
    if (!bookToEdit) return;

    setEditedAuthor(bookToEdit.book.author);
    setEditedTitle(bookToEdit.book.title);
  }, [bookToEdit]);

  const handleAddBook = (e: SyntheticEvent) => {
    e.preventDefault();
    const book = {
      author,
      title,
    };

    dispatch(addBookToFirestore(book));

    setAuthor("");
    setTitle("");
  };

  const handleUpdateBook = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!bookToEdit) return;

    const book = { author: editedAuthor, title: editedTitle };
    dispatch(updateBook({ id: bookToEdit.id, book }));

    setEditedAuthor("");
    setEditedTitle("");

    cancelEdit();
  };

  const handleDeleteAllBooks = () => {
    dispatch(deleteAllBooks());
  };

  return (
    <>
      {bookToEdit === null ? (
        <form className="form-group custom-form" onSubmit={handleAddBook}>
          <label>Author</label>
          <input
            className="form-control"
            required
            onChange={(e) => setAuthor(e.target.value)}
            value={author}
          />

          <label>Title</label>
          <input
            className="form-control"
            required
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <br />
          <button type="submit" className="btn btn-success">
            Add
          </button>
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
        </form>
      ) : (
        <form className="form-group custom-form" onSubmit={handleUpdateBook}>
          <label>Author</label>
          <input
            className="form-control"
            required
            onChange={(e) => setEditedAuthor(e.target.value)}
            value={editedAuthor}
          />

          <label>Title</label>
          <input
            className="form-control"
            required
            onChange={(e) => setEditedTitle(e.target.value)}
            value={editedTitle}
          />
          <br />
          <button type="submit" className="btn btn-success">
            Update
          </button>
          <button onClick={cancelEdit} className="btn btn-danger">
            Cancel Update
          </button>
        </form>
      )}
    </>
  );
};
