import React from 'react';

const Header = ({message}) => {
  return (
    <div className="header">
      <h2>{message}</h2>
    </div>
  );
};

Header.propTypes = {
  message: React.PropTypes.string
};

export default Header;
