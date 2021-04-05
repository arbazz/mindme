import React from 'react';
import {
    TouchableOpacity,
    Text
} from 'react-native';
import { primary } from '../pages/config';

export default function CustomButton({text, onPress}) {

    return(
        <TouchableOpacity
        onPress={onPress}
            style={
                {
                    backgroundColor: primary,
                    width: '100%',
                    borderRadius: 8,
                    height: 50,
                    justifyContent: 'center',
                    alignItems: 'center'
                }
            }
        >
            <Text 
                style={
                    {
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: 16
                    }
                }
            >
                {text}
            </Text>
        </TouchableOpacity>
    )
}