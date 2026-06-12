import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function EmergencyRequestPage() {
  return (
    <div className="min-h-screen bg-clinical-shell p-4 md:p-12 flex flex-col items-center">
      <div className="w-full max-w-2xl space-y-8">
        <Button asChild variant="ghost" className="rounded-full mb-4">
          <Link href="/"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Home</Link>
        </Button>

        <div className="text-center space-y-2">
          <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">Emergency Request</h1>
          <p className="text-muted-foreground">Flash broadcast to all verified donors and nearby banks.</p>
        </div>

        <Alert variant="destructive" className="bg-red-50 border-red-200">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Critical Information</AlertTitle>
          <AlertDescription>
            This feature is for life-threatening situations only. For routine requests, please use the Hospital Dashboard.
          </AlertDescription>
        </Alert>

        <Card className="border-none shadow-2xl rounded-[2.5rem] overflow-hidden">
          <CardHeader className="bg-primary p-8 text-white">
            <CardTitle className="font-headline text-2xl">Broadcast Details</CardTitle>
            <CardDescription className="text-white/80">Information will be verified by our 24/7 clinical team within minutes.</CardDescription>
          </CardHeader>
          <CardContent className="p-10 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Blood Group</label>
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
                <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Required Units</label>
                <Input type="number" placeholder="1" className="rounded-xl h-12" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Hospital / Facility Name</label>
              <Input placeholder="City General Hospital" className="rounded-xl h-12" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Location Pin / Address</label>
              <Input placeholder="Enter location for donor routing..." className="rounded-xl h-12" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Contact Person (Attending)</label>
              <Input placeholder="Dr. Smith / Head Nurse" className="rounded-xl h-12" />
            </div>

            <Button className="w-full h-14 rounded-xl text-xl font-bold bg-primary hover:bg-primary/90 shadow-xl transition-all">
              Broadcast Critical Alert
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}