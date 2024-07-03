import React from 'react';

const NavBar: React.FC = () => {
  return (
    <div className='menu'>
        <a href='/' className='active-link'>
        Home
        </a>
        <a href='create'>Create Recipe</a>
    </div>
  );
};

export default NavBar;