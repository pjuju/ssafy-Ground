import { Badge, IconButton } from "@mui/material";
import NotificationsIcon from '@mui/icons-material/Notifications';

function BadgeButton() {
  return (
    <IconButton aria-label="notification">
      <Badge badgeContent={101} color="notification" max={99}>
        <NotificationsIcon />
      </Badge>
    </IconButton>
  );
}

export default BadgeButton;