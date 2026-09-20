import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCFW5D4AfqyhbRyAcj4Sw641-JJuRClXas",
  authDomain: "djstylehub-afda4.firebaseapp.com",
  projectId: "djstylehub-afda4",
  storageBucket: "djstylehub-afda4.firebasestorage.app",
  messagingSenderId: "428285319768",
  appId: "1:428285319768:web:89f5d726e482877d25482d"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function syncUsersToFirestore() {
  console.log('Writing users directly into Firestore database djstylehub-afda4...');

  // Write Admin User document
  await setDoc(doc(db, 'users', 'user_madhukaran'), {
    uid: 'user_madhukaran',
    name: 'Madhukaran Reddy',
    email: 'madhukaran52@gmail.com',
    phone: '9296600679',
    role: 'admin',
    createdAt: new Date().toISOString()
  });

  // Write Standard User document
  await setDoc(doc(db, 'users', 'user_customer'), {
    uid: 'user_customer',
    name: 'Standard Customer',
    email: 'customer@djstylehub.com',
    phone: '9876543210',
    role: 'user',
    createdAt: new Date().toISOString()
  });

  console.log('SYNC COMPLETE! Documents written to collection "users" in Firestore!');
  process.exit(0);
}

syncUsersToFirestore().catch(err => {
  console.error('Error syncing to Firestore:', err);
  process.exit(1);
});
