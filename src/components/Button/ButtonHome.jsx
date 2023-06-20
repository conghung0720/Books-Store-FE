import React from "react";

const ButtonHome = (props) => {
  let styles = `${props.className} text-white font-bold`;
  return <button className={styles}>{props.children}</button>;
};

export default ButtonHome;
