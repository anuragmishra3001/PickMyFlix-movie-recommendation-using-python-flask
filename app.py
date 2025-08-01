from flask import Flask, render_template, request, jsonify, Response
from flask_cors import CORS
import json
import random
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Sample movie data (in a real app, this would come from a database)
MOVIES_DATA = [
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
]

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/debug')
def debug():
    return render_template('debug.html')

@app.route('/api/movies')
def get_movies():
    """Get all movies"""
    return jsonify(MOVIES_DATA)

@app.route('/api/movies/search')
def search_movies():
    """Search movies by title or genre"""
    query = request.args.get('q', '').lower()
    if not query:
        return jsonify(MOVIES_DATA)
    
    filtered_movies = []
    for movie in MOVIES_DATA:
        if (query in movie['title'].lower() or 
            any(query in genre.lower() for genre in movie['genre'])):
            filtered_movies.append(movie)
    
    return jsonify(filtered_movies)

@app.route('/api/movies/recommendations')
def get_recommendations():
    """Get movie recommendations based on genre preferences"""
    user_genres = request.args.get('genres', '').split(',')
    user_genres = [genre.strip().lower() for genre in user_genres if genre.strip()]
    
    if not user_genres:
        # Return random movies if no preferences
        return jsonify(random.sample(MOVIES_DATA, min(4, len(MOVIES_DATA))))
    
    # Score movies based on genre match
    scored_movies = []
    for movie in MOVIES_DATA:
        score = 0
        movie_genres = [genre.lower() for genre in movie['genre']]
        for user_genre in user_genres:
            if user_genre in movie_genres:
                score += 1
        if score > 0:
            scored_movies.append((movie, score))
    
    # Sort by score and return top recommendations
    scored_movies.sort(key=lambda x: x[1], reverse=True)
    recommendations = [movie for movie, score in scored_movies[:4]]
    
    return jsonify(recommendations)

@app.route('/api/movies/<int:movie_id>')
def get_movie(movie_id):
    """Get a specific movie by ID"""
    movie = next((m for m in MOVIES_DATA if m['id'] == movie_id), None)
    if movie:
        return jsonify(movie)
    return jsonify({"error": "Movie not found"}), 404

@app.route('/api/ratings', methods=['POST'])
def add_rating():
    """Add a user rating for a movie"""
    data = request.get_json()
    movie_id = data.get('movie_id')
    rating = data.get('rating')
    
    if not movie_id or not rating:
        return jsonify({"error": "Missing movie_id or rating"}), 400
    
    # In a real app, this would be saved to a database
    return jsonify({
        "message": "Rating added successfully",
        "movie_id": movie_id,
        "rating": rating,
        "timestamp": datetime.now().isoformat()
    })

@app.route('/@vite/client', methods=['GET'])
def vite_client():
    """Handle Vite client requests to prevent 404 errors"""
    # Return an empty JavaScript file with appropriate headers
    return Response('', mimetype='application/javascript')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)