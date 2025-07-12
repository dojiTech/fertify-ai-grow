import { Bell, Globe, Palette, Shield, HelpCircle, FileText, LogOut, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';

const SettingsScreen = () => {
  const settingsGroups = [
    {
      title: 'Notifications',
      icon: Bell,
      items: [
        {
          label: 'Push Notifications',
          description: 'Receive alerts for calculations and updates',
          type: 'switch',
          value: true,
        },
        {
          label: 'Weather Alerts',
          description: 'Get notified about weather changes',
          type: 'switch',
          value: true,
        },
        {
          label: 'Calculation Reminders',
          description: 'Reminders for fertilizer applications',
          type: 'switch',
          value: false,
        },
      ],
    },
    {
      title: 'Preferences',
      icon: Palette,
      items: [
        {
          label: 'Units',
          description: 'Imperial (acres, pounds)',
          type: 'navigation',
          value: 'Imperial',
        },
        {
          label: 'Language',
          description: 'English',
          type: 'navigation',
          value: 'English',
        },
        {
          label: 'Currency',
          description: 'USD ($)',
          type: 'navigation',
          value: 'USD',
        },
      ],
    },
    {
      title: 'Regional',
      icon: Globe,
      items: [
        {
          label: 'Location',
          description: 'Iowa, United States',
          type: 'navigation',
          value: 'Iowa, US',
        },
        {
          label: 'Growing Zone',
          description: 'Zone 5a',
          type: 'navigation',
          value: 'Zone 5a',
        },
        {
          label: 'Soil Database',
          description: 'USDA NRCS Web Soil Survey',
          type: 'navigation',
          value: 'USDA',
        },
      ],
    },
  ];

  const accountItems = [
    {
      label: 'Account & Privacy',
      description: 'Manage your account settings',
      icon: Shield,
      action: () => console.log('Account settings'),
    },
    {
      label: 'Help & Support',
      description: 'Get help and contact support',
      icon: HelpCircle,
      action: () => console.log('Help'),
    },
    {
      label: 'Terms & Privacy',
      description: 'Legal information and policies',
      icon: FileText,
      action: () => console.log('Legal'),
    },
  ];

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Customize your Fertify AI experience</p>
      </div>

      {/* Subscription Status */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-medium">Premium Plan</h3>
                <Badge variant="default">Active</Badge>
              </div>
              <p className="text-sm text-muted-foreground">Unlimited calculations and advanced features</p>
            </div>
            <Button variant="outline" size="sm">
              Manage
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Settings Groups */}
      {settingsGroups.map((group, groupIndex) => {
        const GroupIcon = group.icon;
        return (
          <Card key={groupIndex}>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <GroupIcon className="h-4 w-4" />
                {group.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pt-0">
              {group.items.map((item, itemIndex) => (
                <div key={itemIndex} className="flex items-center justify-between py-2">
                  <div className="flex-1">
                    <div className="font-medium text-sm">{item.label}</div>
                    <div className="text-xs text-muted-foreground">{item.description}</div>
                  </div>
                  <div className="flex items-center">
                    {item.type === 'switch' ? (
                      <Switch checked={item.value as boolean} />
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">{item.value}</span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        );
      })}

      {/* Account & Support */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Account & Support</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 pt-0">
          {accountItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={index}
                onClick={item.action}
                className="w-full flex items-center justify-between py-3 hover:bg-muted/50 rounded-lg px-2 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  <div className="text-left">
                    <div className="font-medium text-sm">{item.label}</div>
                    <div className="text-xs text-muted-foreground">{item.description}</div>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </button>
            );
          })}
        </CardContent>
      </Card>

      {/* App Info */}
      <Card>
        <CardContent className="p-4">
          <div className="text-center space-y-2">
            <h3 className="font-medium">Fertify AI</h3>
            <p className="text-sm text-muted-foreground">Version 1.0.0</p>
            <p className="text-xs text-muted-foreground">© 2024 Fertify AI. All rights reserved.</p>
          </div>
        </CardContent>
      </Card>

      {/* Sign Out */}
      <Button variant="outline" className="w-full" size="lg">
        <LogOut className="h-4 w-4 mr-2" />
        Sign Out
      </Button>
    </div>
  );
};

export default SettingsScreen;