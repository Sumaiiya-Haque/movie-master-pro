import React, { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    // page load e previous theme apply করা
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme); // save user preference
  };

  return (
    <button
      onClick={toggleTheme}
      className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-800 text-black dark:text-white"
    >
      {theme === "light" ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
};

export default ThemeToggle;
