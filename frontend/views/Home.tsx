import React, { useEffect, useState } from "react";
import { getAllCakes } from "../api";
import CakeLink from "../components/CakeLink";
import { Link } from "react-router-dom";

import { Cake } from "../interfaces";

const Home = () => {
  const [cakes, setCakes] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCakes = async () => {
      const data = await getAllCakes();
      if (data.error) {
        setError(`Error: ${data.error}`);
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
        <h2 style={{ textAlign: "center" }}>Loading...</h2>
      ) : error ? (
        <h2 style={{ textAlign: "center" }}>{error}</h2>
      ) : (
        cakes.map((cake: Cake) => <CakeLink cake={cake} key={cake.id} />)
      )}
      <Link to="/New" className="button center" style={{ marginTop: 10 }}>
        Add a new cake
      </Link>
    </div>
  );
};

export default Home;
