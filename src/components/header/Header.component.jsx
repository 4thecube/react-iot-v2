import React from 'react';

import app from '../../firebase';
import CustomButton from '../custom-button/CustomButton';
import './Header.styles.scss';

const Header = () => {
  const handleSignOut = () => {
    app.auth().signOut();
  };
  return (
    <div className=" header">
      <CustomButton logout onClickAction={handleSignOut}>
        SIGN OUT
      </CustomButton>
    </div>
  );
};

export default Header;
