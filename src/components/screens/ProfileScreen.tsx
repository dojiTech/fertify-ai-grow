import { User, MapPin, BarChart3, Edit, Plus, Trash2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const ProfileScreen = () => {
  const userStats = {
    totalFields: 5,
    totalAcres: 250,
    calculationsThisMonth: 12,
    avgYield: '185 bu/acre',
  };

  const fields = [
    {
      id: 1,
      name: 'North Field',
      size: '45 acres',
      soilType: 'Clay Loam',
      currentCrop: 'Corn',
      lastCalculation: '2 days ago',
      status: 'active',
    },
    {
      id: 2,
      name: 'South Field',
      size: '60 acres',
      soilType: 'Sandy Loam',
      currentCrop: 'Soybeans',
      lastCalculation: '1 week ago',
      status: 'active',
    },
    {
      id: 3,
      name: 'East Field',
      size: '35 acres',
      soilType: 'Loam',
      currentCrop: 'Wheat',
      lastCalculation: '2 weeks ago',
      status: 'inactive',
    },
  ];

  const recentCalculations = [
    {
      id: 1,
      field: 'North Field',
      crop: 'Corn',
      npk: '15-10-10',
      rate: '150 lbs/acre',
      cost: '$45.50/acre',
      date: '2024-01-15',
    },
    {
      id: 2,
      field: 'South Field',
      crop: 'Soybeans',
      npk: '12-32-16',
      rate: '120 lbs/acre',
      cost: '$38.25/acre',
      date: '2024-01-10',
    },
    {
      id: 3,
      field: 'East Field',
      crop: 'Wheat',
      npk: '20-8-8',
      rate: '175 lbs/acre',
      cost: '$52.75/acre',
      date: '2024-01-05',
    },
  ];

  return (
    <div className="p-4 space-y-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
              <User className="h-8 w-8 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold">John Farmer</h2>
              <p className="text-muted-foreground">Premium Member</p>
              <p className="text-sm text-muted-foreground">Green Valley Farm</p>
            </div>
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Farm Statistics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Farm Statistics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{userStats.totalFields}</div>
              <div className="text-sm text-muted-foreground">Total Fields</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{userStats.totalAcres}</div>
              <div className="text-sm text-muted-foreground">Total Acres</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{userStats.calculationsThisMonth}</div>
              <div className="text-sm text-muted-foreground">Calculations</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{userStats.avgYield}</div>
              <div className="text-sm text-muted-foreground">Avg Yield</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Field Management */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Field Management
            </CardTitle>
            <CardDescription>Manage your farm fields and properties</CardDescription>
          </div>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Field
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          {fields.map((field) => (
            <div key={field.id} className="p-4 rounded-lg border bg-card">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-medium">{field.name}</h4>
                  <p className="text-sm text-muted-foreground">{field.size} • {field.soilType}</p>
                </div>
                <div className="flex gap-2">
                  <Badge variant={field.status === 'active' ? 'default' : 'secondary'}>
                    {field.status}
                  </Badge>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-3 w-3" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span>Current: {field.currentCrop}</span>
                <span className="text-muted-foreground">Last calc: {field.lastCalculation}</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Calculation History */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Calculations</CardTitle>
          <CardDescription>Your latest fertilizer recommendations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {recentCalculations.map((calc) => (
            <div key={calc.id} className="p-4 rounded-lg border bg-card">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-medium">{calc.field}</h4>
                  <p className="text-sm text-muted-foreground">{calc.crop}</p>
                </div>
                <span className="text-sm text-muted-foreground">{calc.date}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div>
                  <span className="text-muted-foreground">NPK:</span>
                  <span className="ml-1 font-medium">{calc.npk}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Rate:</span>
                  <span className="ml-1 font-medium">{calc.rate}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Cost:</span>
                  <span className="ml-1 font-medium">{calc.cost}</span>
                </div>
              </div>
            </div>
          ))}
          <Button variant="outline" className="w-full">
            View All History
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileScreen;