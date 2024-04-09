// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { BorderOutlined, SlidersOutlined , StopOutlined } from '@ant-design/icons';

// type
import { NavItemType } from 'types/menu';

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
      title: <FormattedMessage id="Manage Sources" />,
      type: 'item',
      url: 'https://codedthemes.gitbook.io/mantis/',
      icon: icons.SlidersOutlined,
      external: true,
      target: true,
    }
  ]
};

export default other;
