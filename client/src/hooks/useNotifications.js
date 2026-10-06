import { useContext } from "react";
import NotificationContext from "../context/notificationContextValue";

export default function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) throw new Error("useNotifications must be used within NotificationProvider");
  return context;
}
