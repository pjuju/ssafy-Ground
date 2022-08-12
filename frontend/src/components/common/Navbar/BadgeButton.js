import { Badge } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";

function BadgeButton({ notiCnt }) {
  return (
    <Badge badgeContent={notiCnt} color="notification" max={99}>
      <NotificationsIcon />
    </Badge>
  );
}

export default BadgeButton;
