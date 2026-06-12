
"use client"

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Droplet, AlertTriangle, TrendingUp, Users, History, Activity } from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell 
} from 'recharts';
import { MOCK_INVENTORY } from '@/app/lib/mock-data';
import { predictBloodShortage, type AdminBloodShortagePredictionOutput } from '@/ai/flows/admin-blood-shortage-prediction-flow';

const data = MOCK_INVENTORY.map(item => ({
  name: item.type,
  units: item.units,
  status: item.units < 10 ? 'critical' : item.units < 25 ? 'low' : 'stable'
}));

export default function AdminDashboard() {
  const [prediction, setPrediction] = useState<AdminBloodShortagePredictionOutput | null>(null);
  const [loading, setLoading] = useState(false);

  const runPrediction = async () => {
    setLoading(true);
    try {
      const result = await predictBloodShortage({
        bloodType: 'O-',
        currentStock: 8,
        forecastPeriodDays: 7,
        recentDonations: [
          { date: '2024-05-10', units: 2 },
          { date: '2024-05-15', units: 1 }
        ],
        recentRequests: [
          { date: '2024-05-18', unitsRequested: 5, urgency: 'emergency', fulfilled: true },
          { date: '2024-05-20', unitsRequested: 4, urgency: 'standard', fulfilled: false }
        ]
      });
      setPrediction(result);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="font-headline text-3xl">Analytics Command Center</h1>
          <p className="text-muted-foreground">Monitor global inventory and predict shortages.</p>
        </div>
        <Button onClick={runPrediction} disabled={loading} className="rounded-full shadow-lg">
          <Activity className="mr-2 h-4 w-4" />
          {loading ? 'Running AI Engine...' : 'Predict Shortages'}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <Users className="w-6 h-6" />
              </div>
              <Badge variant="secondary">+12%</Badge>
            </div>
            <div className="text-3xl font-headline">12,482</div>
            <div className="text-sm text-muted-foreground">Registered Donors</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                <History className="w-6 h-6" />
              </div>
              <Badge variant="secondary">+5%</Badge>
            </div>
            <div className="text-3xl font-headline">4,201</div>
            <div className="text-sm text-muted-foreground">Hospital Requests</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center text-yellow-600">
                <Droplet className="w-6 h-6" />
              </div>
              <Badge variant="destructive" className="bg-red-500">Low Stock</Badge>
            </div>
            <div className="text-3xl font-headline">128</div>
            <div className="text-sm text-muted-foreground">Units (O- Available)</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-green-600">
                <TrendingUp className="w-6 h-6" />
              </div>
              <Badge variant="secondary">Active</Badge>
            </div>
            <div className="text-3xl font-headline">98%</div>
            <div className="text-sm text-muted-foreground">Fullfilment Rate</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="font-headline">Inventory Levels per Group</CardTitle>
            <CardDescription>Visual distribution of current blood units across types.</CardDescription>
          </CardHeader>
          <CardContent className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted))" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip 
                  cursor={{fill: 'transparent'}} 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                />
                <Bar dataKey="units" radius={[6, 6, 0, 0]}>
                  {data.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.status === 'critical' ? 'hsl(var(--primary))' : entry.status === 'low' ? '#f59e0b' : '#10b981'} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="h-full">
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              AI Shortage Forecast
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {!prediction && !loading && (
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto">
                  <Activity className="w-8 h-8 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground">Run the prediction engine to see upcoming trends for critical types.</p>
              </div>
            )}
            
            {loading && (
              <div className="space-y-4">
                <div className="h-4 w-3/4 bg-muted animate-pulse rounded" />
                <div className="h-20 w-full bg-muted animate-pulse rounded" />
                <div className="h-10 w-full bg-muted animate-pulse rounded" />
              </div>
            )}

            {prediction && (
              <div className="animate-fade-in-up space-y-6">
                <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                  <div className="flex items-center gap-2 text-primary font-bold uppercase text-xs tracking-wider mb-2">
                    <AlertTriangle className="w-4 h-4" />
                    Current Status: {prediction.prediction.replace(/_/g, ' ')}
                  </div>
                  <p className="text-sm leading-relaxed">{prediction.rationale}</p>
                </div>

                <div className="space-y-2">
                  <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Suggested Actions</div>
                  <ul className="space-y-2">
                    {prediction.suggestedActions.map((action, i) => (
                      <li key={i} className="flex gap-2 text-sm">
                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                        {action}
                      </li>
                    ))}
                  </ul>
                </div>

                <Button variant="outline" className="w-full rounded-xl">Generate Full Report</Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
