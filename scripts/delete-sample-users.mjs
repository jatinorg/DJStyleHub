import { initializeApp } from 'firebase/app';
import { getFirestore, doc, deleteDoc } from 'firebase/firestore';

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

async function cleanSampleUsers() {
  console.log('Cleaning up manually seeded sample documents from Firestore users collection...');

  const sampleDocIds = [
    'user_madhukaran',
    'user_customer',
    'admin_sample_user',
    'standard_sample_user'
  ];

  for (const docId of sampleDocIds) {
    try {
      await deleteDoc(doc(db, 'users', docId));
      console.log(`Deleted sample document: ${docId}`);
    } catch (err) {
      console.warn(`Notice deleting ${docId}:`, err);
    }
  }

  console.log('CLEANUP COMPLETE! Sample user documents have been removed.');
  process.exit(0);
}

cleanSampleUsers().catch(err => {
  console.error('Error during sample users deletion:', err);
  process.exit(1);
});
