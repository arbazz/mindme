import firestore from '@react-native-firebase/firestore';


const usersCollection = firestore().collection('Users');


const getUser = () => {
    return new Promise((res, rej) => {
        usersCollection.get()
            .then((querySnapshot) => {
                let temp = [];
                querySnapshot.forEach(documentSnapshot => {
                    // console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
                    temp.push({ docData: documentSnapshot.data(), docId: documentSnapshot.id });
                });
                res(temp);
            })
    })
};

export {
    getUser
}