import firestore from '@react-native-firebase/firestore';


const usersCollection = firestore().collection('Users');


const addProfileData = (data) => {
    console.log(data);
    return new Promise((res, rej) => {
        usersCollection.add(data)
            .then(() => {
                res("true");
            })
    })
};

export {
    addProfileData
}