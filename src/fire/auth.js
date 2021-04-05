import firebase from '@react-native-firebase/app';
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';
import auth from '@react-native-firebase/auth';

export const loginWithFacebook = async () => {
  try {
    await Facebook.initializeAsync({
      appId: '196064695203722',
    });
    const {
      type,
      token,
      expirationDate,
      permissions,
      declinedPermissions,
    } = await Facebook.logInWithReadPermissionsAsync({
      permissions: ['public_profile'],
    });
    if (type === 'success') {
      // Get the user's name using Facebook's Graph API
      const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
      Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
    } else {
      // type === 'cancel'
    }
  } catch ({ message }) {
    alert(`Facebook Login Error: ${message}`);
  }
};

// await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);  // Set persistent auth state
// const credential = firebase.auth.FacebookAuthProvider.credential(token);
// const facebookProfileData = await firebase.auth().signInAndRetrieveDataWithCredential(credential);  // Sign in with Facebook credential

GoogleSignin.configure({
  webClientId: '417597850680-qnn4qotfoqu1ag4rgap1sm0dg0b67ava.apps.googleusercontent.com',
});
export const googleSignin = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(userInfo.idToken);
    // console.log(userInfo)
    return auth().signInWithCredential(googleCredential);
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      // user cancelled the login flow
      console.log("error", error, code)
    } else if (error.code === statusCodes.IN_PROGRESS) {
      console.log("error", error, code)
      // operation (e.g. sign in) is in progress already
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      console.log("error", error, code)
      // play services not available or outdated
    } else {
      // some other error happened
    }
    console.log("error", error, "cdeo")
  }
}