import {View, Text, StyleSheet, FlatList, Pressable, TextInput, TouchableOpacity} from 'react-native';
import {useState} from 'react'
import { data } from '../data/todos';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const Index = () =>{
    const [list, setList] = useState(data.sort((a,b)=>b.id-a.id));
    const [todo, setTodo] = useState('');

    const handlePress = (id: number) =>{
        setList((prevList)=>{
            return prevList.map((item)=> item.id===id ? {...item, completed: !item.completed} : item);
        })
    }
    const handleDelete = (id: number) =>{
        setList((prevList)=>
        prevList.filter((item)=>item.id!==id));
    }
    const handleAdd = () =>{
        if(todo.trim()){
            const newId = list.length > 0 ? list[0].id+1 : 1;
            setList([{completed: false, id: newId, title: todo}, ...list]);
            setTodo('');
        }
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView>
                <View style={styles.inputContainer}>
                    <TextInput placeholder='Enter you task' style={styles.textInput} value={todo} onChangeText={(text)=>setTodo(text)}/>
                    <TouchableOpacity onPress={handleAdd} style={styles.button}><Text style={styles.buttonText}>Enter</Text></TouchableOpacity>
                </View>
                <FlatList 
                    contentContainerStyle={styles.container}
                    data={list}
                    keyExtractor={(item)=>item.id.toString()}
                    renderItem={({item})=> (
                        <View style={styles.row}>
                            <Pressable onPress={()=>handlePress(item.id)}>
                                <Text style={item.completed ? {textDecorationLine: 'line-through'} : {}}>{item.title}</Text>
                            </Pressable>
                            <Pressable onPress={()=>handleDelete(item.id)}>
                                <Ionicons name="trash" size={24} color="black" />
                            </Pressable>
                        </View>
                    )}
                />
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'stretch',
        backgroundColor: '#000',
        padding: 10
    },
    row: {
        padding: 10,
        backgroundColor: 'white',
        margin: 5,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    inputContainer: {
        padding: 10,
        flexDirection: 'row',
        gap: 10,
        backgroundColor: '#000'
    },
    textInput: {
        borderWidth: 2,
        borderRadius: 5,
        width: '80%',
        padding: 10,
        backgroundColor: 'white'
    },
    button: {
        backgroundColor: '#6495deff',
        color: 'white',
        paddingHorizontal: 0,
        paddingVertical: 5,
        borderRadius: 5,
        width: '18%'
    },
    buttonText: {
        fontWeight: 'bold',
        color: 'white', 
        margin: 'auto'
    }
})

export default Index;