import React from "react";
import { FlatList, StyleSheet } from "react-native";
import Card from "./Card";
import { useEffect } from "react";

interface Book {
    _id: string
    title: string
    author: string
    genre: string
    publicationYear: number
    synopsis: string
    numberOfPages: number
    imageURL: string
}

interface CardsProps {
    books: Book[];
    refreshBooks: () => Promise<void>;
  }

  const Cards = ({ books, refreshBooks }: CardsProps) => {
    const renderBook = ({ item }: { item: Book }) => {
      
      return (
        <Card
          _id={item._id}
          imageURL={item.imageURL}
          title={item.title}
          genre={item.genre}
          author={item.author}
          refreshBooks={refreshBooks}
        />
      );
    };
  
    return (
      <FlatList
        data={books}
        keyExtractor={(item) => (item._id)}
        renderItem={renderBook}
        numColumns={2}
        contentContainerStyle={styles.container}
      />
    );
  };

  const styles = StyleSheet.create({
    container: {
      justifyContent: "center",
      alignItems: "center",
      padding:25,
    },
  });
  
  export default Cards;