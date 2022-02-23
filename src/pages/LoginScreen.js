import React from "react";
import {View, TextInput, StyleSheet, Button} from 'react-native';
import FormRow from "../components/FormRow";
import {useState, useEffect} from "react";
import firebase from "firebase/compat";

const LoginScreen = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = () => {
        console.log(email);
        console.log(password);
    }

    useEffect(() => {
        const firebaseConfig = {
            apiKey: "",
            authDomain: "",
            projectId: "",
            storageBucket: "",
            messagingSenderId: "",
            appId: "",
            measurementId: ""
        };
        firebase.initializeApp(firebaseConfig);
        firebase.auth().signInWithEmailAndPassword('admin@series.com', 'admin@admin').then(user => {
            console.log('usuário autenticado', user);
        }).catch(error => {
            console.log('Usuário não encontrado', error);
        });

    }, []);

    return (
        <View style={styles.container}>
            <FormRow first>
                <TextInput style={styles.input} placeholder="user@mail.com" value={email}
                           onChangeText={value => setEmail(value)}/>
            </FormRow>
            <FormRow last>
                <TextInput style={styles.input} placeholder="******" secureTextEntry value={password}
                           onChangeText={value => setPassword(value)}/>
            </FormRow>
            <Button title="Login" onPress={() => login()}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10
    },
    input: {
        paddingLeft: 5,
        paddingRight: 5,
        paddingBottom: 5
    }
});

export default LoginScreen;
