import { use, useState } from "react";
import { useEffect } from "react";

function HomePage({currentUser}) {

  const [likedMovieIds, setLikedMovieIds] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [allMovies, setAllMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [numRecommendations, setNumRecommendations] = useState(10);
  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const response = await fetch("https://movie-rec-backend.onrender.com/api/trending");
        const data = await response.json();
        console.log("Trending from backend:", data);
        if (Array.isArray(data)) {
          setTrendingMovies(data);
      } else {
        console.error("Unexpected trending format:", data);
        setTrendingMovies([]);
      }
      } catch (err) {
      console.error("Failed to fetch trending movies:", err);
      setTrendingMovies([]);
      }
    };

    fetchTrendingMovies();
  }, []);

  
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

  const handleLike = (movie) => {
    setLikedMovieIds((prevIds) =>
      prevIds.includes(movie.movieId)
        ? prevIds.filter((id) => id !== movie.movieId)
        : [...prevIds, movie.movieId]
    );
  };

  const handleRemoveLike = (id) => {
    setLikedMovieIds((prevIds) => prevIds.filter((movieId) => movieId !== id));
  }

  const fetchRecommendations = async () => {
    if (likedMovieIds.length === 0) {
      alert("Like at least one movie first!");
      return;
    }
  
    setLoading(true);
    try {
      const response = await fetch("https://movie-rec-backend.onrender.com/api/recommend", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ liked_movie_ids: likedMovieIds,
          top_k: numRecommendations,
         }),
      });
      const data = await response.json();
      setRecommendations(data.recommendations || []);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      alert("Something went wrong. Make sure the backend is running!");
    }
    setLoading(false);
  };

  const searchResults = allMovies.filter(movie =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🎬 Movie Finder</h1>

      <h2 style={{ color: "#555", marginBottom: "20px" }}>
        Welcome, {currentUser || "Guest"}!
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
              {searchResults.map((movie) => {
                const liked = likedMovieIds.includes(movie.movieId);
                return (
                  <li key={movie.movieId} style={styles.listItem}>
                    {movie.title}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLike(movie);
                      }}
                      style={styles.likeButton}
                    >
                      {liked ? "❤️" : "🤍"}
                    </button>
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </div>

      <div style={styles.inputGroup}>
        <input
        type="number"
        min="1"
        max="20"
        value={numRecommendations}
        onChange={(e) => setNumRecommendations(Number(e.target.value))}
        style={styles.numInput}
        placeholder="Number of recommendations"
  />
        <button onClick={fetchRecommendations} style={styles.button}>
          {loading ? "Loading..." : "Get Recommendations"}
        </button>
      </div>


      <div style={styles.listContainer}>
        {recommendations.length > 0 && <h2 style={styles.subtitle}>Top Picks:</h2>}
        <ul style={styles.list}>
          {recommendations.map((movie, idx) => {
            const liked = likedMovieIds.includes(movie.movieId);
            return (
              <li key={movie.movieId} style={styles.listItem}>
                {idx + 1}. {movie.title}
                <div style={{ fontSize: "0.9rem", color: "#777" }}>{movie.genres}</div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLike(movie);
                  }}
                  style={styles.likeButton}
                >
                  {liked ? "❤️" : "🤍"}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div style={styles.trendingSection}>
        <h2 style={styles.subtitle}>🔥 Trending Now</h2>
        
        <div style={styles.trendingContainer}>
          <span style={styles.arrow}>◀</span>

          <div style={styles.trendingGrid}>
            {Array.isArray(trendingMovies) &&
              trendingMovies.map((movie) => (
                <div key={movie.id} style={styles.posterCard}>
                  {movie.poster_url && (
                    <img
                      src={movie.poster_url}
                      alt={movie.title}
                      style={styles.posterImage}
                        title={
                          movie.overview
                            ? `${movie.title}\n\n${movie.overview}`
                            : movie.title
                        }
                    />
                  )}
                </div>
              ))}
          </div>

          <span style={styles.arrow}>▶</span>
        </div>
      </div>

      <div style={styles.listContainer}>
        {likedMovieIds.length > 0 && (
          <h2 style={styles.subtitle}>❤️ Your Liked Movies</h2>
        )}
        <ul style={styles.list}>
          {likedMovieIds.map((id, idx) => {
            const movie = allMovies.find((m) => m.movieId === id);
            if (!movie) {
              return null;
          } 
          return (
              <li key={id} style={styles.listItem}>
                {idx + 1}. {movie.title}
                <button
                  onClick={() => handleRemoveLike(id)}
                  style={styles.removeButton}
                >
                  ✖ Remove
                </button>
              </li>
            );
          })}
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
  removeButton: {
  marginLeft: "10px",
  backgroundColor: "#cdabaeff",
  color: "white",
  border: "none",
  borderRadius: "6px",
  padding: "4px 8px",
  cursor: "pointer",
  fontSize: "0.9rem",
},    
};

export default HomePage;
