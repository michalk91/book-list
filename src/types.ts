export interface Book {
  author: string;
  title: string;
}

export interface AddBooksProps {
  bookToEdit: BooksWithID | null;
  cancelEdit: () => void;
}

export interface ViewBooksProps extends AddBooksProps {
  handleEditBook: (param: BooksWithID) => void;
}

export interface BooksWithID {
  id: string;
  book: Book;
}
