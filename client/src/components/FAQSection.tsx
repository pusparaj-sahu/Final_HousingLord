import { useState } from "react";

interface FAQ {
  question: string;
  answer: string;
}

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  
  const faqs: FAQ[] = [
    {
      question: "❓ What is Housing Lord?",
      answer: "💡 A trusted rental platform connecting tenants with verified property owners."
    },
    {
      question: "❓ What are the service fees?",
      answer: "💰 One month's rent split between tenant & owner."
    },
    {
      question: "❓ How do I list my property?",
      answer: "🏡 Register on our platform, add details, and let us do the rest!"
    },
    {
      question: "❓ Is my information secure?",
      answer: "🔒 Yes, we follow strict privacy protocols to keep your personal and financial information secure."
    }
  ];

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="max-w-3xl mx-auto px-6 py-16" data-aos="fade-up">
      <div className="bg-primary/5 border border-primary/20 rounded-xl p-8 shadow-lg shadow-primary/10">
        <h2 className="text-center text-3xl md:text-4xl text-primary font-bold mb-10">
          Frequently Asked Questions
        </h2>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="faq-item bg-primary/10 border border-primary/30 rounded-lg overflow-hidden transition-all duration-300 hover:translate-x-1 hover:bg-primary/15"
            >
              <div
                className="faq-question p-4 flex justify-between items-center cursor-pointer hover:bg-primary/10 transition-all"
                onClick={() => toggleFAQ(index)}
              >
                <h3 className="text-primary text-lg font-semibold m-0">{faq.question}</h3>
                <span
                  className={`text-primary transition-transform duration-300 ${
                    activeIndex === index ? "rotate-180" : ""
                  }`}
                >
                  ▼
                </span>
              </div>
              <div
                className={`faq-answer overflow-hidden transition-all duration-300 px-4 ${
                  activeIndex === index ? "max-h-40" : "max-h-0"
                }`}
              >
                <p className="py-4 text-white">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
