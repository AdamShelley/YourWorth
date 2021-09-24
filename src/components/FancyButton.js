import React from "react";

const FancyButton = (click, title, icon) => {
  return <button onClick={click}>{icon && <i className={icon}></i>}</button>;
};

export default FancyButton;
