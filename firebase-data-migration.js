// Firebase Data Migration Script
// This script will migrate the movie data from app.py to Firebase Firestore

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Firebase configuration - Replace with your actual Firebase project configuration
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
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Movie data from app.py
const MOVIES_DATA = [
  {
    "id": 1,
    "title": "The Shawshank Redemption",
    "genre": ["Drama"],
    "year": 1994,
    "rating": 9.3,
    "poster": "/static/images/posters/the_shawshank_redemption_1994.svg",
    "description": "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency."
  },
  {
    "id": 2,
    "title": "The Godfather",
    "genre": ["Crime", "Drama"],
    "year": 1972,
    "rating": 9.2,
    "poster": "/static/images/posters/the_godfather_1972.svg",
    "description": "The aging patriarch of an organized crime dynasty transfers control to his reluctant son."
  },
  {
    "id": 3,
    "title": "Pulp Fiction",
    "genre": ["Crime", "Drama"],
    "year": 1994,
    "rating": 8.9,
    "poster": "/static/images/posters/pulp_fiction_1994.svg",
    "description": "The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption."
  },
  {
    "id": 4,
    "title": "The Dark Knight",
    "genre": ["Action", "Crime", "Drama"],
    "year": 2008,
    "rating": 9.0,
    "poster": "/static/images/posters/the_dark_knight_2008.svg",
    "description": "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham."
  },
  {
    "id": 5,
    "title": "Inception",
    "genre": ["Action", "Adventure", "Sci-Fi"],
    "year": 2010,
    "rating": 8.8,
    "poster": "/static/images/posters/inception_2010.svg",
    "description": "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea."
  },
  {
    "id": 6,
    "title": "Interstellar",
    "genre": ["Adventure", "Drama", "Sci-Fi"],
    "year": 2014,
    "rating": 8.6,
    "poster": "/static/images/posters/interstellar_2014.svg",
    "description": "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival."
  },
  {
    "id": 7,
    "title": "The Matrix",
    "genre": ["Action", "Sci-Fi"],
    "year": 1999,
    "rating": 8.7,
    "poster": "/static/images/posters/the_matrix_1999.svg",
    "description": "A computer programmer discovers that reality as he knows it is a simulation created by machines."
  },
  {
    "id": 8,
    "title": "Forrest Gump",
    "genre": ["Drama", "Romance"],
    "year": 1994,
    "rating": 8.8,
    "poster": "/static/images/posters/forrest_gump_1994.svg",
    "description": "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold."
  }
];

// Function to migrate data to Firestore
async function migrateDataToFirestore() {
  try {
    console.log('Starting data migration to Firestore...');
    
    for (const movie of MOVIES_DATA) {
      // Convert numeric ID to string for Firestore document ID
      const movieId = movie.id.toString();
      
      // Create a reference to the movie document
      const movieRef = doc(db, 'movies', movieId);
      
      // Remove the id field from the data (since it's used as the document ID)
      const { id, ...movieData } = movie;
      
      // Add the movie to Firestore
      await setDoc(movieRef, movieData);
      console.log(`Migrated movie: ${movie.title}`);
    }
    
    console.log('Data migration completed successfully!');
  } catch (error) {
    console.error('Error migrating data to Firestore:', error);
  }
}

// Run the migration
document.addEventListener('DOMContentLoaded', () => {
  const migrateButton = document.getElementById('migrateData');
  if (migrateButton) {
    migrateButton.addEventListener('click', migrateDataToFirestore);
  } else {
    console.error('Migration button not found');
  }
});