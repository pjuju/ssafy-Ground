import { Badge } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";

function BadgeButton() {
  return (
    <Badge badgeContent={5} color="notification" max={99}>
      <NotificationsIcon />
    </Badge>
  );
}

export default BadgeButton;
