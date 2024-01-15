import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { RouteProp, useNavigation} from "@react-navigation/native";
import FastImage from "react-native-fast-image";
import { useEffect } from "react";


interface CardDetailProps {
  route: {
    params: {
      book: {
        id: string;
        imageURL: string;
        title: string;
        genre: string;
        author: string;
        synopsis: string;
        publicationYear: number;
        numberOfPages: number;
      };
    };
  };
}


const CardDetail = ({ route }: CardDetailProps ) => {
    const { book } = route.params || {};
    const navigation = useNavigation();

    useEffect(() => {
    }, [book]);
  
    const goBack = () => {
      navigation.goBack();
    };
  
    return (
      <View style={styles.container}>
        <View style={styles.cardContainer}>
          <FastImage style={styles.image} source={{ uri: book.imageURL || "" }} />
          <Text style={styles.title}>{book.title || "Unknown Title"}</Text>
          <Text style={styles.text}>Genre: {book.genre || "Unknown Genre"}</Text>
          <Text style={styles.text}>Author: {book.author || "Unknown Author"}</Text>
          <Text style={styles.text}>Synopsis: {book.synopsis || "No Synopsis available"}</Text>
          <Text style={styles.text}>Publication year: {book.publicationYear || "Unknown"}</Text>
          <Text style={styles.text}>Number of pages: {book.numberOfPages || "Unknown"}</Text>
          <TouchableOpacity style={styles.button} onPress={goBack}>
            <Text style={styles.buttonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
      backgroundColor: "#f8f8f8", 
      marginBottom: 50,
      height: 100, 
      width:380,  
    },
    cardContainer: {
      backgroundColor: "#fff", 
      borderRadius: 10,
      padding: 20,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    image: {
      width: 200,
      height: 300,
      resizeMode: "cover",
    },
    title: {
      fontSize: 35,
      fontWeight: "bold",
      marginVertical: 10,
      color: "black",
    },
    text: {
      fontSize: 18,
      color: "black",
      marginVertical: 5,
    },
    button: {
      marginTop: 20,
      padding: 10,
      backgroundColor: "blue",
      borderRadius: 20,
      alignSelf: "flex-start",
    },
    buttonText: {
      color: "white",
      fontSize: 18,
      fontWeight: "bold",
    },
  });
  
  
export default CardDetail
