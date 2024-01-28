// firebase.js
import firebase from "firebase/app"
import "firebase/firestore" // Import only the services you need
import "firebase/auth"

const firebaseConfig = {
	apiKey: "AIzaSyBn1qOxv9SPPRb3pH6meFPnOHIDrFiXSn8",
	authDomain: "waseda-laboratories.firebaseapp.com",
	databaseURL: "https://waseda-laboratories-default-rtdb.asia-southeast1.firebasedatabase.app",
	projectId: "waseda-laboratories",
	storageBucket: "waseda-laboratories.appspot.com",
	messagingSenderId: "599975407062",
	appId: "1:599975407062:web:acf279b6706cb3601cc877",
	measurementId: "G-MGPKYYXHT8",
}
firebase.initializeApp(firebaseConfig)

export const firestore = firebase.firestore()
export const auth = firebase.auth()
export const db = firebase.firestore()
export const storage = firebase.storage()

//Just for testing
const data = firestore.collection("your_collection").get()
data.docs.forEach((doc) => {
	console.log(doc.data())
})
