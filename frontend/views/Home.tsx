import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllCakes } from "../api";

import { Cake } from "../interfaces";

interface CakeLinkProps {
  cake: Cake;
}

const CakeLink = (props: CakeLinkProps) => {
  return (
    <Link
      to={`/cake/${props.cake.id}`}
      style={{
        textDecoration: "none",
        color: "black",
        position: "relative",
        display: "flex",
        maxWidth: "500px",
        margin: "20px auto",
        flexDirection: "column",
        borderRadius: 5,
        border: "1px solid #ddd",
        boxShadow: '0px 4px 8px rgba(0,0,0,.15)'
      }}
    >
      <img
        src={props.cake.imageUrl}
        alt={props.cake.name}
        style={{
          objectFit: "cover",
          maxWidth: "100%",
          borderRadius: 5
        }}
      />
      <h4
        style={{
          position: "absolute",
          top: 10,
          left: 10,
          backgroundColor: "rgba(255,255,255,.5)",
          padding: 10
        }}
      >
        {props.cake.name}
      </h4>
    </Link>
  );
};

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
