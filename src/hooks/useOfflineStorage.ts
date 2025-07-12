import { Storage } from '@capacitor/storage';
import { Network } from '@capacitor/network';
import { useState, useEffect } from 'react';

export const useOfflineStorage = () => {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const getNetworkStatus = async () => {
      const status = await Network.getStatus();
      setIsOnline(status.connected);
    };

    getNetworkStatus();

    const networkListener = Network.addListener('networkStatusChange', (status) => {
      setIsOnline(status.connected);
    });

    return () => {
      networkListener.then(listener => listener.remove());
    };
  }, []);

  const setItem = async (key: string, value: any): Promise<void> => {
    try {
      await Storage.set({
        key,
        value: JSON.stringify(value),
      });
    } catch (error) {
      console.error('Error storing data:', error);
    }
  };

  const getItem = async <T>(key: string): Promise<T | null> => {
    try {
      const { value } = await Storage.get({ key });
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error('Error retrieving data:', error);
      return null;
    }
  };

  const removeItem = async (key: string): Promise<void> => {
    try {
      await Storage.remove({ key });
    } catch (error) {
      console.error('Error removing data:', error);
    }
  };

  const clear = async (): Promise<void> => {
    try {
      await Storage.clear();
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  };

  const keys = async (): Promise<string[]> => {
    try {
      const { keys } = await Storage.keys();
      return keys;
    } catch (error) {
      console.error('Error getting keys:', error);
      return [];
    }
  };

  return {
    isOnline,
    setItem,
    getItem,
    removeItem,
    clear,
    keys,
  };
};