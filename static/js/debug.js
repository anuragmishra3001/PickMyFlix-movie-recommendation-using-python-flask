// Debug version of script.js

// Global variables
let allMovies = [];
let selectedGenres = [];

// Function to test API endpoints
async function testAPI() {
    console.log('Testing API endpoints...');
    
    try {
        // Test movies API
        console.log('Testing /api/movies endpoint...');
        const moviesResponse = await fetch('/api/movies');
        const movies = await moviesResponse.json();
        console.log('Movies API response:', movies);
        
        // Test search API
        console.log('Testing /api/movies/search endpoint...');
        const searchResponse = await fetch('/api/movies/search?q=action');
        const searchResults = await searchResponse.json();
        console.log('Search API response:', searchResults);
        
        // Test recommendations API
        console.log('Testing /api/movies/recommendations endpoint...');
        const recommendationsResponse = await fetch('/api/movies/recommendations?genres=action,drama');
        const recommendations = await recommendationsResponse.json();
        console.log('Recommendations API response:', recommendations);
        
        // Test movie by ID API
        console.log('Testing /api/movies/{id} endpoint...');
        const movieResponse = await fetch('/api/movies/1');
        const movie = await movieResponse.json();
        console.log('Movie API response:', movie);
        
        return {
            success: true,
            movies,
            searchResults,
            recommendations,
            movie
        };
    } catch (error) {
        console.error('API test failed:', error);
        return {
            success: false,
            error: error.message
        };
    }
}

// Function to test DOM elements
function testDOM() {
    console.log('Testing DOM elements...');
    
    const elements = [
        'searchInput',
        'searchBtn',
        'searchResults',
        'moviesGrid',
        'recommendationsGrid',
        'getRecommendationsBtn',
        'movieModal',
        'modalContent',
        'hamburger',
        'navMenu'
    ];
    
    const results = {};
    
    elements.forEach(id => {
        const element = document.getElementById(id);
        results[id] = {
            exists: !!element,
            type: element ? element.tagName : null
        };
    });
    
    console.log('DOM test results:', results);
    
    return results;
}

// Function to test event listeners
function testEventListeners() {
    console.log('Testing event listeners...');
    
    try {
        // Check if functions exist
        const functions = [
            'performSearch',
            'getRecommendations',
            'toggleGenre',
            'openMovieModal',
            'closeMovieModal',
            'createMovieCard',
            'createModalContent',
            'showLoading',
            'showError',
            'showNotification'
        ];
        
        const results = {};
        
        functions.forEach(funcName => {
            // Check if the function exists in the global scope
            results[funcName] = typeof window[funcName] === 'function';
        });
        
        console.log('Event listener test results:', results);
        
        return results;
    } catch (error) {
        console.error('Event listener test failed:', error);
        return {
            success: false,
            error: error.message
        };
    }
}

// Run tests when the page loads
document.addEventListener('DOMContentLoaded', async function() {
    console.log('Debug script loaded');
    
    // Add event listeners to test buttons
    const testSearchBtn = document.getElementById('testSearch');
    const testRecommendationsBtn = document.getElementById('testRecommendations');
    const testMovieModalBtn = document.getElementById('testMovieModal');
    const testGenreSelectionBtn = document.getElementById('testGenreSelection');
    
    // Set up event listeners for the buttons
    if (testSearchBtn) {
        testSearchBtn.addEventListener('click', async function() {
            try {
                console.log('Testing search API...');
                const response = await fetch('/api/movies/search?q=action');
                const data = await response.json();
                console.log('Search results:', data);
                const apiResults = document.getElementById('apiResults');
                if (apiResults) {
                    apiResults.textContent = JSON.stringify(data, null, 2);
                }
            } catch (error) {
                console.error('Search API error:', error);
            }
        });
    } else {
        console.error('testSearch button not found');
    }
    
    if (testRecommendationsBtn) {
        testRecommendationsBtn.addEventListener('click', async function() {
            try {
                console.log('Testing recommendations API...');
                const response = await fetch('/api/movies/recommendations?genres=action,drama');
                const data = await response.json();
                console.log('Recommendation results:', data);
                const apiResults = document.getElementById('apiResults');
                if (apiResults) {
                    apiResults.textContent = JSON.stringify(data, null, 2);
                }
            } catch (error) {
                console.error('Recommendations API error:', error);
            }
        });
    } else {
        console.error('testRecommendations button not found');
    }
    
    if (testMovieModalBtn) {
        testMovieModalBtn.addEventListener('click', async function() {
            try {
                console.log('Testing movie modal...');
                const response = await fetch('/api/movies/1');
                const movie = await response.json();
                console.log('Movie data:', movie);
                const domResults = document.getElementById('domResults');
                if (domResults) {
                    domResults.textContent = JSON.stringify(movie, null, 2);
                }
            } catch (error) {
                console.error('Movie modal error:', error);
            }
        });
    } else {
        console.error('testMovieModal button not found');
    }
    
    if (testGenreSelectionBtn) {
        testGenreSelectionBtn.addEventListener('click', function() {
            try {
                console.log('Testing genre selection...');
                const results = testDOM(); // Reuse the DOM test function
                const eventResults = document.getElementById('eventResults');
                if (eventResults) {
                    eventResults.textContent = JSON.stringify(results, null, 2);
                }
            } catch (error) {
                console.error('Genre selection error:', error);
            }
        });
    } else {
        console.error('testGenreSelection button not found');
    }
    
    // Run API test automatically
    testAPI().then(results => {
        console.log('Automatic API test results:', results);
        const apiResults = document.getElementById('apiResults');
        if (apiResults) {
            apiResults.textContent = JSON.stringify(results, null, 2);
        }
    });
});