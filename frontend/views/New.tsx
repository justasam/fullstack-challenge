import React, { useState } from "react";
import { addNewCake } from "../api";
import { withRouter } from "react-router-dom";
import YumFactor from "../components/YumFactor";

// name a comment and a yum factor between 1 and 5.
const New = props => {
  const [newCake, setNewCake] = useState({
    name: "",
    imageUrl: "",
    comment: "",
    yumFactor: 1
  });

  const [validate, setValidate] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValidate(false);
    setNewCake({
      ...newCake,
      [event.target.name]: event.target.value
    });
  };

  const decreaseYum = () => {
    if (newCake.yumFactor === 1) {
      return;
    }
    setNewCake({ ...newCake, yumFactor: newCake.yumFactor - 1 });
  };

  const increaseYum = () => {
    if (newCake.yumFactor === 5) {
      return;
    }
    setNewCake({ ...newCake, yumFactor: newCake.yumFactor + 1 });
  };

  const validateAndSubmit = async () => {
    if (
      newCake.name === "" ||
      newCake.comment === "" ||
      newCake.imageUrl === ""
    ) {
      setValidate(true);
      return;
    }

    const res = await addNewCake(newCake);
    if (res.error) {
      // should be removed in prod
      console.error("Error adding a cake:", res);
    }
    props.history.push("/Home");
  };

  return (
    <div className="rounded_container">
      <h2
        style={{
          textAlign: "center",
          padding: 5
        }}
      >
        Add a new cake!
      </h2>

      <input
        type="text"
        value={newCake.name}
        placeholder="Name your cake..."
        name="name"
        onChange={handleInputChange}
        className="text_input"
      />
      {validate && !newCake.name ? (
        <p className="validate_text">You must enter a name</p>
      ) : null}
      <input
        type="text"
        value={newCake.comment}
        placeholder="Add a comment..."
        name="comment"
        onChange={handleInputChange}
        className="text_input"
      />
      {validate && !newCake.comment ? (
        <p className="validate_text">You must enter a comment</p>
      ) : null}
      <input
        type="text"
        value={newCake.imageUrl}
        placeholder="Image url..."
        name="imageUrl"
        onChange={handleInputChange}
        className="text_input"
      />
      {validate && !newCake.imageUrl ? (
        <p className="validate_text">You must enter an image url</p>
      ) : null}
      <h3
        style={{
          textAlign: "center",
          paddingTop: 10
        }}
      >
        Yum factor!
      </h3>

      <YumFactor
        yumFactor={newCake.yumFactor}
        increaseYum={increaseYum}
        decreaseYum={decreaseYum}
      />

      <button className="button_add" onClick={validateAndSubmit}>
        Add that cake!
      </button>
    </div>
  );
};

export default withRouter(New);
