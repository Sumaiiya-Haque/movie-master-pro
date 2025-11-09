import { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Banner from "../components/Banner/Banner";
import TopRatedMovies from "../components/HomePage/TopRatedMovies";
import RecentlyAdded from "../components/HomePage/RecentlyAdded";
import GenreSection from "../components/HomePage/GenreSection";
import AboutPlatform from "../components/HomePage/AboutPlatform";
import Statistics from "../components/HomePage/Statistics";

const Home = () => {
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    setUser(null);
    alert("Logged out successfully!");
  };

  return (
    <div>
      <Navbar user={user} handleLogout={handleLogout} />
      {/* <Banner></Banner> */}
      <Banner></Banner>
    <Statistics></Statistics>
      <TopRatedMovies></TopRatedMovies>
      <RecentlyAdded></RecentlyAdded>
      <GenreSection></GenreSection>
      <AboutPlatform></AboutPlatform>
    </div>
  );
};
export default Home;
