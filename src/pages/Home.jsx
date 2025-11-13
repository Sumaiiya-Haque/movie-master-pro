import { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Banner from "../components/Banner/Banner";
import TopRatedMovies from "../components/HomePage/TopRatedMovies";
import RecentlyAdded from "../components/HomePage/RecentlyAdded";
import GenreSection from "../components/HomePage/GenreSection";
import AboutPlatform from "../components/HomePage/AboutPlatform";
import Statistics from "../components/HomePage/Statistics";
import { toast } from "react-toastify";
import Loading from "./Loading/Loading";
// import ThemeToggle from "../components/ThemeToggle/ThemeToggle";

const Home = () => {
  const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (loading) {
    return <Loading />; 
  }

  const handleLogout = () => {
    setUser(null);
    toast.success("Logged out successfully!");
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




// import { toast } from "react-toastify";
// import Loading from "../components/Loading/Loading";
// import { useEffect, useState } from "react";

// const Home = () => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
    
//     setTimeout(() => setLoading(false), 1000);
//   }, []);

//   if (loading) {
//     return <Loading />; 
//   }

//   const handleLogout = () => {
//     setUser(null);
//     toast.success("Logged out successfully!");
//   };

//   return (
//     <div>
//       <Navbar user={user} handleLogout={handleLogout} />
//       <Banner />
//       <Statistics />
//       <TopRatedMovies />
//       <RecentlyAdded />
//       <GenreSection />
//       <AboutPlatform />
//     </div>
//   );
// };

// export default Home;




