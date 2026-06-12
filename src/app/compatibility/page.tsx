import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CheckCircle2, XCircle } from 'lucide-react';

const compatibilityData = [
  { type: 'A+', give: ['A+', 'AB+'], receive: ['A+', 'A-', 'O+', 'O-'] },
  { type: 'O+', give: ['O+', 'A+', 'B+', 'AB+'], receive: ['O+', 'O-'] },
  { type: 'B+', give: ['B+', 'AB+'], receive: ['B+', 'B-', 'O+', 'O-'] },
  { type: 'AB+', give: ['AB+'], receive: ['Everyone'] },
  { type: 'A-', give: ['A+', 'A-', 'AB+', 'AB-'], receive: ['A-', 'O-'] },
  { type: 'O-', give: ['Everyone'], receive: ['O-'] },
  { type: 'B-', give: ['B+', 'B-', 'AB+', 'AB-'], receive: ['B-', 'O-'] },
  { type: 'AB-', give: ['AB+', 'AB-'], receive: ['AB-', 'A-', 'B-', 'O-'] },
];

export default function CompatibilityPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="font-headline text-2xl font-bold text-primary">LifeLink</Link>
          <Button asChild variant="ghost"><Link href="/">Back to Home</Link></Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h1 className="text-4xl md:text-5xl font-headline font-bold">Blood Compatibility</h1>
          <p className="text-muted-foreground text-lg">
            Understanding who can give and receive from whom is critical for life-saving transfusions.
          </p>
        </div>

        <Card className="shadow-xl border-none">
          <CardHeader className="bg-primary/5">
            <CardTitle className="font-headline text-2xl">Transfusion Quick-Reference</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30">
                  <TableHead className="font-bold py-6">Blood Type</TableHead>
                  <TableHead className="font-bold">Can Give Blood To</TableHead>
                  <TableHead className="font-bold">Can Receive Blood From</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {compatibilityData.map((row) => (
                  <TableRow key={row.type} className="hover:bg-muted/20 transition-colors">
                    <TableCell className="font-bold text-lg text-primary py-6">{row.type}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-2">
                        {row.give.map(t => (
                          <span key={t} className="px-2 py-1 bg-green-100 text-green-700 rounded text-sm font-medium">{t}</span>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-2">
                        {row.receive.map(t => (
                          <span key={t} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm font-medium">{t}</span>
                        ))}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="border-none bg-secondary/50">
            <CardContent className="p-8 space-y-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-headline font-bold">Universal Donor: O Negative</h3>
              <p className="text-muted-foreground leading-relaxed">
                O negative blood can be given to anyone. In emergencies, it's often the first type used when the patient's blood type is unknown.
              </p>
            </CardContent>
          </Card>
          <Card className="border-none bg-secondary/50">
            <CardContent className="p-8 space-y-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-headline font-bold">Universal Recipient: AB Positive</h3>
              <p className="text-muted-foreground leading-relaxed">
                Patients with AB positive blood can receive a transfusion of any blood type.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}