// project import
import other from './other';
import sourcesPage from './sourcesPage';

// types
import { NavItemType } from 'types/menu';

// Mock function to check if the user is an admin
// Replace this with your actual logic for checking if a user is an admin
const isAdmin = async () => {
  try {
    const response = await fetch('http://localhost:3001/isAdmin', {
      method: 'GET',
      credentials: 'include',
    });

    if (response.ok) {
      return (true)
    }
    else {
      return false
    }
  } 
  catch(error)
  {
      return ('Error');
  }
};

// ==============================|| MENU ITEMS ||============================== //

const menuItems: { items: NavItemType[] } = {
  items: await isAdmin() ? [sourcesPage, other] : [sourcesPage]
};

export default menuItems;
