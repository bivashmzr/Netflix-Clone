import React from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import hero_banner from "../../assets/hero_banner.jpg";
import hero_title from "../../assets/hero_title.png";
import play_icon from "../../assets/play_icon.png";
import play_info from "../../assets/info_icon.png";
import TitleCards from "../../components/TitleCards/TitleCards";
import Footer from "../../components/Footer/Footer";

const Home = () => {
  const navigate = useNavigate();

  // 🎬 Example Movie ID — change this to any valid movie ID
  const heroMovieId = 550; // "Fight Club"

  const handlePlayClick = () => {
    navigate(`/player/${heroMovieId}`, { state: { media_type: "movie" } });
  };

  const handleMoreInfo = () => {
    alert("More info feature coming soon!");
  };

  return (
    <div className="home">
      <Navbar />

      {/* 🎥 Hero Section */}
      <div className="hero">
        <img src={hero_banner} alt="Hero Banner" className="banner-img" />

        <div className="hero-caption">
          <img src={hero_title} alt="Hero Title" className="caption-img" />
          <p>
            Discovering his ties to a secret ancient order, a young man living
            in modern Istanbul embarks on a quest to save the city from an
            immortal enemy.
          </p>

          <div className="hero-btns">
            <button className="btn" onClick={handlePlayClick}>
              <img src={play_icon} alt="Play Icon" /> Play
            </button>
            <button className="btn dark-btn" onClick={handleMoreInfo}>
              <img src={play_info} alt="Info Icon" /> More Info
            </button>
          </div>
        </div>
      </div>

      {/* 🎬 Movie Sections */}
      <div className="more-cards">
        <TitleCards title="Popular on Netflix" category="popular" />
        <TitleCards title="Blockbuster Movies" category="top_rated" />
        <TitleCards title="Only on Netflix" category="now_playing" />
        <TitleCards title="Upcoming" category="upcoming" />
        <TitleCards title="Top Picks for You" category="trending" />
      </div>

      <Footer />
    </div>
  );
};

export default Home;
