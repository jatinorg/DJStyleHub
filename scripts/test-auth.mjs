import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCFW5B4AfqyhbRYAcj4Sw641-JJuRClXas",
  authDomain: "djstylehub-afda4.firebaseapp.com",
  projectId: "djstylehub-afda4",
  storageBucket: "djstylehub-afda4.firebasestorage.app",
  messagingSenderId: "428285319768",
  appId: "1:428285319768:web:89f5d726e482877d25482d"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

async function testAuth() {
  const testEmail = `test_${Date.now()}@gmail.com`;
  console.log('Testing createUserWithEmailAndPassword with email:', testEmail);
  const res = await createUserWithEmailAndPassword(auth, testEmail, 'Password123!');
  console.log('SUCCESS! Firebase Auth User UID:', res.user.uid);
  process.exit(0);
}

testAuth().catch(err => {
  console.error('Firebase Auth error:', err.code, err.message);
  process.exit(1);
});
