
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Activity, ShieldCheck, MapPin, ArrowRight } from 'lucide-react';
import { PlaceHolderImages } from '@/app/lib/placeholder-images';

export default function Home() {
  const heroImg = PlaceHolderImages.find(img => img.id === 'hero-blood');

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Navigation */}
      <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xl group-hover:scale-110 transition-transform">
              L
            </div>
            <span className="font-headline text-2xl tracking-tight text-foreground">LifeLink</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-sm font-medium hover:text-primary transition-colors">Features</Link>
            <Link href="#about" className="text-sm font-medium hover:text-primary transition-colors">About Us</Link>
            <Link href="/auth/login" className="text-sm font-medium hover:text-primary transition-colors">Login</Link>
            <Button asChild className="rounded-full px-6">
              <Link href="/auth/register">Join as Donor</Link>
            </Button>
          </nav>
        </div>
      </header>

      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="relative h-[85vh] flex items-center overflow-hidden">
          <div className="container mx-auto px-4 z-10 grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold uppercase tracking-wider">
                <Activity className="w-4 h-4" />
                Blood is Life
              </div>
              <h1 className="font-headline text-5xl md:text-7xl leading-tight text-foreground">
                Donate Blood, <br />
                <span className="text-primary italic">Save Lives.</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
                LifeLink is a modern ecosystem connecting donors with hospitals. Real-time tracking, AI-powered matching, and a community of life-savers.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Button size="lg" className="rounded-full gap-2 px-8 h-14 text-lg" asChild>
                  <Link href="/auth/register">Start Donating <ArrowRight className="w-5 h-5" /></Link>
                </Button>
                <Button size="lg" variant="outline" className="rounded-full px-8 h-14 text-lg border-primary/20 hover:bg-primary/5" asChild>
                  <Link href="/requests">Request Blood</Link>
                </Button>
              </div>
            </div>
            <div className="relative h-[500px] w-full hidden md:block rounded-2xl overflow-hidden shadow-2xl animate-fade-in-up [animation-delay:200ms]">
              <Image 
                src={heroImg?.imageUrl || ''} 
                alt="Blood Donation" 
                fill 
                className="object-cover"
                data-ai-hint="blood donation"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { label: 'Total Donors', val: '15k+' },
                { label: 'Hospitals Joined', val: '240' },
                { label: 'Units Collected', val: '50k' },
                { label: 'Lives Impacted', val: '150k+' },
              ].map((stat, i) => (
                <div key={i} className="space-y-2">
                  <div className="text-4xl font-headline text-primary">{stat.val}</div>
                  <div className="text-sm text-muted-foreground uppercase tracking-widest">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="py-32">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-20">
              <h2 className="font-headline text-4xl md:text-5xl">Engineered for Emergency</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Advanced technology meets human empathy. Our platform ensures that every drop of blood counts when it matters most.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { 
                  icon: Activity, 
                  title: 'Smart Match-Maker', 
                  desc: 'AI-driven system matches urgent requests with compatible donors based on location and real-time inventory.' 
                },
                { 
                  icon: ShieldCheck, 
                  title: 'Live Inventory HUD', 
                  desc: 'High-fidelity tracking across 8 blood groups with visual low-stock and expiration alerts for admins.' 
                },
                { 
                  icon: Heart, 
                  title: 'Impact Journey', 
                  desc: 'Gamified experience for donors to track their history and unlock life-saving milestone badges.' 
                },
              ].map((feature, i) => (
                <Card key={i} className="border-none shadow-lg hover:shadow-xl transition-shadow bg-background/50 backdrop-blur">
                  <CardContent className="pt-8 text-center space-y-4">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mx-auto">
                      <feature.icon className="w-8 h-8" />
                    </div>
                    <h3 className="font-headline text-2xl">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-primary text-white overflow-hidden relative">
          <div className="container mx-auto px-4 text-center relative z-10 space-y-8">
            <h2 className="font-headline text-4xl md:text-6xl max-w-3xl mx-auto">Become a Beacon of Hope in Your Community</h2>
            <p className="text-white/80 text-lg max-w-xl mx-auto">
              Your one donation can save up to three lives. Join thousands of heroes today.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" variant="secondary" className="rounded-full px-8 h-14 text-lg" asChild>
                <Link href="/auth/register">Sign Up as Donor</Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-8 h-14 text-lg border-white/20 hover:bg-white/10 text-white" asChild>
                <Link href="/search">Find Nearest Bank</Link>
              </Button>
            </div>
          </div>
          {/* Abstract SVG Background */}
          <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
             <svg width="400" height="400" viewBox="0 0 200 200">
               <path fill="white" d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.5,90,-16.3,88.5,-0.9C87,14.5,81.4,29,73.1,41.9C64.8,54.8,53.8,66,40.5,73.6C27.2,81.2,13.6,85.2,-0.2,85.5C-14,85.8,-28,82.4,-41.3,75.2C-54.6,68,-67.2,57,-75.4,43.5C-83.6,30,-87.4,15,-87.3,0C-87.2,-15,-83.2,-30,-74.6,-42.6C-66,-55.2,-52.8,-65.4,-38.7,-72.7C-24.6,-80,-12.3,-84.4,1.8,-87.5C15.9,-90.6,30.6,-83.6,44.7,-76.4Z" transform="translate(100 100)" />
             </svg>
          </div>
        </section>
      </main>

      <footer className="bg-background border-t py-12">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">L</div>
            <span className="font-headline text-xl">LifeLink</span>
          </div>
          <div className="flex gap-8 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-primary">Privacy Policy</Link>
            <Link href="#" className="hover:text-primary">Terms of Service</Link>
            <Link href="#" className="hover:text-primary">Contact Support</Link>
          </div>
          <p className="text-sm text-muted-foreground">© 2024 LifeLink. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
