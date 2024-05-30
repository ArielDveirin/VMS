// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { BorderOutlined, SlidersOutlined , StopOutlined } from '@ant-design/icons';

// type
import { NavItemType } from 'types/menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
// icons
const icons = {
  BorderOutlined,
  SlidersOutlined,
  StopOutlined
};

// ==============================|| MENU ITEMS - SUPPORT ||============================== //



const other: NavItemType = {
  id: 'other',
  title: <FormattedMessage id="Management Pages" />,
  type: 'group',
  children: [
    {
      id: 'Manage Sources',
      title: <FormattedMessage id="Manage Users" />,
      type: 'item',
      url: '/manage_users',
      icon: icons.SlidersOutlined,
    },
    {
      id: 'Manage Sources',
      title: <FormattedMessage id="Manage Sources" />,
      type: 'item',
      url: '/multiview',
      icon: DashboardIcon,
    }
  ]
};

export default other;
