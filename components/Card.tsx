import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, Modal, Button } from "react-native";
import FastImage from "react-native-fast-image";
import { useNavigation } from "@react-navigation/native";
import { getBookById, CardDetailParams, deleteBook } from "../services/apiServices";

interface CardProps {
  _id: string;
  imageURL: string;
  title: string;
  genre: string;
  author: string;
  refreshBooks: () => Promise<void>;
}

const Card = ({ _id, imageURL ,title, genre, author, refreshBooks }: CardProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleCardPress = () => {
    setIsModalVisible(true);
  };

  const handleDeleteBook = async () => {
    try {
      await deleteBook(_id);
      setIsModalVisible(false);
      refreshBooks();

    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const navigation = useNavigation();

  const handleCardDetail = async () => {
    try {
      const book: CardDetailParams = await getBookById(_id);
      console.log(book)
      //@ts-ignore
      navigation.navigate("CardDetail", { book });
    } catch (error) {
      console.error("Error getting book details:", error);
    }
  };


  return (
    <TouchableOpacity style={styles.cardContainer} onPress={handleCardPress} >
      <FastImage style={styles.cardImage} source={{ uri: imageURL }} />
      <Text style={styles.cardText} numberOfLines={1}>
        Title: {title}
      </Text>
      <Text style={styles.cardText} numberOfLines={1}>
        Genre: {genre}
      </Text>
      <Text style={styles.cardText} numberOfLines={1}>
        Author: {author}
      </Text>

      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <TouchableOpacity
            onPress={handleCardDetail}
            style={[styles.modalButton, { backgroundColor: "#007BFF" }]}
          >
            <Text style={{ color: "#ffffff" }}>See book in detail</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleDeleteBook}
            style={[styles.modalButton, { backgroundColor: "#DC3545" }]}
          >
            <Text style={{ color: "#ffffff" }}>Delete book</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setIsModalVisible(false)}
            style={[styles.modalButton, { backgroundColor: "#28A745" }]}
          >
            <Text style={{ color: "#ffffff" }}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </TouchableOpacity>
  );
};


  const styles = StyleSheet.create({
  cardContainer: {
    width: "45%",
    marginBottom: 25,
    marginRight: 15,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingBottom: 16, 
  },
  cardImage: {
    width: "100%",
    height: 100,
    borderRadius: 8,
    borderWidth: 1,  // Agregar borde
    borderColor: "#ddd", 
    aspectRatio: 16 / 9,
  },
  cardText: {
    fontSize: 12,
    marginTop: 8,
    textAlign: "center",
    color: "black",
  },
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    modalButton: {
      paddingVertical: 25, // Ajusta la altura del botón
      paddingHorizontal: 30, // Ajusta el ancho del botón
      borderRadius: 25, 
      marginVertical: 30, // Espacio vertical entre los botones del modal
      justifyContent: "center",
      alignItems: "center",
    },
  });

export default Card;