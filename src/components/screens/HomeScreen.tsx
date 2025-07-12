import { Calculator, MapPin, History, BarChart3, Cloud, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLayout } from '../Layout';
import heroImage from '@/assets/hero-farm.jpg';

const HomeScreen = () => {
  const { setActiveTab } = useLayout();

  const quickActions = [
    {
      title: 'Fertilizer Calculator',
      description: 'Calculate optimal NPK ratios',
      icon: Calculator,
      action: () => setActiveTab('chat'),
      color: 'bg-primary',
    },
    {
      title: 'Field Management',
      description: 'Manage your farm fields',
      icon: MapPin,
      action: () => setActiveTab('profile'),
      color: 'bg-success',
    },
    {
      title: 'Calculation History',
      description: 'View past calculations',
      icon: History,
      action: () => setActiveTab('profile'),
      color: 'bg-accent',
    },
    {
      title: 'Crop Analysis',
      description: 'Analyze crop performance',
      icon: BarChart3,
      action: () => setActiveTab('chat'),
      color: 'bg-warning',
    },
  ];

  const mockWeather = {
    temperature: '24°C',
    condition: 'Partly Cloudy',
    humidity: '65%',
    rainfall: '2mm',
  };

  const recentCalculations = [
    { crop: 'Corn', field: 'North Field', npk: '15-10-10', date: '2 days ago' },
    { crop: 'Wheat', field: 'South Field', npk: '20-8-8', date: '1 week ago' },
    { crop: 'Soybeans', field: 'East Field', npk: '12-32-16', date: '2 weeks ago' },
  ];

  return (
    <div className="p-4 space-y-6">
      {/* Hero Section */}
      <div className="relative rounded-lg overflow-hidden h-48">
        <img 
          src={heroImage} 
          alt="Agricultural landscape" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center text-white">
            <h2 className="text-2xl font-bold mb-2">Welcome to Fertify AI</h2>
            <p className="text-white/90">Optimize your fertilizer usage with AI</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <div className={`w-10 h-10 rounded-lg ${action.color} flex items-center justify-center`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">{action.title}</h4>
                      <p className="text-xs text-muted-foreground">{action.description}</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={action.action}
                    >
                      Open
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Weather Widget */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Cloud className="h-4 w-4" />
            Weather Conditions
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="font-medium">{mockWeather.temperature}</div>
              <div className="text-muted-foreground">Temperature</div>
            </div>
            <div>
              <div className="font-medium">{mockWeather.condition}</div>
              <div className="text-muted-foreground">Condition</div>
            </div>
            <div>
              <div className="font-medium">{mockWeather.humidity}</div>
              <div className="text-muted-foreground">Humidity</div>
            </div>
            <div>
              <div className="font-medium">{mockWeather.rainfall}</div>
              <div className="text-muted-foreground">Recent Rainfall</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Calculations */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Recent Calculations
          </CardTitle>
          <CardDescription>Your latest fertilizer recommendations</CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            {recentCalculations.map((calc, index) => (
              <div key={index} className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                <div>
                  <div className="font-medium text-sm">{calc.crop} - {calc.field}</div>
                  <div className="text-xs text-muted-foreground">NPK: {calc.npk}</div>
                </div>
                <div className="text-xs text-muted-foreground">{calc.date}</div>
              </div>
            ))}
          </div>
          <Button 
            variant="outline" 
            className="w-full mt-4"
            onClick={() => setActiveTab('profile')}
          >
            View All History
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default HomeScreen;