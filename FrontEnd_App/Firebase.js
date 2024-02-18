import firebase from "firebase/compat/app"
import "firebase/compat/firestore"

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

export const db = firebase.firestore()

//Just for testing
db.collection("faculties")
	.get()
	.then((querySnapshot) => {
		querySnapshot.forEach((doc) => {
			console.log(`${doc.id} => ${doc.data()}`)
		})
	})

console.log("lmaoooo")
