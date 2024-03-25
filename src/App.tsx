import "./App.css";
import { AddBooks } from "./Components/AddBooks";
import { ViewBooks } from "./Components/ViewBooks";
import { useState } from "react";
import type { BooksWithID } from "./types";

function App() {
  const [bookToEdit, setBookToEdit] = useState<BooksWithID | null>(null);

  const handleEditBook = (book: BooksWithID) => {
    setBookToEdit(book);
  };

  const cancelEdit = () => {
    setBookToEdit(null);
  };

  return (
    <div className="wrapper">
      <h1>Book list App</h1>
      <div>
        <AddBooks bookToEdit={bookToEdit} cancelEdit={cancelEdit} />
        <ViewBooks
          handleEditBook={handleEditBook}
          bookToEdit={bookToEdit}
          cancelEdit={cancelEdit}
        />
      </div>
    </div>
  );
}

export default App;
