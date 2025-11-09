import { useState } from "react";

const Home = () => {
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    setUser(null);
    alert("Logged out successfully!");
  };

  return (
    <div>
      <Navbar user={user} handleLogout={handleLogout} />
      <Banner />
    </div>
  );
};
export default Home;
