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
    },
    {
        "id": 9,
        "title": "The Lord of the Rings: The Fellowship of the Ring",
        "genre": ["Action", "Adventure", "Drama"],
        "year": 2001,
        "rating": 8.8,
        "poster": "/static/images/placeholder.svg",
        "description": "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring."
    },
    {
        "id": 10,
        "title": "Fight Club",
        "genre": ["Drama"],
        "year": 1999,
        "rating": 8.8,
        "poster": "/static/images/placeholder.svg",
        "description": "An insomniac office worker and a devil-may-care soapmaker form an underground fight club."
    },
    {
        "id": 11,
        "title": "Goodfellas",
        "genre": ["Biography", "Crime", "Drama"],
        "year": 1990,
        "rating": 8.7,
        "poster": "/static/images/placeholder.svg",
        "description": "The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill."
    },
    {
        "id": 12,
        "title": "The Silence of the Lambs",
        "genre": ["Crime", "Drama", "Thriller"],
        "year": 1991,
        "rating": 8.6,
        "poster": "/static/images/placeholder.svg",
        "description": "A young FBI cadet must receive the help of an incarcerated and manipulative cannibal killer."
    },
    {
        "id": 13,
        "title": "The Green Mile",
        "genre": ["Crime", "Drama", "Fantasy"],
        "year": 1999,
        "rating": 8.6,
        "poster": "/static/images/placeholder.svg",
        "description": "The lives of guards on Death Row are affected by one of their charges: a black man accused of child murder."
    },
    {
        "id": 14,
        "title": "The Departed",
        "genre": ["Crime", "Drama", "Thriller"],
        "year": 2006,
        "rating": 8.5,
        "poster": "/static/images/placeholder.svg",
        "description": "An undercover cop and a mole in the police attempt to identify each other while infiltrating an Irish gang."
    },
    {
        "id": 15,
        "title": "The Lion King",
        "genre": ["Animation", "Adventure", "Drama"],
        "year": 1994,
        "rating": 8.5,
        "poster": "/static/images/placeholder.svg",
        "description": "Lion prince Simba and his father are targeted by his bitter uncle, who wants to ascend the throne himself."
    },
    {
        "id": 16,
        "title": "Gladiator",
        "genre": ["Action", "Adventure", "Drama"],
        "year": 2000,
        "rating": 8.5,
        "poster": "/static/images/placeholder.svg",
        "description": "A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family."
    },
    {
        "id": 17,
        "title": "American History X",
        "genre": ["Crime", "Drama"],
        "year": 1998,
        "rating": 8.5,
        "poster": "/static/images/placeholder.svg",
        "description": "A former neo-nazi skinhead tries to prevent his younger brother from going down the same wrong path."
    },
    {
        "id": 18,
        "title": "The Usual Suspects",
        "genre": ["Crime", "Drama", "Mystery"],
        "year": 1995,
        "rating": 8.5,
        "poster": "/static/images/placeholder.svg",
        "description": "A sole survivor tells of the twisty events leading up to a horrific gun battle on a boat."
    },
    {
        "id": 19,
        "title": "The Prestige",
        "genre": ["Drama", "Mystery", "Sci-Fi"],
        "year": 2006,
        "rating": 8.5,
        "poster": "/static/images/placeholder.svg",
        "description": "After a tragic accident, two stage magicians engage in a battle to create the ultimate illusion."
    },
    {
        "id": 20,
        "title": "Casablanca",
        "genre": ["Drama", "Romance", "War"],
        "year": 1942,
        "rating": 8.5,
        "poster": "/static/images/placeholder.svg",
        "description": "A cynical expatriate American cafe owner struggles to decide whether or not to help his former lover."
    },
    {
        "id": 21,
        "title": "The Shining",
        "genre": ["Drama", "Horror"],
        "year": 1980,
        "rating": 8.4,
        "poster": "/static/images/placeholder.svg",
        "description": "A family heads to an isolated hotel for the winter where a sinister presence influences the father."
    },
    {
        "id": 22,
        "title": "Back to the Future",
        "genre": ["Adventure", "Comedy", "Sci-Fi"],
        "year": 1985,
        "rating": 8.5,
        "poster": "/static/images/placeholder.svg",
        "description": "Marty McFly, a 17-year-old high school student, is accidentally sent thirty years into the past."
    },
    {
        "id": 23,
        "title": "The Terminator",
        "genre": ["Action", "Sci-Fi"],
        "year": 1984,
        "rating": 8.0,
        "poster": "/static/images/placeholder.svg",
        "description": "A human soldier is sent from 2029 to 1984 to stop an almost indestructible cyborg killing machine."
    },
    {
        "id": 24,
        "title": "Jurassic Park",
        "genre": ["Action", "Adventure", "Sci-Fi"],
        "year": 1993,
        "rating": 8.5,
        "poster": "/static/images/placeholder.svg",
        "description": "A pragmatic paleontologist touring an almost complete theme park on an island in Central America."
    },
    {
        "id": 25,
        "title": "Titanic",
        "genre": ["Drama", "Romance"],
        "year": 1997,
        "rating": 7.9,
        "poster": "/static/images/placeholder.svg",
        "description": "A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious Titanic."
    },
    {
        "id": 26,
        "title": "The Avengers",
        "genre": ["Action", "Adventure", "Sci-Fi"],
        "year": 2012,
        "rating": 8.0,
        "poster": "/static/images/placeholder.svg",
        "description": "Earth's mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki."
    },
    {
        "id": 27,
        "title": "The Grand Budapest Hotel",
        "genre": ["Adventure", "Comedy", "Crime"],
        "year": 2014,
        "rating": 8.1,
        "poster": "/static/images/placeholder.svg",
        "description": "A writer encounters the owner of an aging high-class hotel, who tells him of his early years serving as a lobby boy."
    },
    {
        "id": 28,
        "title": "La La Land",
        "genre": ["Comedy", "Drama", "Musical"],
        "year": 2016,
        "rating": 8.0,
        "poster": "/static/images/placeholder.svg",
        "description": "While navigating their careers in Los Angeles, a pianist and an actress fall in love while attempting to reconcile their aspirations."
    },
    {
        "id": 29,
        "title": "Parasite",
        "genre": ["Comedy", "Drama", "Thriller"],
        "year": 2019,
        "rating": 8.6,
        "poster": "/static/images/placeholder.svg",
        "description": "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family."
    },
    {
        "id": 30,
        "title": "Joker",
        "genre": ["Crime", "Drama", "Thriller"],
        "year": 2019,
        "rating": 8.4,
        "poster": "/static/images/placeholder.svg",
        "description": "In Gotham City, mentally troubled comedian Arthur Fleck is disregarded and mistreated by society."
    }
]

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/debug')
def debug():
    return render_template('debug.html')

@app.route('/firebase-migration')
def firebase_migration():
    return render_template('firebase-migration.html')

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

@app.route('/firebase-data-migration.js')
def firebase_migration_js():
    """Serve the Firebase data migration script"""
    with open('firebase-data-migration.js', 'r') as file:
        content = file.read()
    return Response(content, mimetype='application/javascript')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)