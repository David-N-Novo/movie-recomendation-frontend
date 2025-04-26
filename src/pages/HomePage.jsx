import { useState } from "react";
import { useEffect } from "react";

const trendingMovies = [
  {
    title: "Dune: Part Two",
    posterUrl: "https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg",
  },
  {
    title: "Godzilla x Kong: The New Empire",
    posterUrl: "https://www.artofvfx.com/wp-content/uploads/2024/02/GGTt95Ua4AAM5eT-scaled.webp",
  },
  {
    title: "A Minecaft Movie",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BYzFjMzNjOTktNDBlNy00YWZhLWExYTctZDcxNDA4OWVhOTJjXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg://image.tmdb.org/t/p/w500/3n2TjKw3HrwDqgVgcynvantOfS3.jpg",
  },
  {
    title: "Spider-Man: Across the Spider-Verse",
    posterUrl: "https://image.tmdb.org/t/p/w500/c24sv2weTHPsmDa7jEMN0m2P3RT.jpg",
  },
  {
    title: "Flight Risk",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BOGZlZjAyYTItMDdjYy00OGZlLWI3NDAtYzM5ZjAwNjg0NWUxXkEyXkFqcGc@._V1_.jpg",
  },
  {
    title: "Sinners",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BNjIwZWY4ZDEtMmIxZS00NDA4LTg4ZGMtMzUwZTYyNzgxMzk5XkEyXkFqcGc@._V1_.jpg", 
  },
  {
    title: "The Hunger Games: The Ballad of Songbirds and Snakes",
    posterUrl: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQ0bZDytyC6Z57K1spL2FizRUS9ViJnVRuOArkQoCA4Bg_Lu8WUxcosJ14u3Z7insX-1ZU9",
  },
  {
    title: "Locked",
    posterUrl: "data:image/jpeg;base64,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",
  },
  {
    title: "Novocaine",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BZWJmMTIxMjEtNGNiZC00NTEzLWE4YmYtZDlmZjRkZGQzNzcyXkEyXkFqcGc@._V1_.jpg",
  },
];


function HomePage({currentUser}) {

  const users = JSON.parse(localStorage.getItem("users"));

  const [likedMovies, setLikedMovies] = useState([]);
  const [username, setUsername] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [allMovies, setAllMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");


  useEffect(() => {
    const fetchAllMovies = async () => {
      try {
        const response = await fetch("https://movie-rec-backend.onrender.com/movies");
        const data = await response.json();
        console.log("Fetched Movies:", data);
        setAllMovies(data);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      }
    };
  
    fetchAllMovies();
  }, []);

  const fetchRecommendations = async () => {
    if (!currentUser) {
      alert("No user logged in!");
      return;
    }
  
    const userId = users[currentUser];
  
    if (!userId) {
      alert("Username not recognized. Please login again.");
      return;
    }
  
    setLoading(true);
    try {
      const response = await fetch("https://movie-rec-backend.onrender.com/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: parseInt(userId) }),
      });
      const data = await response.json();
      setRecommendations(data);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      alert("Something went wrong. Make sure the backend is running!");
    }
    setLoading(false);
  };

  const handleLike = (movie) => {
    if (likedMovies.includes(movie)) {
      setLikedMovies(prevLiked => prevLiked.filter(m => m !== movie));
    }else {
      setLikedMovies(prevLiked => [...prevLiked, movie]);
    }
  };
  

  const createNewProfile = () => {
    if (!newUsername) {
      alert("Please enter a new username!");
      return;
    }
    if (users[newUsername]) {
      alert("Username already exists!");
      return;
    }
  
    const newUserId = Object.keys(users).length + 1;
    setUsers(prevUsers => ({
      ...prevUsers,
      [newUsername]: newUserId
    }));
  
    alert(`Profile created for ${newUsername}!`);
    setNewUsername("");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🎬 Movie Recommendation App</h1>

      <h2 style={{ color: "#555", marginBottom: "20px" }}>
        Welcome, {currentUser}!
      </h2>

      <div style={styles.inputGroup}>
        <input
          type="text"
          placeholder="Search all movies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={styles.input}
        />
      </div>

      <div style={styles.listContainer}>
        {searchQuery && (
          <>
            <h2 style={styles.subtitle}>🔎 Search Results</h2>
            <ul style={styles.list}>
              {allMovies
                .filter(movie => movie.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((movie, idx) => (
                  <li key={idx} style={styles.listItem}>
                    {movie}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLike(movie);
                      }}
                      style={styles.likeButton}
                    >
                      {likedMovies.includes(movie) ? "❤️" : "🤍"}
                    </button>
                  </li>
                ))}
            </ul>
          </>
        )}
      </div>


      
      <div style={styles.inputGroup}>
        <button onClick={fetchRecommendations} style={styles.button}>
          {loading ? "Loading..." : "Get Recommendations"}
        </button>
      </div>


      <div style={styles.listContainer}>
        {recommendations.length > 0 && <h2 style={styles.subtitle}>Top Picks:</h2>}
        <ul style={styles.list}>
          {recommendations.map((movie, idx) => (
            <li key={idx} style={styles.listItem}>
              {idx + 1}. {movie}
              <button
                 onClick={(e) => {
                  e.stopPropagation();
                  handleLike(movie);
                }}
                style={styles.likeButton}
              >
                {likedMovies.includes(movie) ? "❤️" : "🤍"}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div style={styles.trendingSection}>
        <h2 style={styles.subtitle}>🔥 Trending Now</h2>
        
        <div style={styles.trendingContainer}>
          <span style={styles.arrow}>◀</span>

          <div style={styles.trendingGrid}>
            {trendingMovies.map((movie, idx) => (
              <div key={idx} style={styles.posterCard}>
                <img
                  src={movie.posterUrl}
                  alt={movie.title}
                  style={styles.posterImage}
                />
              </div>
            ))}
          </div>

          <span style={styles.arrow}>▶</span>
        </div>
      </div>

      <div style={styles.listContainer}>
        {likedMovies.length > 0 && <h2 style={styles.subtitle}>❤️ Your Liked Movies</h2>}
        <ul style={styles.list}>
          {likedMovies.map((movie, idx) => (
            <li key={idx} style={styles.listItem}>
              {idx + 1}. {movie}
            </li>
          ))}
        </ul>
      </div>


    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: "40px",
    backgroundColor: "#f4f6f8",
    minHeight: "100vh",
  },
  title: {
    fontSize: "2.5rem",
    color: "#333",
    marginBottom: "30px",
  },
  inputGroup: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
    gap: "10px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    width: "200px",
    border: "1px solid #ccc",
    borderRadius: "8px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  listContainer: {
    marginTop: "30px",
  },
  subtitle: {
    fontSize: "1.8rem",
    marginBottom: "20px",
    color: "#555",
  },
  list: {
    listStyleType: "none",
    padding: 0,
    margin: 0,
  },
  listItem: {
    fontSize: "18px",
    marginBottom: "12px",
    color: "#333",
    backgroundColor: "#fff",
    padding: "10px",
    margin: "5px auto",
    width: "60%",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  trendingSection: {
    marginTop: "40px",
  },
  trendingContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
  },
  arrow: {
    fontSize: "2rem",
    cursor: "pointer",
    userSelect: "none",
  },
  trendingGrid: {
    display: "flex",
    overflowX: "auto",
    gap: "10px",
    padding: "10px 0",
  },
  posterCard: {
    minWidth: "100px",
    height: "200px",
    overflow: "hidden",
    borderRadius: "8px",
    flexShrink: 0,
  },
  posterImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "8px",
  },
  likeButton: {
    marginLeft: "10px",
    background: "none",
    border: "none",
    fontSize: "18px",
    cursor: "pointer",
  },    
};

export default HomePage;
