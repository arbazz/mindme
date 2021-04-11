import firebase from '@react-native-firebase/app';
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';
import auth from '@react-native-firebase/auth';
import { Settings, LoginManager, AccessToken } from 'react-native-fbsdk-next';


Settings.initializeSDK();

export const loginWithFacebook = async () => {
  const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

  if (result.isCancelled) {
    throw 'User cancelled the login process';
  }

  // Once signed in, get the users AccesToken
  const data = await AccessToken.getCurrentAccessToken();

  if (!data) {
    throw 'Something went wrong obtaining access token';
  }

  // Create a Firebase credential with the AccessToken
  const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

  // Sign-in the user with the credential
  return auth().signInWithCredential(facebookCredential);
};

// await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);  // Set persistent auth state
// const credential = firebase.auth.FacebookAuthProvider.credential(token);
// const facebookProfileData = await firebase.auth().signInAndRetrieveDataWithCredential(credential);  // Sign in with Facebook credential

GoogleSignin.configure({
  webClientId: '706867578918-ma5u68o47t6c9p7ftul6qic2nt6t4pdi.apps.googleusercontent.com',
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