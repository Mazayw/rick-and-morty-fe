const random = Math.random().toString(36).slice(3, 20);

const menuItems = [
  {
    name: 'Main',
    link: '/',
  },
  {
    name: 'About',
    link: '/about',
  },
  {
    name: 'Form',
    link: '/form',
  },
  {
    name: 'Random generated link',
    link: `/${random}`,
  },
];

export default menuItems;
