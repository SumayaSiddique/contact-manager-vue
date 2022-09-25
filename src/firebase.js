import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { ref, onUnmounted } from 'vue'
const firebaseConfig = {
    apiKey: "AIzaSyChyQWdbJ5S6axXg_N5XBzOG-mgQ6KdhPM",
    authDomain: "contact-manager-5d36a.firebaseapp.com",
    projectId: "contact-manager-5d36a",
    storageBucket: "contact-manager-5d36a.appspot.com",
    messagingSenderId: "1086561083967",
    appId: "1:1086561083967:web:14eabcc0dc2f9ee3bace8a",
    measurementId: "G-1NRX2TEGXD"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export {db};

export const deleteContact = id => {
    return contactsCollection.doc(id).delete()
  }

export const useLoadContacts = () => {
    const contacts = ref([])
    const close = contactsCollection.onSnapshot(snapshot => {
      contacts.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    })
    onUnmounted(close)
    return contacts
  }

