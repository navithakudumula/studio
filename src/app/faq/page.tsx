import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const faqs = [
  {
    q: "Am I eligible to donate blood?",
    a: "Most people can give blood if they are in good health, weigh between 110-350 lbs, and are at least 17 years old. Some medications or travel history may affect eligibility."
  },
  {
    q: "How long does the donation process take?",
    a: "The entire process, from registration to snacks afterward, takes about an hour. The actual donation usually takes only 8-10 minutes."
  },
  {
    q: "How often can I donate?",
    a: "You can donate whole blood every 56 days (8 weeks). Platelet donors can give more frequently."
  },
  {
    q: "Is it safe to donate during a pandemic?",
    a: "Yes. Blood centers follow strict clinical guidelines to ensure the safety of both donors and staff."
  },
  {
    q: "What should I do before donating?",
    a: "Hydrate well, eat a healthy meal (avoiding fatty foods), and bring a valid ID."
  }
];

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="font-headline text-2xl font-bold text-primary">LifeLink</Link>
          <Button asChild variant="ghost"><Link href="/">Back</Link></Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-20 max-w-4xl">
        <div className="text-center space-y-4 mb-16">
          <h1 className="text-5xl font-headline font-bold">Frequently Asked Questions</h1>
          <p className="text-lg text-muted-foreground">Find answers to common questions about blood donation and our platform.</p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border rounded-2xl px-6 bg-white shadow-sm data-[state=open]:shadow-md transition-all">
              <AccordionTrigger className="text-left font-bold text-lg py-6 hover:no-underline">{faq.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-lg pb-6 leading-relaxed">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-20 p-8 rounded-3xl bg-primary/5 border border-primary/10 text-center space-y-6">
          <h3 className="text-2xl font-headline font-bold">Still have questions?</h3>
          <p className="text-muted-foreground">Our 24/7 support team is just a message away.</p>
          <Button asChild size="lg" className="rounded-full px-8">
            <Link href="/contact">Contact Support</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}