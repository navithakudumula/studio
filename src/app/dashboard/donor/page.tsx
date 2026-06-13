"use client";
import { cn } from "@/lib/utils";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Heart, Trophy, Calendar, MapPin, Award, CheckCircle2 } from 'lucide-react';
import { MOCK_USERS, MOCK_DONATIONS } from '@/app/lib/mock-data';

const BADGES = [
  { name: 'First Life', icon: Heart, color: 'text-red-500', earned: true },
  { name: 'Regular Hero', icon: Award, color: 'text-blue-500', earned: true },
  { name: 'Rare Guardian', icon: Trophy, color: 'text-amber-500', earned: false },
];

export default function DonorDashboard() {
  const user = MOCK_USERS[1];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="font-headline text-3xl">Hello, {user.name.split(' ')[0]}!</h1>
          <p className="text-muted-foreground">You are a LifeLink Hero. Tracking your impact journey.</p>
        </div>
        <Button size="lg" className="rounded-full shadow-lg h-14 px-8">Schedule Next Donation</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="md:col-span-2 overflow-hidden border-none shadow-xl bg-gradient-to-br from-white to-clinical-shell">
          <CardHeader className="bg-primary/5 pb-8">
            <div className="flex items-center justify-between mb-4">
              <CardTitle className="font-headline text-2xl">Donor Health Profile</CardTitle>
              <Badge className="bg-primary hover:bg-primary/90 px-4 py-1 text-lg">{user.bloodType}</Badge>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-xl border">
                <div className="text-xs text-muted-foreground uppercase mb-1">Total Units</div>
                <div className="text-2xl font-headline">5 Units</div>
              </div>
              <div className="bg-white p-4 rounded-xl border">
                <div className="text-xs text-muted-foreground uppercase mb-1">Lives Saved</div>
                <div className="text-2xl font-headline">15 Lives</div>
              </div>
              <div className="bg-white p-4 rounded-xl border">
                <div className="text-xs text-muted-foreground uppercase mb-1">Points</div>
                <div className="text-2xl font-headline">1,250</div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-8 space-y-8">
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="font-medium">Next Eligibility Window</span>
                <span className="text-green-600 flex items-center gap-1 font-bold">
                  <CheckCircle2 className="w-4 h-4" /> Eligible Now
                </span>
              </div>
              <Progress value={100} className="h-3" />
              <p className="text-xs text-muted-foreground">It has been 90 days since your last whole blood donation. You are ready to save lives again!</p>
            </div>

            <div className="space-y-4">
              <h3 className="font-headline text-xl">Recent Contributions</h3>
              <div className="space-y-3">
                {MOCK_DONATIONS.map(don => (
                  <div key={don.id} className="flex items-center justify-between p-4 bg-white rounded-xl border group hover:border-primary/30 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-primary">
                        <Droplets className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="font-bold">{don.location}</div>
                        <div className="text-xs text-muted-foreground flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> {don.date}
                        </div>
                      </div>
                    </div>
                    <Badge variant="outline" className="rounded-full">1 Unit</Badge>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-8">
          <Card className="border-none shadow-xl bg-white">
            <CardHeader>
              <CardTitle className="font-headline text-xl flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-500" />
                Impact Milestones
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                {BADGES.map(badge => (
                  <div 
                    key={badge.name} 
                    className={cn(
                      "flex flex-col items-center justify-center p-4 rounded-2xl border transition-all grayscale",
                      badge.earned && "grayscale-0 bg-secondary/50 border-primary/20 scale-105"
                    )}
                  >
                    <badge.icon className={cn("w-10 h-10 mb-2", badge.color)} />
                    <div className="text-xs font-bold text-center">{badge.name}</div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full rounded-xl">View Reward Store</Button>
            </CardContent>
          </Card>

          <Card className="border-none shadow-xl bg-primary text-white">
            <CardContent className="pt-6 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="font-headline text-xl">Nearest Drive</h3>
              <div className="space-y-2">
                <div className="font-bold">City Hall Plaza</div>
                <div className="text-sm text-white/80">Saturday, June 1st • 09:00 AM</div>
              </div>
              <Button variant="secondary" className="w-full rounded-xl">RSVP Now</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Droplets(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 16.3c2.2 0 4-1.8 4-4 0-3.3-4-6-4-6s-4 2.7-4 6c0 2.2 1.8 4 4 4Z" />
      <path d="M17 16.3c2.2 0 4-1.8 4-4 0-3.3-4-6-4-6s-4 2.7-4 6c0 2.2 1.8 4 4 4Z" />
    </svg>
  )
}
