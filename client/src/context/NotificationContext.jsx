import { useState, useCallback } from "react";
import NotificationContext from "./notificationContextValue";

export function NotificationProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const dismissToast = useCallback((id) => {
    setToasts((previous) => previous.filter((toast) => toast.id !== id));
  }, []);
  const pushToast = useCallback((toast) => {
    const id = Date.now() + Math.random();
    setToasts((previous) => [...previous, { id, type: "info", ...toast }]);
    setTimeout(() => dismissToast(id), 4000);
  }, [dismissToast]);
  return (
    <NotificationContext.Provider value={{ toasts, pushToast, dismissToast }}>
      {children}
    </NotificationContext.Provider>
  );
}
