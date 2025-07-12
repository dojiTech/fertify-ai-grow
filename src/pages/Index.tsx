import Layout, { useLayout } from '@/components/Layout';
import HomeScreen from '@/components/screens/HomeScreen';
import ChatScreen from '@/components/screens/ChatScreen';
import ProfileScreen from '@/components/screens/ProfileScreen';
import SettingsScreen from '@/components/screens/SettingsScreen';

const AppContent = () => {
  const { activeTab } = useLayout();

  const renderScreen = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen />;
      case 'chat':
        return <ChatScreen />;
      case 'profile':
        return <ProfileScreen />;
      case 'settings':
        return <SettingsScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return renderScreen();
};

const Index = () => {
  return (
    <Layout>
      <AppContent />
    </Layout>
  );
};

export default Index;
