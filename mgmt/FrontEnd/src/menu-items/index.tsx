// project import
import other from './other';
import pages from './pages';
import sourcesPage from './sourcesPage';

// types
import { NavItemType } from 'types/menu';

// ==============================|| MENU ITEMS ||============================== //

const menuItems: { items: NavItemType[] } = {
  items: [sourcesPage, pages, other]
};

export default menuItems;
