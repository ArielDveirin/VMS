// This is example of menu item without group for horizontal layout. There will be no children.

// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { VideoCameraOutlined } from '@ant-design/icons';

// type
import { NavItemType } from 'types/menu';

// icons
const icons = {
  VideoCameraOutlined
};

// ==============================|| MENU ITEMS - Sources PAGE ||============================== //

const sourcesPage: NavItemType = {
  id: 'Sources',
  title: <FormattedMessage id="Sources" />,
  type: 'group',
  url: '/sources',
  icon: icons.VideoCameraOutlined
};

export default sourcesPage;
