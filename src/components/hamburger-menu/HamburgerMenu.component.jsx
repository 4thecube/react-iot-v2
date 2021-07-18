import React, { useEffect } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { createStructuredSelector } from "reselect";

import { toggleMenuHidden } from "../../redux/hamburger-button/hamburger.action";
import { selectIsHidden } from "../../redux/hamburger-button/hamburger.selector";
import app from "../../firebase";
import CustomButton from "../custom-button/CustomButton";

import "./HamburgerMenu.styles.scss";

const HamburgerMenu = ({ isHidden, toggleMenu }) => {
  const handleSignOut = () => {
    app.auth().signOut();
  };
  return (
    <div className="hamburger">
      <button
        className={` ${isHidden ? "three-lines" : "x-button"} hamburger-button`}
        onClick={toggleMenu}
      >
        {isHidden ? "≡" : <>+</>}
      </button>
      {
        <div className={` ${isHidden ? "closed" : "opened"} hamburger-menu`}>
          <NavLink
            to="/dashboard"
            exact
            className="hamburger-link"
            activeClassName="selected"
            onClick={toggleMenu}
          >
            DASHBOARD
          </NavLink>
          <NavLink
            to="/all"
            className="hamburger-link"
            activeClassName="selected"
            onClick={toggleMenu}
          >
            VIEW ALL DATA
          </NavLink>
          <CustomButton
            customClassName="hamburger-link"
            logout
            onClickAction={handleSignOut}
          >
            SIGN OUT
          </CustomButton>
        </div>
      }
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  isHidden: selectIsHidden,
});

const mapDispatchToProps = (dispatch) => ({
  toggleMenu: () => dispatch(toggleMenuHidden()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HamburgerMenu);
