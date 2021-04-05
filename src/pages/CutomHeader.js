import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView
} from 'react-native';
import { background } from './config';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Actions } from 'react-native-router-flux';

export default function ({title}){

    return(
        <SafeAreaView style={styles.container}>
            <AntDesign style={styles.header} name="back" onPress={()=>Actions.pop()}/>
            <Text style={styles.headerTe}>{title}</Text>
            <View />
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: background,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 20
    },
    header: {
        fontSize:26,
    },
    headerTe: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 40
    }
})