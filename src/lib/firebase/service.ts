import { collection, doc, getDoc, getDocs, getFirestore, addDoc, where, query } from "firebase/firestore";
import app from "./init";
import bcrypt from "bcrypt";

const firestore = getFirestore(app);

export async function getCollection(collectionName: string) {
    const snapshot = await getDocs(collection(firestore, collectionName));
    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
}

export async function retrieveDataById(collectionName: string, id: string) {
    const snapshot = await getDoc(doc(firestore, collectionName, id));
    return snapshot.data();
}

export async function signUp(userData: {
    email: string;
    fullname: string;
    phone: string;
    password: string;
    role?: string;
}, callback: Function) {
    const q = query(
        collection(firestore, 'users'),
        where('email', '==', userData?.email)
    );

    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((doc)=>({
        id: doc.id,
        ...doc.data()
    }));

    if (data.length > 0) {
        callback(false);
    } else {
        if (!userData.role) {
            userData.role = 'member';
        }
        userData.password = await bcrypt.hash(userData.password, 10);
        await addDoc(collection(firestore, 'users'), userData)
            .then(()=>{
                callback(true);
            })
            .catch((error)=>{
                callback(false);
                console.log(error);
            });
    }
}

export async function fetchProducts() {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}
