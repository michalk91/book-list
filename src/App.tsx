import "./App.css";
import { AddBooks } from "./Components/AddBooks";
import { ViewBooks } from "./Components/ViewBooks";
import { useState, useCallback } from "react";
import type { BooksWithID } from "./types";
import { useAppSelector } from "./Store/hooks";

function App() {
  const [bookToEdit, setBookToEdit] = useState<BooksWithID | null>(null);

  const data = useAppSelector((state) => state.books.booksArray);

  const handleEditBook = useCallback(
    (book: BooksWithID) => {
      setBookToEdit(book);
    },
    [setBookToEdit]
  );

  const cancelEdit = useCallback(() => {
    setBookToEdit(null);
  }, [setBookToEdit]);

  return (
    <div className="wrapper">
      <h1>Book list App</h1>
      <div>
        <AddBooks bookToEdit={bookToEdit} cancelEdit={cancelEdit} data={data} />
        <ViewBooks
          handleEditBook={handleEditBook}
          bookToEdit={bookToEdit}
          data={data}
        />
      </div>
    </div>
  );
}

export default App;
