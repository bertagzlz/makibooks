import React, { useState, useCallback } from 'react';
import { Input, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const Menus = ({ menus }) => {
    const [activeItem, setActiveItem] = useState(menus.length > 0 ? menus[0].name : '');
  
    const handleItemClick = (e, { name }) => {
      setActiveItem(name);
    };

  return (
    <Menu secondary >
      <Menu.Item >
        <img height='50%' width='100px' src={process.env.PUBLIC_URL + '/imgs/logoCompleto.png'} />
      </Menu.Item>
      {menus.map((menu) => (
        <Menu.Item
            key={menu.name}
            name={menu.name}
            active={activeItem === menu.name}
            onClick={(e) => handleItemClick(e, menu)}
            as={Link}
            to={menu.route}
            style={{
              backgroundColor: 'transparent',
              fontWeight: 'bold'
            }}
        />
      ))}
    </Menu>
  );
};

export default Menus;