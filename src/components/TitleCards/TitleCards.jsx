import React, { useEffect, useRef, useState } from "react";
import "./TitleCards.css";
import { useNavigate } from "react-router-dom";

const TitleCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();
  const navigate = useNavigate();

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YWNhODY2OTBjM2NmNzkxNDM5YTQ2NmJjMWQzOTIzMCIsIm5iZiI6MTc2MTA0MjUxNS44MjcwMDAxLCJzdWIiOiI2OGY3NjA1MzNkOTJiODA0ZmU5N2ZlNDMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.094Il5smzX4wBr93VStegiZ4LvQjz2MMA6sgx65lDvY",
    },
  };

  // 🖱️ Smooth horizontal scroll
  const handleWheel = (event) => {
    if (cardsRef.current) {
      event.preventDefault();
      cardsRef.current.scrollLeft += event.deltaY;
    }
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        let url = "";

        // ✅ Handle valid TMDB endpoints based on category
        switch (category) {
          case "top_rated":
            url = "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1";
            break;
          case "popular":
            url = "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
            break;
          case "upcoming":
            url = "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1";
            break;
          case "now_playing":
            url = "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1";
            break;
          case "trending":
            url = "https://api.themoviedb.org/3/trending/movie/week?language=en-US";
            break;
          default:
            url = "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
        }

        const res = await fetch(url, options);
        const data = await res.json();

        if (data.results && Array.isArray(data.results)) {
          console.log(`🎬 ${title || "Movies"} fetched:`, data.results.length);
          setApiData(data.results);
        } else {
          console.error("❌ No results found:", data);
          setApiData([]);
        }
      } catch (err) {
        console.error("❌ Fetch failed:", err);
        setApiData([]);
      }
    };

    fetchMovies();

    const currentRef = cardsRef.current;
    if (currentRef) currentRef.addEventListener("wheel", handleWheel);
    return () => {
      if (currentRef) currentRef.removeEventListener("wheel", handleWheel);
    };
  }, [category]);

  // ▶️ Navigate to Player
  const handleCardClick = (movie) => {
    navigate(`/player/${movie.id}`, { state: { media_type: "movie" } });
  };

  return (
    <div className="title-cards">
      <h2>{title || "Popular on Netflix"}</h2>

      <div className="card-list" ref={cardsRef}>
        {apiData.length > 0 ? (
          apiData.map((card, index) => (
            <div
              className="card"
              key={index}
              onClick={() => handleCardClick(card)}
            >
              <img
                src={
                  card.backdrop_path
                    ? `https://image.tmdb.org/t/p/w500${card.backdrop_path}`
                    : "https://via.placeholder.com/500x750?text=No+Image"
                }
                alt={card.title || card.name}
              />
              <p>{card.title || card.name}</p>
            </div>
          ))
        ) : (
          <p className="no-data">No movies available</p>
        )}
      </div>
    </div>
  );
};

export default TitleCards;
