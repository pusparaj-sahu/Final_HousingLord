import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";

interface FAQ {
  question: string;
  answer: string;
}

export default function FAQSection() {
  const faqs: FAQ[] = [
    {
      question: "How does Housing Lord verify tenants?",
      answer: "We have a comprehensive verification process that includes identity checks, employment verification, credit history assessment, and background checks. All tenants are thoroughly vetted to ensure security for property owners."
    },
    {
      question: "What areas in Odisha do you cover?",
      answer: "Currently, we operate in Bhubaneswar, Cuttack, and Puri. We're expanding to more cities in Odisha soon. Stay tuned for updates!"
    },
    {
      question: "Are there any fees for property owners to list their property?",
      answer: "We offer both free and premium listing options. Free listings include basic features, while premium listings offer enhanced visibility, professional photography, and priority customer support. See our pricing section for more details."
    },
    {
      question: "How long does the tenant verification process take?",
      answer: "Our standard verification process typically takes 2-3 business days. For urgent cases, we offer an express verification service that can be completed within 24 hours for an additional fee."
    },
    {
      question: "Do you handle the rental agreement preparation?",
      answer: "Yes, we provide legally vetted rental agreement templates that comply with Odisha's rental laws. We can also customize agreements based on specific requirements for a nominal fee."
    },
    {
      question: "What if a tenant damages my property?",
      answer: "We recommend collecting a security deposit (typically 2-3 months' rent) before move-in. Additionally, we offer an optional Damage Protection Plan that provides coverage for damages beyond normal wear and tear."
    },
    {
      question: "Can I get my property professionally photographed through Housing Lord?",
      answer: "Yes, professional photography services are included in our Premium and Elite listing packages. For Basic package users, this service can be added for an additional fee."
    },
    {
      question: "How do rent payments work through your platform?",
      answer: "We offer a secure payment gateway where tenants can pay rent online. The amount is directly transferred to the property owner's bank account after deducting our service fee (if applicable). This provides a transparent and hassle-free experience for both parties."
    },
  ];

  return (
    <section id="faq" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16" data-aos="fade-up">
          <span className="text-primary font-semibold uppercase tracking-wider">Got Questions?</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-6 text-white">Frequently Asked Questions</h2>
          <p className="text-white/70 max-w-3xl mx-auto">
            Find answers to common questions about our services, pricing, and processes.
            If you can't find what you're looking for, feel free to contact us.
          </p>
        </div>

        <div className="max-w-3xl mx-auto" data-aos="fade-up">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-background/20 border border-primary/20 rounded-lg overflow-hidden"
              >
                <AccordionTrigger className="px-6 py-4 text-white hover:text-primary font-semibold text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-white/80">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mt-12 text-center" data-aos="fade-up">
          <p className="text-white/70 mb-6">
            Can't find the answer you're looking for? Contact our support team
          </p>
          <button className="bg-primary text-black py-3 px-6 rounded-full font-bold hover:bg-white hover:text-primary transition-colors">
            <i className="fas fa-comment mr-2"></i> Contact Support
          </button>
        </div>
      </div>
    </section>
  );
}