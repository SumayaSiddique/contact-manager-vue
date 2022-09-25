/*import {db} from "firebase.js";

import {
        collection,
        getDocs,
        getDoc,
        addDoc,
        updateDoc, 
        deleteDoc,
        doc,
} from "firebase/firestore";

const contactCollectionRef = collection(db, "contacts");

class ContactService{
    addContacts=(newContact)=>{
        return addDoc(contactCollectionRef, newContact);
    }
    updateBook=(id, updatedContact)=>{
        const contactDoc= doc(db, "contacts", id);
        return updateDoc(contactDoc, updatedContact);
    }
    deleteBook=(id)=>{
        const contactDoc= doc(db, "contacts", id);
        return deleteDoc(contactDoc);
    }
    getContacts=()=>{
        return getDocs(contactCollectionRef);
    }
    getContact=(id)=>{
        const contactDoc= doc(db, "contacts", id);
        return getDoc(contactDoc);
    }
}

export default new ContactService();?*/
