import React from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import Form from "../components/Form";

const FormScreen = () => {
    const handleFormSubmit = () => {
    Alert.alert("Form submitted successfully");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ADD BOOK TO THE COLLECTION 📚</Text>
      <Form onSubmitSuccess={handleFormSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff", 
    padding: 16,
    paddingTop: 1,
  },
  title: {
    color: "#007BFF", 
    fontSize: 28,
    fontWeight: "bold", 
    marginBottom: 8,
    alignSelf: "center",
    letterSpacing: 1, // Ajusta el espaciado entre letras
    textShadowColor: "#000",
    textShadowOffset: {
      width: 1,
      height: 1,
    },
    textShadowRadius: 3,
  },  
});

export default FormScreen;
