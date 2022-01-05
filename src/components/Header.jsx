import React from "react";
import Logo from "../images/logo.svg";

const Header = (props) => {
  const { value, setValue } = props;

  return (
    <header>
      <div className="inner">
        <div className="logo">
          <img src={Logo} alt="" />
        </div>
        <div className="tabs">
          <p
            className={value === 1 ? "selected" : null}
            onClick={() => setValue(1)}
          >
            All Calls
          </p>
          <p
            className={value === 2 ? "selected" : null}
            onClick={() => setValue(2)}
          >
            Archived Calls
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
