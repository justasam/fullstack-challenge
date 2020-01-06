import React from "react";
import { Link } from "react-router-dom";
import { CakeLinkProps } from "../interfaces";

const CakeLink = (props: CakeLinkProps) => {
  return (
    <Link
      to={`/cake/${props.cake.id}`}
      className='rounded_container'
    >
      <img
        src={props.cake.imageUrl}
        alt={props.cake.name}
        className='rounded_container_image'
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

export default CakeLink;
