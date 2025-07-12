import { PushNotifications } from '@capacitor/push-notifications';
import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export const usePushNotifications = () => {
  const [permissionGranted, setPermissionGranted] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const initializePushNotifications = async () => {
      // Request permission
      const permStatus = await PushNotifications.requestPermissions();
      if (permStatus.receive === 'granted') {
        setPermissionGranted(true);
        PushNotifications.register();
      }

      // Register for push notifications
      PushNotifications.addListener('registration', (token) => {
        console.log('Push registration success, token: ' + token.value);
      });

      // Handle registration errors
      PushNotifications.addListener('registrationError', (error) => {
        console.error('Error on registration: ' + JSON.stringify(error));
      });

      // Handle push notification received
      PushNotifications.addListener('pushNotificationReceived', (notification) => {
        toast({
          title: notification.title || "Notification",
          description: notification.body || "You have a new message",
        });
      });

      // Handle push notification tapped
      PushNotifications.addListener('pushNotificationActionPerformed', (notification) => {
        console.log('Push notification action performed: ' + JSON.stringify(notification));
      });
    };

    initializePushNotifications();
  }, [toast]);

  const scheduleLocalNotification = async (title: string, body: string) => {
    try {
      // For Capacitor, we'll use a simple toast notification
      toast({
        title,
        description: body,
      });
    } catch (error) {
      console.error('Error showing notification:', error);
    }
  };

  return {
    permissionGranted,
    scheduleLocalNotification,
  };
};