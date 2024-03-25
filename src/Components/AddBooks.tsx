import { useEffect, useState } from "react";
import { SyntheticEvent } from "react";
import { addBookToFirestore, updateBook } from "../Store/BooksSlice";
import { useAppDispatch } from "../Store/hooks";

export interface Book {
  author: string;
  title: string;
}

export const AddBooks = ({ bookToEdit, cancelEdit }) => {
  const dispatch = useAppDispatch();

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
    const book: Book = {
      author,
      title,
    };

    dispatch(addBookToFirestore(book));

    setAuthor("");
    setTitle("");
  };

  const handleUpdateBook = (e: SyntheticEvent) => {
    e.preventDefault();
    const book = { author: editedAuthor, title: editedTitle };
    dispatch(updateBook({ id: bookToEdit.id, book }));

    setEditedAuthor("");
    setEditedTitle("");

    cancelEdit();
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
        </form>
      ) : (
        <form className="form-group custom-form" onSubmit={handleUpdateBook}>
          <br />
          <label>Author</label>
          <input
            className="form-control"
            required
            onChange={(e) => setEditedAuthor(e.target.value)}
            value={editedAuthor}
          />
          <br />
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
        </form>
      )}
    </>
  );
};
