"use client"

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';
import { CheckCircle2, User, Hospital, Shield } from 'lucide-react';

export default function RegisterPage() {
  const [role, setRole] = useState<'donor' | 'hospital'>('donor');

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/30 p-4">
      <Card className="w-full max-w-2xl border-none shadow-2xl rounded-[2.5rem] overflow-hidden bg-white">
        <div className="grid md:grid-cols-5 h-full">
          <div className="md:col-span-2 bg-primary p-10 text-white flex flex-col justify-between overflow-hidden relative">
            <div className="relative z-10 space-y-6">
              <Link href="/" className="inline-block">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-primary font-bold text-2xl">L</div>
              </Link>
              <div className="space-y-2">
                <h2 className="text-3xl font-headline font-bold">Join the LifeLink Network</h2>
                <p className="text-white/80 text-sm">Every registration brings us closer to a world without blood shortages.</p>
              </div>
              <ul className="space-y-4">
                <li className="flex gap-3 text-sm font-medium">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  Real-time matching
                </li>
                <li className="flex gap-3 text-sm font-medium">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  Impact tracking
                </li>
                <li className="flex gap-3 text-sm font-medium">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  Secure data vault
                </li>
              </ul>
            </div>
            {/* Decoration */}
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mb-32 blur-2xl" />
          </div>

          <CardContent className="md:col-span-3 p-10 space-y-8">
            <div className="space-y-2">
              <CardTitle className="font-headline text-3xl font-bold">Create Account</CardTitle>
              <CardDescription>Select your account type to get started</CardDescription>
            </div>

            <div className="flex p-1 bg-muted rounded-2xl gap-1">
              <button
                onClick={() => setRole('donor')}
                className={cn(
                  "flex-1 py-3 text-sm font-bold rounded-xl flex items-center justify-center gap-2 transition-all",
                  role === 'donor' ? "bg-white shadow-md text-primary" : "text-muted-foreground hover:bg-white/50"
                )}
              >
                <User className="w-4 h-4" /> Donor
              </button>
              <button
                onClick={() => setRole('hospital')}
                className={cn(
                  "flex-1 py-3 text-sm font-bold rounded-xl flex items-center justify-center gap-2 transition-all",
                  role === 'hospital' ? "bg-white shadow-md text-primary" : "text-muted-foreground hover:bg-white/50"
                )}
              >
                <Hospital className="w-4 h-4" /> Hospital
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Full Name</label>
                  <Input placeholder="John Doe" className="rounded-xl h-12" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Email</label>
                  <Input type="email" placeholder="john@example.com" className="rounded-xl h-12" />
                </div>
              </div>

              {role === 'donor' && (
                <div className="grid grid-cols-2 gap-4 animate-fade-in-up">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Blood Group</label>
                    <Select>
                      <SelectTrigger className="rounded-xl h-12">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(t => (
                          <SelectItem key={t} value={t}>{t}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Mobile</label>
                    <Input placeholder="+1 234..." className="rounded-xl h-12" />
                  </div>
                </div>
              )}

              {role === 'hospital' && (
                <div className="space-y-4 animate-fade-in-up">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Hospital License ID</label>
                    <Input placeholder="HL-998..." className="rounded-xl h-12" />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Password</label>
                <Input type="password" placeholder="••••••••" className="rounded-xl h-12" />
              </div>
            </div>

            <Button className="w-full h-12 rounded-xl text-lg font-bold shadow-lg" asChild>
              <Link href={`/dashboard/${role}`}>Register Now</Link>
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Already have an account? <Link href="/auth/login" className="text-primary font-bold hover:underline">Sign in</Link>
            </p>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}