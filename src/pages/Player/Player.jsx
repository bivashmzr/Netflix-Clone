import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "./Player.css";
import back_arrow_icon from "../../assets/back_arrow_icon.png";

const Player = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [videoData, setVideoData] = useState(null);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YWNhODY2OTBjM2NmNzkxNDM5YTQ2NmJjMWQzOTIzMCIsIm5iZiI6MTc2MTA0MjUxNS44MjcwMDAxLCJzdWIiOiI2OGY3NjA1MzNkOTJiODA0ZmU5N2ZlNDMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.094Il5smzX4wBr93VStegiZ4LvQjz2MMA6sgx65lDvY",
    },
  };

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const mediaType = location.state?.media_type || "movie";
        const url = `https://api.themoviedb.org/3/${mediaType}/${id}/videos?language=en-US`;

        const res = await fetch(url, options);
        const data = await res.json();

        if (data.results?.length > 0) {
          // Prefer official trailers
          const trailer = data.results.find(
            (vid) =>
              vid.type === "Trailer" ||
              vid.name.toLowerCase().includes("trailer")
          );
          setVideoData(trailer || data.results[0]);
        } else {
          setVideoData(null);
        }
      } catch (error) {
        console.error("Error fetching video details:", error);
      }
    };

    fetchVideoData();
  }, [id, location.state]);

  return (
    <div className="player">
      <img
        src={back_arrow_icon}
        alt="Back"
        className="back-icon"
        onClick={() => navigate(-1)}
      />

      {videoData ? (
        <iframe
          src={`https://www.youtube.com/embed/${videoData.key}?autoplay=1&mute=0&controls=1`}
          title={videoData.name}
          frameBorder="0"
          allow="autoplay; fullscreen"
          allowFullScreen
        ></iframe>
      ) : (
        <p className="no-video">No video available</p>
      )}
    </div>
  );
};

export default Player;
