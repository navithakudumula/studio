
"use client"

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useState } from 'react';

export default function LoginPage() {
  const [role, setRole] = useState<'admin' | 'donor' | 'hospital'>('donor');

  return (
    <div className="min-h-screen flex items-center justify-center bg-clinical-shell p-4">
      <Card className="w-full max-w-md border-none shadow-2xl rounded-3xl overflow-hidden">
        <div className="h-2 bg-primary w-full" />
        <CardHeader className="text-center pt-8">
          <Link href="/" className="inline-block mb-4">
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-2xl mx-auto">L</div>
          </Link>
          <CardTitle className="font-headline text-3xl">Welcome Back</CardTitle>
          <CardDescription>Enter your credentials to access LifeLink</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pb-12 px-10">
          <div className="flex p-1 bg-muted rounded-xl gap-1">
            {(['donor', 'hospital', 'admin'] as const).map(r => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={cn(
                  "flex-1 py-2 text-xs font-bold rounded-lg uppercase tracking-wider transition-all",
                  role === r ? "bg-white shadow-sm text-primary" : "text-muted-foreground hover:bg-white/50"
                )}
              >
                {r}
              </button>
            ))}
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Email Address</label>
              <Input type="email" placeholder="john@example.com" className="rounded-xl h-12" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-sm font-medium">Password</label>
                <Link href="#" className="text-xs text-primary font-semibold hover:underline">Forgot?</Link>
              </div>
              <Input type="password" placeholder="••••••••" className="rounded-xl h-12" />
            </div>
          </div>

          <Button asChild size="lg" className="w-full h-12 rounded-xl text-lg font-bold">
            <Link href={`/dashboard/${role}`}>Sign In</Link>
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            New to LifeLink? <Link href="/auth/register" className="text-primary font-bold hover:underline">Create account</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
