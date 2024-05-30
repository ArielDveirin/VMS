// This is example of menu item without group for horizontal layout. There will be no children.

// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { VideoCameraOutlined } from '@ant-design/icons';

// type
import { NavItemType } from 'types/menu';

import DashboardIcon from '@mui/icons-material/Dashboard';
// icons
const icons = {
  VideoCameraOutlined, 
  DashboardIcon
};

// ==============================|| MENU ITEMS - Sources PAGE ||============================== //

const sourcesPage: NavItemType = {
  title: <FormattedMessage id="Sources" />,
  type: 'group',
  children: [
    {
      id: 'Sources',
      type: 'item',
      url: 'sources',
      title: <FormattedMessage id="Sources" />,
      icon: icons.VideoCameraOutlined,
    },
    {
      id: 'MultiSource Sources',
      title: <FormattedMessage id="MultiView  Sources" />,
      type: 'item',
      url: '/Multi_Source',
      icon: icons.DashboardIcon,
    },
  ]
 
};

export default sourcesPage;
