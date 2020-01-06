import React, { useEffect, useState } from "react";
import { getCakeDetail, deleteCake, updateCake } from "../api";
import CakeLink from "../components/CakeLink";
import { Link, withRouter } from "react-router-dom";

import { Cake } from "../interfaces";
import YumFactor from "../components/YumFactor";

const CakeDetail = props => {
  const [cake, setCake] = useState({
    name: "",
    comment: "",
    imageUrl: "",
    yumFactor: 0
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [yumFactor, setYumFactor] = useState(0); // if 0 (invalid) dont show update

  const id = props.match.params.id;
  useEffect(() => {
    const getCake = async () => {
      const data = await getCakeDetail(id);
      if (data.error) {
        setError(`Error: ${data.error}`);
      } else {
        setCake(data);
      }
      setLoading(false);
    };

    getCake();
  }, []);

  const handleDelete = async () => {
    // should add confirmation here in prod
    await deleteCake(id);
    props.history.push("/Home");
  };

  const handleUpdateYum = async () => {
    await updateCake({ ...cake, id, yumFactor });
    props.history.push("/Home");
  };

  const decreaseYum = () => {
    if (yumFactor === 1) {
      return;
    }
    setYumFactor(yumFactor - 1);
  };

  const increaseYum = () => {
    if (yumFactor === 5) {
      return;
    }
    setYumFactor(yumFactor + 1);
  };

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
            <div
              style={{
                display: "flex",
                padding: 20,
                backgroundColor: "rgb(230,230,230)"
              }}
            >
              {yumFactor === 0 ? (
                <>
                  <button className="button" onClick={() => setYumFactor(1)}>
                    Update Yum factor
                  </button>
                  <button className="button" onClick={handleDelete}>
                    Delete
                  </button>
                </>
              ) : (
                <>
                  <YumFactor
                    yumFactor={yumFactor}
                    increaseYum={increaseYum}
                    decreaseYum={decreaseYum}
                  />
                  <button className="button" onClick={() => setYumFactor(0)}>
                    Cancel
                  </button>
                  <button className="button" onClick={handleUpdateYum}>
                    Update
                  </button>
                </>
              )}
            </div>
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
