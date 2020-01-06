import React, { useEffect, useState } from "react";
import { getAllCakes } from "../api";
import CakeLink from "../components/CakeLink";

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
        cakes.map((cake: Cake) => <CakeLink cake={cake} key={cake.id} />)
      )}
    </div>
  );
};

export default Home;
