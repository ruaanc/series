import React from "react";
import {
    View,
    TextInput,
    StyleSheet,
    Button,
    ActivityIndicator,
    Text,
    Alert
} from 'react-native';
import FormRow from "../components/FormRow";
import {useState} from "react";
import firebase from "firebase/compat";

const LoginScreen = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const login = () => {
        setLoading(true);
        const loginUserSuccess = () => {
            setMessage('Success');
        };

        const loginUserFailed = (errorCode) => {
            setMessage(getMessageByErrorCode(errorCode));
        };
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
        firebase.auth().signInWithEmailAndPassword(email, password).then(user => {
            loginUserSuccess();
        }).catch(error => {
            if (error.code === 'auth/user-not-found') {
                Alert.alert(
                    'User not found',
                    'Do you want to create a record with the information entered?',
                    [{
                        text: 'No'
                    }, {
                        text: 'Yes',
                        onPress: () => {
                            firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
                                loginUserSuccess();
                            }).catch(err => {
                                loginUserFailed(err.code);
                            });
                        }
                    }],
                    {cancelable: false}
                );
            }else {
             loginUserFailed(error.code);
            }
        }).then(() => setLoading(false));
    }

    const getMessageByErrorCode = (errorCode) => {
        switch (errorCode) {
            case 'auth/wrong-password':
                return 'Incorrect password';
            case 'auth/internal error':
                return 'Internal error';
            default:
                return 'Unknown error.';
        }
    }

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
            {loading ? <ActivityIndicator color="#6ca2f7"/> : <Button title="Login" onPress={() => login()}/>}
            <Text>{message ? message : null}</Text>
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
