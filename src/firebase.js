import firebase from 'firebase/app'
import 'firebase/auth'

const config = {
  apiKey: "AIzaSyBVjHmA_CLy4YWJ1DQSoEwGhl906lUMptQ",
  authDomain: "seesea-ezaki-lab.firebaseapp.com",
  databaseURL: "https://seesea-ezaki-lab.firebaseio.com",
  projectId: "seesea-ezaki-lab",
  storageBucket: "",
  messagingSenderId: "714730097554",
  appId: "1:714730097554:web:ccf645056e549933"
}

firebase.initializeApp(config)

export default firebase