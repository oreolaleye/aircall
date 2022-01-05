import React from "react";
import Dial from "../images/dial.svg";
import User from "../images/user.svg";
import Setting from "../images/settings.svg";
import Phone from "../images/phone.svg";
import Radio from "../images/radio.svg";

const Footer = () => {
  return (
    <div className="footer">
      <div>
        <img src={Phone} alt="" />
      </div>
      <div>
        <img src={User} alt="" />
      </div>
      <div className="dial_div">
        <img src={Dial} alt="" />
      </div>
      <div>
        <img src={Setting} alt="" />
      </div>
      <div>
        <img src={Radio} alt="" />
      </div>
    </div>
  );
};

export default Footer;
