import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  TextInput,
  TouchableOpacity,
  ColorSchemeName,
} from "react-native";
import { useState, useContext, useEffect } from "react";
import { data } from "../data/todos";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Inter_500Medium, useFonts } from "@expo-google-fonts/inter";
import { ThemeContext } from "../contexts/ThemeContext";
import { Colors } from "../constants/Colors";
import { Octicons } from "@expo/vector-icons";
import Animated, {LayoutAnimation, LinearTransition} from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from "expo-status-bar";

const Index = () => {
  const [list, setList] = useState(data.sort((a, b) => b.id - a.id));
  const [todo, setTodo] = useState("");
  const { theme, colorScheme, setColorScheme } = useContext(ThemeContext);
  const styles = createStylesSheet(theme, colorScheme);

  const [loaded, error] = useFonts({
    Inter_500Medium,
  });

  useEffect(()=>{
    const fetch = async () =>{
      try{
        const jsonValue = await AsyncStorage.getItem("TodoApp");
        const storedValue = jsonValue!=null ? JSON.parse(jsonValue): null;

        if(storedValue && storedValue.length){
          setList(storedValue.sort((a: { id: number; },b: { id: number; })=>b.id-a.id));
        }else{
          setList(data.sort((a,b)=>b.id-a.id));
        }
      }catch(e){
        console.error(e);
      }
    }
    fetch();
  }, [data]);

  useEffect(()=>{
    const storeData = async () =>{
      try{
        const jsonValue = JSON.stringify(list);
        await AsyncStorage.setItem("TodoApp", jsonValue);
      }catch(e){
        console.error(e);
      }
    }
    storeData();
  },[list])

  if (!loaded && !error) {
    return null;
  }

  const handlePress = (id: number) => {
    setList((prevList) => {
      return prevList.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      );
    });
  };
  const handleDelete = (id: number) => {
    setList((prevList) => prevList.filter((item) => item.id !== id));
  };
  const handleAdd = () => {
    if (todo.trim()) {
      const newId = list.length > 0 ? list[0].id + 1 : 1;
      setList([{ completed: false, id: newId, title: todo }, ...list]);
      setTodo("");
    }
  };

  return (
      <SafeAreaView>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Enter you task"
            style={styles.textInput}
            value={todo}
            onChangeText={(text) => setTodo(text)}
          />
          <TouchableOpacity onPress={handleAdd} style={styles.button}>
            <Text style={styles.buttonText}>Enter</Text>
          </TouchableOpacity>
          <Pressable onPress={()=>setColorScheme(colorScheme==='light'?'dark':'light')}>
            <Octicons name={colorScheme==='light'?'moon':'sun'} size={36} color={theme.text} selectable={undefined} style={{width: 36}}/>
          </Pressable>
        </View>
        <Animated.FlatList
          itemLayoutAnimation={LinearTransition}
          keyboardDismissMode={"on-drag"}
          contentContainerStyle={styles.container}
          data={list}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <Pressable onPress={() => handlePress(item.id)}>
                <Text
                  style={
                    item.completed
                      ? {
                          textDecorationLine: "line-through",
                          fontFamily: "Inter_500Medium",
                        }
                      : { fontFamily: "Inter_500Medium" }
                  }
                >
                  {item.title}
                </Text>
              </Pressable>
              <Pressable onPress={() => handleDelete(item.id)}>
                <Ionicons name="trash" size={24} color="black" />
              </Pressable>
            </View>
          )}
        />
        <StatusBar style={colorScheme==='dark'?'light':'dark'}/>
      </SafeAreaView>
  );
};

function createStylesSheet(theme: typeof Colors.light,colorScheme: ColorSchemeName) {
  return StyleSheet.create({
    container: {
      flexGrow: 1,
      alignItems: "stretch",
      backgroundColor: theme.background,
      padding: 10,
    },
    row: {
      padding: 10,
      backgroundColor: "white",
      margin: 5,
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      borderWidth: 2,
    },
    inputContainer: {
      padding: 10,
      flexDirection: "row",
      justifyContent: 'center',
      alignContent: 'center',
      gap: 10,
      backgroundColor: theme.background,
    },
    textInput: {
      borderWidth: 2,
      borderRadius: 5,
      fontFamily: "Inter_500Medium",
      width: "65%",
      padding: 10,
      backgroundColor: "white",
    },
    button: {
      backgroundColor: "#6495deff",
      color: "white",
      paddingHorizontal: 0,
      paddingVertical: 5,
      borderRadius: 5,
      width: "18%",
    },
    buttonText: {
      fontFamily: "Inter_500Medium",
      fontWeight: "bold",
      color: "white",
      margin: "auto",
    },
  });
}
export default Index;
