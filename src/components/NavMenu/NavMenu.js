import { NavLink } from 'react-router-dom';
import { nanoid } from 'nanoid';

const menus = [{
  title: 'Home',
  uri: `/`,
  id: nanoid(),
}, {
  title: 'Page2',
  uri: '/Page2',
  id: nanoid(),
}, {
  title: 'Page3',
  uri: '/Page3',
  id: nanoid(),
}, {
  title: 'Config & Run',
  uri: '/config',
  id: nanoid(),
},
];

export default function NavMenu() {  
  return (
    <nav className="menu__box">
      {menus.map((menu) => (
        <NavLink exact to={menu.uri} 
            className="menu__item" 
            activeClassName="menu__item-active"
            key={menu.id}
          >{menu.title}</NavLink>)
      )}
    </nav>
  )
}
