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
  title: <FormattedMessage id="שידורים" />,
  type: 'group',
  children: [
    {
      id: 'sources',
      type: 'item',
      url: 'sources',
      title: <FormattedMessage id="שידורים חיים" />,
      icon: icons.VideoCameraOutlined,
    },
    {
      id: 'MultiSource Sources',
      title: <FormattedMessage id="פיצול נגנים" />,
      type: 'item',
      url: '/Multi_Source',
      icon: icons.DashboardIcon,
    },
  ]
 
};

export default sourcesPage;
