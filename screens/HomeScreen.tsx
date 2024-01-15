import React, { useState, useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import Cards from "../components/Cards";
import { getBooks, BookResponse } from "../services/apiServices";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

const HomeScreen = () => {
  const [books, setBooks] = useState<BookResponse[]>([]);
  const navigation = useNavigation();

  const fetchData = async () => {
    try {
      const response = await getBooks();
      setBooks(response);
    } catch (error) {
      console.error("Error getting books: ", error);
    }
  };

  const refreshBooks = async () => {
    await fetchData();
  };
  

  useEffect(() => {
    fetchData();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );

  return (
    <View>
      <Cards books={books} refreshBooks={refreshBooks} />
    </View>
  );
};

export default HomeScreen;