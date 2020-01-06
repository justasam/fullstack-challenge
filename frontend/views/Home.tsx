import React, { useEffect, useState } from "react";
import { getAllCakes } from "../api";

import { Cake } from "../interfaces";

const Home = () => {
  const [cakes, setCakes] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCakes = async () => {
      const data = await getAllCakes();
      if (data.error) {
        setError(`Error: ${data.error.text} ${data.error.code}`);
      } else {
        setCakes(data.cakes);
      }
      setLoading(false);
    };

    getCakes();
  }, []);

  return (
    <div>
      {loading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h2>{error}</h2>
      ) : (
        cakes.map((cake: Cake) => (
          <div key={cake.id}>
            <img src={cake.imageUrl} alt={cake.name} />
            <h2>{cake.name}</h2>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;
