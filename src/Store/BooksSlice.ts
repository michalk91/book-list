import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import db from "../Firebase/config";
import { Book } from "../Components/AddBooks";

interface BooksWithID {
  id: string;
  book: Book;
}

export const addBookToFirestore = createAsyncThunk(
  "books/addBookToFirestore",
  async (book: Book) => {
    try {
      const addBookRef = await addDoc(collection(db, "Books"), book);
      const newBook = { id: addBookRef.id, book };

      return newBook;
    } catch (e) {
      console.error(e);
    }
  }
);

export const fetchBooks = createAsyncThunk("books/fetchBooks", async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "Books"));
    const books = querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          book: doc.data(),
        } as BooksWithID)
    );
    return books;
  } catch (e) {
    console.error(e);
  }
});

export const deleteBook = createAsyncThunk(
  "books/deleteBook",
  async (id: string) => {
    const books = await getDocs(collection(db, "Books"));

    for (const snap of books.docs) {
      if (snap.id === id) {
        await deleteDoc(doc(db, "Books", snap.id));
      }
    }
    return id;
  }
);

export const deleteAllBooks = createAsyncThunk(
  "books/deleteAllBooks",
  async () => {
    const books = await getDocs(collection(db, "Books"));
    for (const snap of books.docs) {
      await deleteDoc(doc(db, "Books", snap.id));
    }
    return [];
  }
);

export const updateBook = createAsyncThunk(
  "book/updateBook",
  async (editedBook: BooksWithID) => {
    const books = await getDocs(collection(db, "Books"));
    for (const snap of books.docs) {
      if (snap.id === editedBook.id) {
        const bookRef = doc(db, "Books", snap.id);
        await updateDoc(bookRef, editedBook.book as object);
      }
    }
    return editedBook;
  }
);

const booksSlice = createSlice({
  name: "Books",
  initialState: {
    booksArray: [] as BooksWithID[],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addBookToFirestore.fulfilled, (state, action) => {
        if (action.payload) state.booksArray.push(action.payload);
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        if (action.payload) state.booksArray = action.payload;
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.booksArray = state.booksArray.filter(
          (book) => book.id !== action.payload
        );
      })
      .addCase(deleteAllBooks.fulfilled, (state, action) => {
        state.booksArray = action.payload;
      })
      .addCase(updateBook.fulfilled, (state, action) => {
        const { id, book } = action.payload;
        const bookIndex = state.booksArray.findIndex((book) => book.id === id);
        if (bookIndex !== -1) {
          state.booksArray[bookIndex] = { id: id, book };
        }
      });
  },
});

export default booksSlice.reducer;
