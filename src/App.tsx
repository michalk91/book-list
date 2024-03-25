import "./App.css";
import { AddBooks } from "./Components/AddBooks";
import { ViewBooks } from "./Components/ViewBooks";
import { useState } from "react";

function App() {
  const [bookToEdit, setBookToEdit] = useState(null);

  const handleEditBook = (book: any) => {
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
