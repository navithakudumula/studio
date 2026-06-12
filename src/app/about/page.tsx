import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Heart, Shield, Users, Activity } from 'lucide-react';
import { PlaceHolderImages } from '@/app/lib/placeholder-images';

export default function AboutPage() {
  const labImg = PlaceHolderImages.find(img => img.id === 'lab-results');

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="font-headline text-2xl font-bold text-primary">LifeLink</Link>
          <nav className="flex gap-4">
            <Button asChild variant="ghost"><Link href="/">Home</Link></Button>
            <Button asChild><Link href="/auth/register">Join Us</Link></Button>
          </nav>
        </div>
      </header>

      <main>
        <section className="py-20 bg-primary text-white">
          <div className="container mx-auto px-4 text-center space-y-6">
            <h1 className="text-5xl md:text-7xl font-headline font-bold">Saving Lives through Technology</h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              LifeLink is more than a management system; it's a mission to ensure no one suffers due to a lack of blood availability.
            </p>
          </div>
        </section>

        <section className="py-24 container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl">
              <Image 
                src={labImg?.imageUrl || ''} 
                alt="Laboratory" 
                fill 
                className="object-cover"
                data-ai-hint="medical laboratory"
              />
            </div>
            <div className="space-y-8">
              <h2 className="text-4xl font-headline font-bold">Our Vision</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Founded in 2024, LifeLink was born out of a simple observation: blood banks and hospitals were often working in silos. We created a unified digital ecosystem that connects donors, hospitals, and admins in real-time.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="font-bold text-primary text-2xl">100%</div>
                  <p className="text-sm text-muted-foreground">Transparency in stock</p>
                </div>
                <div className="space-y-2">
                  <div className="font-bold text-primary text-2xl">Fast</div>
                  <p className="text-sm text-muted-foreground">Emergency matching</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-headline font-bold">Core Values</h2>
            </div>
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { icon: Heart, title: 'Empathy', desc: 'Putting patient lives at the center of everything.' },
                { icon: Shield, title: 'Security', desc: 'Enterprise-grade protection for donor data.' },
                { icon: Activity, title: 'Precision', desc: 'Accurate inventory tracking and expiry alerts.' },
                { icon: Users, title: 'Community', desc: 'Building a network of reliable life-savers.' },
              ].map((val, i) => (
                <div key={i} className="bg-white p-8 rounded-2xl shadow-sm text-center space-y-4 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mx-auto">
                    <val.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-xl">{val.title}</h3>
                  <p className="text-muted-foreground text-sm">{val.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}