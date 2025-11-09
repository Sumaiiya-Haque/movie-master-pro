import React, { useEffect, useState } from "react";

const Statistics = () => {
  const [stats, setStats] = useState({ movies: 0, users: 0 });

  useEffect(() => {
    // 🔹 এখানে আপনি API কল দিতে পারেন
    // উদাহরণ: fetch("/api/statistics")
    setTimeout(() => {
      setStats({ movies: 120, users: 45 });
    }, 500);
  }, []);

  return (
    <section className="text-center">
      <h2 className="text-3xl font-bold mb-8">📈 Platform Statistics</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg">
          <h3 className="text-xl font-semibold">Total Movies</h3>
          <p className="text-4xl font-bold text-yellow-400">{stats.movies}</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg">
          <h3 className="text-xl font-semibold">Total Users</h3>
          <p className="text-4xl font-bold text-green-400">{stats.users}</p>
        </div>
      </div>
    </section>
  );
};

export default Statistics;
