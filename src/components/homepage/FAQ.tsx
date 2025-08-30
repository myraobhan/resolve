import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "What types of complaints can I file?",
      answer: "You can file complaints about defective goods, deficient services, unfair trade practices, misleading advertisements, and overcharging. This includes complaints against manufacturers, sellers, and service providers."
    },
    {
      question: "How much does it cost to file a complaint?",
      answer: "The fee varies by forum: District Forum charges ₹200 for complaints up to ₹20 lakh, ₹400 for ₹20 lakh to ₹1 crore. State Commission charges ₹500 for ₹1-10 crore complaints. National Commission charges ₹5000 for complaints above ₹10 crore."
    },
    {
      question: "What documents do I need to file a complaint?",
      answer: "You'll need purchase receipts, warranty cards, correspondence with the seller/service provider, photographs of defects (if applicable), and any other relevant documents that support your case."
    },
    {
      question: "How long does the complaint process take?",
      answer: "District Forums typically resolve cases within 3-5 months, State Commissions within 5-6 months, and National Commission within 6-8 months. However, timeline can vary based on case complexity."
    },
    {
      question: "Can I file a complaint after a long time has passed?",
      answer: "Yes, but there's a limitation period of 2 years from the date when the cause of action arose. In cases of continuing harm or defect discovery, the limitation may be extended."
    },
    {
      question: "What if the opposite party doesn't respond?",
      answer: "If the opposite party doesn't appear or respond, the forum can proceed ex-parte and pass orders based on your evidence and arguments. They may also impose additional penalties."
    },
    {
      question: "Is this platform officially affiliated with consumer forums?",
      answer: "No, we are an independent service that helps you prepare and file complaints. The generated documents comply with legal requirements, but you'll need to submit them to the appropriate forum yourself."
    },
    {
      question: "What compensation can I expect?",
      answer: "Compensation can include refund of amount paid, replacement of goods, removal of defects, discontinuation of unfair practices, compensation for loss/injury, and punitive damages. The forum decides based on your case merits."
    }
  ];

  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get answers to common questions about consumer complaints and the filing process.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-card rounded-lg shadow-soft border-0 px-6"
              >
                <AccordionTrigger className="text-left hover:no-underline py-6">
                  <span className="text-lg font-medium">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;