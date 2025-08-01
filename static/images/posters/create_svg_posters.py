import os
import random

# Create posters directory if it doesn't exist
posters_dir = os.path.join("static", "images", "posters")
os.makedirs(posters_dir, exist_ok=True)

# Movie data
movies = [
    {
        "id": 1,
        "title": "The Shawshank Redemption",
        "year": 1994,
        "color": "#336699",
        "accent": "#FF4D8F"
    },
    {
        "id": 2,
        "title": "The Godfather",
        "year": 1972,
        "color": "#8B0000",
        "accent": "#FFD700"
    },
    {
        "id": 3,
        "title": "Pulp Fiction",
        "year": 1994,
        "color": "#FF9900",
        "accent": "#000000"
    },
    {
        "id": 4,
        "title": "The Dark Knight",
        "year": 2008,
        "color": "#1A1A1A",
        "accent": "#4B0082"
    },
    {
        "id": 5,
        "title": "Inception",
        "year": 2010,
        "color": "#0066CC",
        "accent": "#FF2D55"
    },
    {
        "id": 6,
        "title": "Interstellar",
        "year": 2014,
        "color": "#000033",
        "accent": "#FFD166"
    },
    {
        "id": 7,
        "title": "The Matrix",
        "year": 1999,
        "color": "#003300",
        "accent": "#00FF00"
    },
    {
        "id": 8,
        "title": "Forrest Gump",
        "year": 1994,
        "color": "#006633",
        "accent": "#FF9E00"
    }
]

# Create SVG poster template
def create_svg_poster(movie):
    title = movie["title"]
    year = movie["year"]
    color = movie["color"]
    accent = movie["accent"]
    
    # Generate random pattern elements
    patterns = []
    for i in range(10):
        x = random.randint(0, 300)
        y = random.randint(0, 450)
        size = random.randint(20, 100)
        opacity = random.uniform(0.1, 0.3)
        patterns.append(f'<circle cx="{x}" cy="{y}" r="{size}" fill="{accent}" opacity="{opacity}"/>')
    
    pattern_svg = '\n    '.join(patterns)
    
    # Split title into words for better layout
    words = title.split()
    if len(words) > 2:
        title_line1 = ' '.join(words[:len(words)//2])
        title_line2 = ' '.join(words[len(words)//2:])
        title_svg = f'<text x="150" y="200" font-family="Arial" font-size="28" font-weight="bold" fill="white" text-anchor="middle">{title_line1}</text>\n    <text x="150" y="240" font-family="Arial" font-size="28" font-weight="bold" fill="white" text-anchor="middle">{title_line2}</text>'
    else:
        title_svg = f'<text x="150" y="220" font-family="Arial" font-size="32" font-weight="bold" fill="white" text-anchor="middle">{title}</text>'
    
    svg = f'''<svg width="300" height="450" xmlns="http://www.w3.org/2000/svg">
    <!-- Background -->
    <rect width="300" height="450" fill="{color}"/>
    
    <!-- Pattern elements -->
    {pattern_svg}
    
    <!-- Gradient overlay -->
    <rect width="300" height="450" fill="url(#grad)" opacity="0.7"/>
    
    <!-- Definitions -->
    <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:{accent};stop-opacity:0.3" />
            <stop offset="100%" style="stop-color:{color};stop-opacity:0.9" />
        </linearGradient>
    </defs>
    
    <!-- Movie title -->
    {title_svg}
    
    <!-- Year -->
    <text x="150" y="280" font-family="Arial" font-size="20" fill="{accent}" text-anchor="middle">{year}</text>
    
    <!-- Decorative elements -->
    <rect x="50" y="320" width="200" height="2" fill="{accent}" opacity="0.8"/>
    <rect x="75" y="330" width="150" height="1" fill="{accent}" opacity="0.6"/>
    
    <!-- Rating stars placeholder -->
    <g transform="translate(125, 360)">
        <path d="M10,0 L13,6 L20,7 L15,12 L16,20 L10,16 L4,20 L5,12 L0,7 L7,6 Z" fill="{accent}"/>
    </g>
    <g transform="translate(150, 360)">
        <path d="M10,0 L13,6 L20,7 L15,12 L16,20 L10,16 L4,20 L5,12 L0,7 L7,6 Z" fill="{accent}"/>
    </g>
    <g transform="translate(175, 360)">
        <path d="M10,0 L13,6 L20,7 L15,12 L16,20 L10,16 L4,20 L5,12 L0,7 L7,6 Z" fill="{accent}"/>
    </g>
</svg>'''
    
    return svg

# Create SVG posters for all movies
for movie in movies:
    svg_content = create_svg_poster(movie)
    filename = f"{movie['title'].lower().replace(' ', '_')}_{movie['year']}.svg"
    filepath = os.path.join(posters_dir, filename)
    
    with open(filepath, 'w') as f:
        f.write(svg_content)
    
    print(f"Created SVG poster for {movie['title']} ({movie['year']})")

print("\nAll SVG posters created successfully!")
print("Now update your app.py file to use these new poster images.")