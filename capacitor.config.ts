import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.be4f4beb96864b538795c4ec8b31863a',
  appName: 'fertify-ai-grow',
  webDir: 'dist',
  server: {
    url: 'https://be4f4beb-9686-4b53-8795-c4ec8b31863a.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    Camera: {
      permissions: ["camera", "photos"]
    },
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"]
    }
  }
};

export default config;