import React from 'react';
import {
    TextInput,
    StyleSheet
} from 'react-native';

export default function CustomInput ({password, placeholder, onChange, style}) {

    return(
        <TextInput
            placeholder={placeholder}
            style={[styles.container, style, {color: 'black'}]}
            secureTextEntry={password}
            onChangeText={onChange}
        />
    )
};

const styles = StyleSheet.create({
    container: {
        borderColor: 'grey',
        borderWidth: 0.5,
        height: 45,
        width:'100%',
        borderRadius: 10,
        padding: 10,
    }
})