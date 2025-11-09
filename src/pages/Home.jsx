import { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Banner from "../components/Banner/Banner";

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
    </div>
  );
};
export default Home;
