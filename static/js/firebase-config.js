// Firebase configuration
// Replace these values with your actual Firebase project configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};

// Initialize Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, collection, getDocs, getDoc, setDoc, doc, query, where, addDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Auth functions
export const registerUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getCurrentUser = () => {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve(user);
    });
  });
};

// Firestore functions
export const getAllMovies = async () => {
  try {
    const moviesCollection = collection(db, 'movies');
    const moviesSnapshot = await getDocs(moviesCollection);
    const moviesList = moviesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return moviesList;
  } catch (error) {
    console.error('Error getting movies:', error);
    throw error;
  }
};

export const searchMovies = async (searchTerm) => {
  try {
    const moviesCollection = collection(db, 'movies');
    const moviesSnapshot = await getDocs(moviesCollection);
    const moviesList = moviesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    // Filter movies based on search term
    return moviesList.filter(movie => {
      const title = movie.title.toLowerCase();
      const genres = movie.genre.map(g => g.toLowerCase());
      const term = searchTerm.toLowerCase();
      
      return title.includes(term) || genres.some(g => g.includes(term));
    });
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
};

export const getMovieRecommendations = async (genres) => {
  try {
    const moviesCollection = collection(db, 'movies');
    const moviesSnapshot = await getDocs(moviesCollection);
    const moviesList = moviesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    // Score and filter movies based on genre match
    const scoredMovies = moviesList.map(movie => {
      let score = 0;
      const movieGenres = movie.genre.map(g => g.toLowerCase());
      
      genres.forEach(genre => {
        if (movieGenres.includes(genre.toLowerCase())) {
          score += 1;
        }
      });
      
      return { movie, score };
    }).filter(item => item.score > 0);
    
    // Sort by score and return top recommendations
    scoredMovies.sort((a, b) => b.score - a.score);
    return scoredMovies.slice(0, 4).map(item => item.movie);
  } catch (error) {
    console.error('Error getting recommendations:', error);
    throw error;
  }
};

export const getMovieById = async (movieId) => {
  try {
    const movieDoc = doc(db, 'movies', movieId);
    const movieSnapshot = await getDoc(movieDoc);
    
    if (movieSnapshot.exists()) {
      return {
        id: movieSnapshot.id,
        ...movieSnapshot.data()
      };
    } else {
      return { error: 'Movie not found' };
    }
  } catch (error) {
    console.error('Error getting movie:', error);
    throw error;
  }
};

export const addRating = async (userId, movieId, rating) => {
  try {
    const ratingRef = doc(db, 'ratings', `${userId}_${movieId}`);
    await setDoc(ratingRef, {
      userId,
      movieId,
      rating,
      timestamp: new Date().toISOString()
    });
    return { message: 'Rating added successfully' };
  } catch (error) {
    console.error('Error adding rating:', error);
    throw error;
  }
};

export { auth, db };