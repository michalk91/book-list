export interface Book {
  author: string;
  title: string;
}

export interface AddBooksProps {
  cancelEdit: () => void;
  bookToEdit: BooksWithID | null;
}

export interface ViewBooksProps {
  handleEditBook: (param: BooksWithID) => void;
  bookToEdit: BooksWithID | null;
}

export interface BooksWithID {
  id: string;
  book: Book;
}
