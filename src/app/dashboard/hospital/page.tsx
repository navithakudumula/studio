
"use client"

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, MapPin, Activity, User, Phone, CheckCircle } from 'lucide-react';
import { hospitalSmartDonorMatcher, type HospitalSmartDonorMatcherOutput } from '@/ai/flows/hospital-smart-donor-matcher-flow';
import { MOCK_REQUESTS } from '@/app/lib/mock-data';

export default function HospitalDashboard() {
  const [matchingResults, setMatchingResults] = useState<HospitalSmartDonorMatcherOutput | null>(null);
  const [loading, setLoading] = useState(false);

  const findMatches = async (bloodType: string) => {
    setLoading(true);
    try {
      const result = await hospitalSmartDonorMatcher({
        requestId: 'req_manual_1',
        hospitalId: 'u3',
        requiredBloodType: bloodType as any,
        urgencyLevel: 'emergency',
        patientLocation: {
          lat: 40.7128,
          lng: -74.0060,
          city: 'New York',
          district: 'Manhattan',
          pinCode: '10001'
        }
      });
      setMatchingResults(result);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-headline text-3xl">LifeLink Gateway</h1>
          <p className="text-muted-foreground">Secure portal for hospital requests and donor matching.</p>
        </div>
        <Button className="rounded-full shadow-lg">New Emergency Request</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-xl">Quick Request</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Blood Group Needed</label>
                <Select onValueChange={(v) => findMatches(v)}>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder="Select group" />
                  </SelectTrigger>
                  <SelectContent>
                    {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Quantity (Units)</label>
                <Input type="number" placeholder="1" className="rounded-xl" />
              </div>
              <Button 
                className="w-full rounded-xl" 
                variant="secondary"
                disabled={loading}
              >
                Broadcast Alert
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-xl">Recent Requests</CardTitle>
            </CardHeader>
            <CardContent className="px-0">
              <div className="divide-y">
                {MOCK_REQUESTS.map(req => (
                  <div key={req.id} className="p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-bold text-lg">{req.type}</span>
                      <Badge variant={req.urgency === 'emergency' ? 'destructive' : 'secondary'} className="text-[10px] uppercase">
                        {req.urgency}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground mb-2">{req.units} units requested • {req.date}</div>
                    <div className="flex items-center gap-1.5 text-xs text-green-600 font-medium">
                      <CheckCircle className="w-3 h-3" />
                      Status: {req.status}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3 space-y-8">
          <Card className="min-h-[500px]">
            <CardHeader className="border-b bg-muted/20">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="font-headline text-2xl">Smart Match-Maker Tool</CardTitle>
                  <CardDescription>AI analyzes proximity, compatibility, and availability in real-time.</CardDescription>
                </div>
                <Activity className="w-6 h-6 text-primary animate-pulse" />
              </div>
            </CardHeader>
            <CardContent className="pt-8">
              {!matchingResults && !loading && (
                <div className="text-center py-20 space-y-6">
                  <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center mx-auto text-muted-foreground/30">
                    <Search className="w-12 h-12" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-headline">No Search Active</h3>
                    <p className="text-muted-foreground max-w-md mx-auto">
                      Select a blood group from the sidebar to activate the AI matching engine and find nearby donors or banks.
                    </p>
                  </div>
                </div>
              )}

              {loading && (
                <div className="space-y-6">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="flex gap-4 p-4 border rounded-2xl animate-pulse">
                      <div className="w-16 h-16 rounded-full bg-muted" />
                      <div className="flex-1 space-y-2">
                        <div className="h-4 w-1/4 bg-muted rounded" />
                        <div className="h-4 w-full bg-muted rounded" />
                        <div className="h-4 w-1/2 bg-muted rounded" />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {matchingResults && (
                <div className="space-y-6 animate-fade-in-up">
                  <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-between">
                    <p className="text-sm text-primary font-medium">{matchingResults.message}</p>
                    <Badge variant="outline" className="border-primary/20 text-primary">Found {matchingResults.recommendations.length} Matches</Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {matchingResults.recommendations.map(rec => (
                      <Card key={rec.id} className="border hover:border-primary/40 transition-all cursor-pointer group">
                        <CardContent className="p-6 space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className={cn(
                                "w-12 h-12 rounded-full flex items-center justify-center",
                                rec.type === 'donor' ? "bg-accent/10 text-accent" : "bg-primary/10 text-primary"
                              )}>
                                {rec.type === 'donor' ? <User className="w-6 h-6" /> : <Activity className="w-6 h-6" />}
                              </div>
                              <div>
                                <h4 className="font-bold text-lg">{rec.name}</h4>
                                <Badge variant="secondary" className="text-[10px] uppercase">{rec.type.replace('_', ' ')}</Badge>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-xl font-headline text-primary">{rec.bloodTypeMatch}</div>
                              <div className="text-[10px] text-muted-foreground uppercase">Compatibility</div>
                            </div>
                          </div>
                          
                          <p className="text-sm text-muted-foreground italic leading-relaxed">
                            "{rec.reasoning}"
                          </p>

                          <div className="flex items-center justify-between pt-4 border-t">
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <MapPin className="w-3 h-3" />
                              {rec.distanceKm} km away
                            </div>
                            <Button size="sm" className="rounded-full gap-2 group-hover:bg-primary">
                              <Phone className="w-4 h-4" /> Contact
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
