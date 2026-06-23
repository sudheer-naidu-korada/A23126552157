import { Alert, Button } from "@mui/material";
import { markAsRead } from "../apis/notifications";

export function NotificationCard({ notification }) {
  const handleMarkAsRead = async () => {
    await markAsRead(notification._id);
  };

  return (
    <Alert
      severity={notification.read ? "success" : "info"}
      action={
        !notification.read && (
          <Button color="inherit" size="small" onClick={handleMarkAsRead}>
            Mark as Read
          </Button>
        )
      }
    >
      <strong>{notification.title}</strong> — {notification.message}
    </Alert>
  );
}