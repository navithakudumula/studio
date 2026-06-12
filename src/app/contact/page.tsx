import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="font-headline text-2xl font-bold text-primary">LifeLink</Link>
          <Button asChild variant="ghost"><Link href="/">Back</Link></Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-16">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl font-headline font-bold">Get in Touch</h1>
              <p className="text-lg text-muted-foreground">
                Have questions about donation eligibility or hospital integration? Our team is here to help 24/7.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold">Phone</h4>
                  <p className="text-sm text-muted-foreground">+1 (555) 000-LIFE</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold">Email</h4>
                  <p className="text-sm text-muted-foreground">support@lifelink.org</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold">Office</h4>
                  <p className="text-sm text-muted-foreground">123 Medical Plaza, NY</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold">Hours</h4>
                  <p className="text-sm text-muted-foreground">Always Open (24/7)</p>
                </div>
              </div>
            </div>
          </div>

          <Card className="border-none shadow-2xl p-4">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Send a Message</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">First Name</label>
                  <Input placeholder="Jane" className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Last Name</label>
                  <Input placeholder="Doe" className="rounded-xl" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Address</label>
                <Input type="email" placeholder="jane@example.com" className="rounded-xl" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Subject</label>
                <Input placeholder="Donation Query" className="rounded-xl" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Message</label>
                <Textarea placeholder="How can we help?" className="rounded-xl min-h-[150px]" />
              </div>
              <Button className="w-full h-12 rounded-xl text-lg font-bold">Send Message</Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}