import React, { useState } from "react";
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet } from "react-native";
import { createBook, NewBookRequest } from "../services/apiServices";

interface FormProps {
  onSubmitSuccess: () => void;
}

const Form = ({ onSubmitSuccess }: FormProps) => {
  const [newBook, setNewBook] = useState<NewBookRequest>({
    title: "",
    author: "",
    genre: "",
    publicationYear: 0,
    synopsis: "",
    numberOfPages: 0,
    imageURL: "",
  });

  const handleInputChange = (field: keyof NewBookRequest, value: string | number) => {
  setNewBook((newBook) => ({ ...newBook, [field]: value }));
};

  const handleSubmit = async () => {
    try {
      await createBook(newBook);
      // Limpia el formulario después de la creación 
      setNewBook({
        title: "",
        author: "",
        genre: "",
        publicationYear: 0,
        synopsis: "",
        numberOfPages: 0,
        imageURL: "",
      });
      // Ejecuta la función cuando la creación tiene éxito
      onSubmitSuccess();
    } catch (error: any) {
      console.error("Error creating book:", error.response || error.message || error);
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title:</Text>
      <TextInput
        style={styles.input}
        value={newBook.title}
        onChangeText={(text) => handleInputChange("title", text)}
      />

      <Text style={styles.label}>Author:</Text>
      <TextInput
        style={styles.input}
        value={newBook.author}
        onChangeText={(text) => handleInputChange("author", text)}
      />

      <Text style={styles.label}>Genre:</Text>
      <TextInput
        style={styles.input}
        value={newBook.genre}
        onChangeText={(text) => handleInputChange("genre", text)}
      />

      <Text style={styles.label}>Publication year:</Text>
      <TextInput
        style={styles.input}
        value={newBook.publicationYear === 0 ? '' : newBook.publicationYear.toString()}
        onChangeText={(text) => handleInputChange("publicationYear", parseInt(text, 10) || 0)}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Synopsis:</Text>
      <TextInput
        style={[styles.input, styles.multilineInput]}
        value={newBook.synopsis}
        onChangeText={(text) => handleInputChange("synopsis", text)}
        multiline
      />

      <Text style={styles.label}>Number of pages:</Text>
      <TextInput
        style={styles.input}
        value={newBook.numberOfPages === 0 ? '' : newBook.numberOfPages.toString()}
        onChangeText={(text) => handleInputChange("numberOfPages", parseInt(text, 10) || 0)}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Image:</Text>
      <TextInput
        style={styles.input}
        value={newBook.imageURL}
        onChangeText={(text) => handleInputChange("imageURL", text)}
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>SUBMIT</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingTop: 1,
    marginBottom: 20,
    backgroundColor: "#f8f8f8", 
    borderRadius: 10, 
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // específico de Android para controlar la elevación
  },
  label: {
    color: "black",
    fontSize: 18,
    marginBottom: 5,
    
  },
  input: {
    height: 40,
    borderColor: "lightblue",
    borderWidth: 1,
    color: "black",
    fontSize: 15,
    padding: 8,
    marginBottom: 10,
    borderRadius: 20,
    shadowColor: "rgba(0, 0, 0, 0.1)", 
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1, // Opacidad de la sombra
    shadowRadius: 3, // Radio de la sombra
    elevation: 5, // Elevación para sombras en Android
  },
  multilineInput: {
    height: 80,
  },
  submitButton: {
    backgroundColor: "#007BFF",
    borderRadius: 20, 
    paddingVertical: 8,
    alignItems: "center",
    marginTop: 20, 
  },
  submitButtonText: {
    color: "white",
    fontSize: 18,
  },
});

export default Form;
