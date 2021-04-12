import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { primary } from '../pages/config';


export default function Agree() {

    return (
        <View style={{ marginBottom: 10 }}>
            <View>
                <Text style={styles.tedxt}>
                    
                    
            </Text>
                <View style={styles.row}>
                    <TouchableOpacity style={styles.btn} onPress={()=>Actions.File({text: 'end'})}>
                        <Text style={styles.txt}>End User Agreement</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>Actions.File({text: 'end'})}>
                        <Text style={styles.txt}>Privacy Policy</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    tedxt: {
        alignItems: 'center',
        textAlign: 'center',
    },
    row: {
        flexDirection: 'row',
        alignSelf: 'center',
    },
    btn: {
        marginRight: 40
    },
    txt: {
        color: primary
    }
})