import { Bell, BellOff } from "lucide-react";
import { useState, useEffect } from "react";
import {
  requestNotificationPermission,
  areNotificationsEnabled,
} from "../utils/notifications";

export const NotificationButton = () => {
  const [enabled, setEnabled] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setEnabled(areNotificationsEnabled());
  }, []);

  const handleToggle = async () => {
    setLoading(true);

    if (!enabled) {
      const granted = await requestNotificationPermission();
      setEnabled(granted);

      if (granted) {
        // Envoyer une notification de test
        new Notification("Notifications activées ✅", {
          body: "Vous recevrez des rappels pour vos tâches importantes !",
          icon: "/vite.svg",
        });
      }
    }

    setLoading(false);
  };

  return (
    <button
      onClick={handleToggle}
      disabled={loading || (enabled && Notification.permission === "granted")}
      className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 flex items-center gap-2 ${
        enabled
          ? "bg-[hsl(var(--hype-neonBlue))] text-white shadow-hype-glow"
          : "bg-[hsl(var(--muted)/0.3)] text-muted-foreground border border-[hsl(var(--border))] hover:border-[hsl(var(--hype-blue))] hover:text-foreground"
      }`}
      title={
        enabled
          ? "Notifications activées"
          : "Activer les notifications"
      }
    >
      {enabled ? (
        <>
          <Bell className="w-4 h-4" />
          <span className="hidden sm:inline">Notifications ON</span>
        </>
      ) : (
        <>
          <BellOff className="w-4 h-4" />
          <span className="hidden sm:inline">Activer les notifications</span>
        </>
      )}
    </button>
  );
};
