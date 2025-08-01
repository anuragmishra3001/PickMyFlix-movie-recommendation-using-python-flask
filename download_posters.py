import requests
import os
import json
import time

# Create posters directory if it doesn't exist
posters_dir = os.path.join("static", "images", "posters")
os.makedirs(posters_dir, exist_ok=True)

# Movie data from our app
movies = [
    {
        "id": 1,
        "title": "The Shawshank Redemption",
        "year": 1994
    },
    {
        "id": 2,
        "title": "The Godfather",
        "year": 1972
    },
    {
        "id": 3,
        "title": "Pulp Fiction",
        "year": 1994
    },
    {
        "id": 4,
        "title": "The Dark Knight",
        "year": 2008
    },
    {
        "id": 5,
        "title": "Inception",
        "year": 2010
    },
    {
        "id": 6,
        "title": "Interstellar",
        "year": 2014
    },
    {
        "id": 7,
        "title": "The Matrix",
        "year": 1999
    },
    {
        "id": 8,
        "title": "Forrest Gump",
        "year": 1994
    }
]

# Use random images from Lorem Picsum
def download_placeholder_image(movie_id, title, year):
    # Use random images with movie poster dimensions (2:3 ratio)
    url = f"https://picsum.photos/500/750?random={movie_id}"
    
    try:
        response = requests.get(url)
        
        if response.status_code == 200:
            # Create a filename based on the movie title and year
            filename = f"{title.lower().replace(' ', '_')}_{year}.jpg"
            filepath = os.path.join(posters_dir, filename)
            
            with open(filepath, 'wb') as f:
                f.write(response.content)
            
            print(f"Downloaded placeholder for {title} ({year})")
            return filename
        else:
            print(f"Failed to download image for {title}: Status code {response.status_code}")
            return None
    except Exception as e:
        print(f"Error downloading image for {title}: {e}")
        return None

# Download placeholder images for all movies
poster_mapping = {}
for movie in movies:
    filename = download_placeholder_image(movie['id'], movie['title'], movie['year'])
    if filename:
        poster_mapping[movie['id']] = f"/static/images/posters/{filename}"
    # Add a small delay to avoid overwhelming the server
    time.sleep(1)

# Save the poster mapping to a JSON file
with open('poster_mapping.json', 'w') as f:
    json.dump(poster_mapping, f, indent=2)

print("\nPoster mapping saved to poster_mapping.json")
print("Update your app.py file to use these new poster images.")