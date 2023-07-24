import React, { useState } from 'react';
import { Menu } from 'semantic-ui-react';

const MenuLateral = ({ menus }) => {

  const [activeItem, setActiveItem] = useState(menus.length > 0 ? menus[0].name : '');
  
  const handleItemClick = (e, { name }) => {
    setActiveItem(name);
      const element = document.getElementById(name);
      if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
      }
  };

  return (
    <div style={{ zIndex: '1' }} >
      <Menu  secondary horizontal>
        {menus.map(menu => (
          <Menu.Item
            key={menu.name}
            name={menu.name}
            active={activeItem === menu.name}
            onClick={(e) => handleItemClick(e, menu)}
            href={menu.route}
          />
        ))}
      </Menu>
    </div>
  )
}

export default MenuLateral;
