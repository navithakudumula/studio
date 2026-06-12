import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Activity, ShieldCheck, MapPin, ArrowRight, Droplets, Info, HelpCircle, PhoneCall } from 'lucide-react';
import { PlaceHolderImages } from '@/app/lib/placeholder-images';

export default function Home() {
  const heroImg = PlaceHolderImages.find(img => img.id === 'hero-blood');

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Navigation */}
      <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xl group-hover:scale-110 transition-transform shadow-lg">
              L
            </div>
            <span className="font-headline text-2xl tracking-tight text-foreground font-bold">LifeLink</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">About</Link>
            <Link href="/compatibility" className="text-sm font-medium hover:text-primary transition-colors">Compatibility</Link>
            <Link href="/faq" className="text-sm font-medium hover:text-primary transition-colors">FAQ</Link>
            <Link href="/contact" className="text-sm font-medium hover:text-primary transition-colors">Contact</Link>
            <div className="h-6 w-px bg-border mx-2" />
            <Link href="/auth/login" className="text-sm font-medium hover:text-primary transition-colors">Login</Link>
            <Button asChild className="rounded-full px-6 shadow-md">
              <Link href="/auth/register">Donate Now</Link>
            </Button>
          </nav>
        </div>
      </header>

      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center overflow-hidden">
          <div className="container mx-auto px-4 z-10 grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-in-up space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold uppercase tracking-wider border border-primary/20">
                <Activity className="w-4 h-4" />
                Real-time Blood Banking
              </div>
              <h1 className="font-headline text-6xl md:text-8xl leading-[1.1] text-foreground font-bold">
                Small Drop, <br />
                <span className="text-primary italic">Giant Hope.</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg leading-relaxed">
                Connect with local donors, monitor inventory, and save lives through our integrated blockchain-secure blood management ecosystem.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Button size="lg" className="rounded-full gap-2 px-10 h-16 text-lg font-bold shadow-xl" asChild>
                  <Link href="/auth/register">Register as Donor <ArrowRight className="w-5 h-5" /></Link>
                </Button>
                <Button size="lg" variant="outline" className="rounded-full px-10 h-16 text-lg font-bold border-primary/20 hover:bg-primary/5 shadow-sm" asChild>
                  <Link href="/emergency-request">Emergency Request</Link>
                </Button>
              </div>
            </div>
            <div className="relative h-[600px] w-full hidden lg:block rounded-[2rem] overflow-hidden shadow-2xl animate-fade-in-up [animation-delay:200ms] border-8 border-white">
              <Image 
                src={heroImg?.imageUrl || ''} 
                alt="Blood Donation" 
                fill 
                className="object-cover"
                data-ai-hint="blood donation"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
            </div>
          </div>
          {/* Background shapes */}
          <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -z-10" />
        </section>

        {/* Stats Section */}
        <section className="py-24 bg-white border-y">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
              {[
                { label: 'Verified Donors', val: '25,000+', icon: Heart },
                { label: 'Partner Hospitals', val: '450', icon: MapPin },
                { label: 'Units Delivered', val: '120k', icon: Droplets },
                { label: 'Lives Impacted', val: '350k+', icon: Activity },
              ].map((stat, i) => (
                <div key={i} className="text-center space-y-3 group cursor-default">
                  <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary mx-auto group-hover:scale-110 transition-transform">
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div className="text-4xl font-headline font-bold text-primary">{stat.val}</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-[0.2em] font-bold">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Dynamic Feature Grid */}
        <section className="py-32 container mx-auto px-4">
          <div className="text-center space-y-6 mb-24">
            <h2 className="font-headline text-5xl md:text-6xl font-bold">Why Choose LifeLink?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
              We leverage advanced AI and real-time logistics to ensure that critical blood types are always exactly where they need to be.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { 
                icon: Activity, 
                title: 'AI Smart-Match', 
                desc: 'Instantly identifies the best donors based on geolocation, compatibility, and availability for emergency needs.',
                color: 'bg-red-50 text-red-600'
              },
              { 
                icon: ShieldCheck, 
                title: 'Live Inventory HUD', 
                desc: 'Real-time visibility into hospital stock levels with predictive shortage analytics and expiration tracking.',
                color: 'bg-blue-50 text-blue-600'
              },
              { 
                icon: Heart, 
                title: 'Donor Rewards', 
                desc: 'A gamified experience where every donation earns points, impact badges, and priority health checks.',
                color: 'bg-pink-50 text-pink-600'
              },
            ].map((feature, i) => (
              <Card key={i} className="group border-none shadow-xl hover:-translate-y-2 transition-all duration-300 rounded-[2.5rem] p-4">
                <CardContent className="pt-10 space-y-6 text-center">
                  <div className={`w-20 h-20 rounded-3xl ${feature.color} flex items-center justify-center mx-auto shadow-sm group-hover:scale-110 transition-transform`}>
                    <feature.icon className="w-10 h-10" />
                  </div>
                  <h3 className="font-headline text-3xl font-bold">{feature.title}</h3>
                  <p className="text-muted-foreground text-base leading-relaxed">{feature.desc}</p>
                  <Button variant="ghost" className="rounded-full group-hover:text-primary">
                    Learn more <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Emergency Banner */}
        <section className="container mx-auto px-4 mb-32">
          <div className="bg-primary rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden shadow-2xl">
            <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-4xl md:text-6xl font-headline font-bold leading-tight">Every Minute Counts in an Emergency.</h2>
                <p className="text-white/80 text-lg">Our rapid-response system handles 1,200+ emergency requests daily with a 99.8% success rate.</p>
                <div className="flex gap-4">
                  <Button size="lg" variant="secondary" className="rounded-full px-8 h-14 font-bold shadow-lg" asChild>
                    <Link href="/emergency-request">Request Emergency Units</Link>
                  </Button>
                  <Button size="lg" variant="outline" className="rounded-full px-8 h-14 font-bold border-white/20 hover:bg-white/10 text-white" asChild>
                    <Link href="/contact">Support 24/7</Link>
                  </Button>
                </div>
              </div>
              <div className="hidden md:flex justify-end">
                <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20 space-y-4 max-w-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-sm font-bold uppercase tracking-widest">Active Status</span>
                  </div>
                  <div className="space-y-2">
                    <div className="text-3xl font-headline font-bold">99.8%</div>
                    <div className="text-sm text-white/70">Matching Accuracy</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-3xl font-headline font-bold">&lt; 15 min</div>
                    <div className="text-sm text-white/70">Avg. Response Time</div>
                  </div>
                </div>
              </div>
            </div>
            {/* Abstract Background */}
            <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
              <svg width="100%" height="100%" viewBox="0 0 800 400">
                <path fill="white" d="M0,200 Q200,50 400,200 T800,200 V400 H0 Z" />
              </svg>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t pt-20 pb-10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="space-y-6 col-span-1 md:col-span-1">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">L</div>
                <span className="font-headline text-2xl font-bold">LifeLink</span>
              </Link>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Empowering healthcare through secure, efficient, and compassionate blood resource management.
              </p>
            </div>
            <div className="space-y-6">
              <h4 className="font-bold text-sm uppercase tracking-widest text-primary">Platform</h4>
              <ul className="space-y-4 text-sm font-medium text-muted-foreground">
                <li><Link href="/about" className="hover:text-primary transition-colors">How it Works</Link></li>
                <li><Link href="/compatibility" className="hover:text-primary transition-colors">Blood Types</Link></li>
                <li><Link href="/dashboard/donor" className="hover:text-primary transition-colors">Donor Portal</Link></li>
                <li><Link href="/dashboard/hospital" className="hover:text-primary transition-colors">Hospital Gateway</Link></li>
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="font-bold text-sm uppercase tracking-widest text-primary">Company</h4>
              <ul className="space-y-4 text-sm font-medium text-muted-foreground">
                <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
                <li><Link href="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="font-bold text-sm uppercase tracking-widest text-primary">Emergency</h4>
              <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10">
                <p className="text-xs font-bold text-primary mb-2">24/7 HELPLINE</p>
                <p className="text-xl font-headline font-bold">+1 (555) 000-LIFE</p>
              </div>
            </div>
          </div>
          <div className="border-t pt-10 flex flex-col md:row justify-between items-center gap-6">
            <p className="text-xs text-muted-foreground">© 2024 LifeLink. All rights reserved.</p>
            <div className="flex gap-8 text-xs font-bold text-muted-foreground">
              <Link href="#" className="hover:text-primary">Privacy Policy</Link>
              <Link href="#" className="hover:text-primary">Terms of Service</Link>
              <Link href="#" className="hover:text-primary">Cookie Settings</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}