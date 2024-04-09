// material-ui
import { Badge } from '@mui/material';

// project imports
import AvatarStatus from './AvatarStatus';
import { UserProfile } from 'types/user-profile';
import Avatar from 'components/@extended/Avatar';
import { getImageUrl, ImagePath } from 'utils/getImageUrl';

// ==============================|| CHAT USER AVATAR WITH STATUS ICON ||============================== //

interface UserAvatarProps {
  user: UserProfile;
}

const UserAvatar = ({ user }: UserAvatarProps) => (
  <Badge
    overlap="circular"
    badgeContent={<AvatarStatus status={user.online_status!} />}
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'right'
    }}
    sx={{ '& .MuiBox-root': { width: 6, height: 6 }, padding: 0, minWidth: 12, '& svg': { background: '#fff', borderRadius: '50%' } }}
  >
    <Avatar alt={user.name} src={user.avatar && getImageUrl(`${user.avatar}`, ImagePath.USERS)} />
  </Badge>
);

export default UserAvatar;
