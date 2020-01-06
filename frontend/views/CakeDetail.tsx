import React, { useEffect, useState } from "react";
import { getCakeDetail } from "../api";
import CakeLink from "../components/CakeLink";
import { Link, withRouter } from "react-router-dom";

import { Cake } from "../interfaces";

const CakeDetail = props => {
  const [cake, setCake] = useState({
    name: "",
    comment: "",
    imageUrl: "",
    yumFactor: 0
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCake = async () => {
      const data = await getCakeDetail(props.match.params.id);
      if (data.error) {
        setError(`Error: ${data.error}`);
      } else {
        setCake(data);
      }
      setLoading(false);
    };

    getCake();
  }, []);

  return (
    <div>
      {loading ? (
        <h2 style={{ textAlign: "center" }}>Loading...</h2>
      ) : error ? (
        <h2 style={{ textAlign: "center" }}>{error}</h2>
      ) : (
        <>
          <div className="rounded_container cake_detail">
            <h3>{cake.name}</h3>
            <img
              src={cake.imageUrl}
              alt={cake.name}
              className="rounded_container_image"
            />
            <q>{cake.comment}</q>
            <p>Yum factor: {cake.yumFactor}</p>
          </div>
          <Link to="/New" className="button center" style={{ marginTop: 10 }}>
            Add a new cake
          </Link>
        </>
      )}
    </div>
  );
};

export default withRouter(CakeDetail);
