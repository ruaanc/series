import React from "react";
import { View, TextInput, StyleSheet } from 'react-native';
import FormRow from "../components/FormRow";

const LoginScreen = (props) => {
  return (
    <View>
        <FormRow>
            <TextInput style={styles.input} placeholder="user@mail.com"/>
        </FormRow>
        <FormRow>
            <TextInput style={styles.input} placeholder="******" secureTextEntry/>
        </FormRow>
    </View>
  );
};

const styles = StyleSheet.create({
   input: {
       paddingLeft: 5,
       paddingRight: 5,
       paddingBottom: 5
   }
});

export default LoginScreen;
