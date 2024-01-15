import axios from "axios";

export interface BookResponse {
  _id: string
  title: string;
  author: string;
  genre: string;
  publicationYear: number;
  synopsis: string;
  numberOfPages: number;
  imageURL: string;
}

export const getBooks = async () => {
    try {
      const response = await axios.get('http://192.168.100.117:4003/api/books');
      return response.data;

    } catch (error) {
      console.error("Error getting books from API:", error);
      throw error;
    }
  };

   export interface CardDetailParams {
    book: BookResponse;
  }

  export const getBookById = async (_id: string): Promise<CardDetailParams> => {
    try {
      const response = await axios.get(`http://192.168.100.117:4003/api/books/${_id}`);
      return response.data;

    } catch (error: any) {
      console.error("Error getting book by ID:", error.response || error.message || error);
      throw error;
    }
  };

  export interface NewBookRequest {
    title: string;
    author: string;
    genre: string;
    publicationYear: number;
    synopsis: string;
    numberOfPages: number;
    imageURL: string;
  }

  export const createBook = async (newBook: NewBookRequest): Promise<void> => {
    try {
      await axios.post("http://192.168.100.117:4003/api/books", newBook);
    } catch (error) {
      console.error("Error creating book:", error);
      throw error;
    }
  };

  export const deleteBook = async (_id: string): Promise<void> => {
    try {
      await axios.delete(`http://192.168.100.117:4003/api/books/${_id}`);
    } catch (error: any) {
      console.error("Error deleting book:", error.response || error.message || error);
      throw error;
    }
  };