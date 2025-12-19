import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "What are your hospital visiting hours?",
      answer: "Our general visiting hours are from 10:00 AM to 8:00 PM daily. However, ICU visiting hours are restricted to 11:00 AM to 12:00 PM and 5:00 PM to 6:00 PM. We recommend calling ahead for specific department visiting hours as they may vary."
    },
    {
      question: "Do you accept insurance? What plans do you work with?",
      answer: "Yes, we accept most major insurance plans including Medicare, Medicaid, Blue Cross Blue Shield, Aetna, Cigna, UnitedHealthcare, and many others. We recommend contacting our billing department to verify your specific coverage before your appointment."
    },
    {
      question: "How do I schedule an appointment?",
      answer: "You can schedule an appointment by calling our main line, using our online patient portal, or through our mobile app. For urgent care needs, walk-ins are welcome. For specialist appointments, a referral from your primary care physician may be required depending on your insurance."
    },
    {
      question: "What should I bring to my first appointment?",
      answer: "Please bring a valid photo ID, your insurance card, a list of current medications, any relevant medical records, and a form of payment for copays or deductibles. If you're seeing a specialist, bring any referral documents from your primary care physician."
    },
    {
      question: "Do you offer emergency services 24/7?",
      answer: "Yes, our Emergency Department is open 24 hours a day, 7 days a week, including holidays. We have board-certified emergency medicine physicians and trauma specialists on staff at all times to handle any medical emergency."
    },
    {
      question: "Is parking available at the hospital?",
      answer: "Yes, we offer free parking for patients and visitors in our main parking garage. Valet parking is also available at the main entrance for a nominal fee. Handicap accessible parking spaces are available on all levels near elevator access points."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-gradient-to-b from-cyan-100 via-blue-50 to-white py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <div className="inline-block px-4 sm:px-6 py-2 bg-blue-100 rounded-full mb-3 sm:mb-4">
            <span className="text-blue-600 font-semibold text-xs sm:text-sm uppercase tracking-wide">Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 mb-3 sm:mb-4 px-2">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg px-4">
            Find answers to common questions about our hospital services, appointments, and patient care
          </p>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-sm border-2 border-blue-100 rounded-xl sm:rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-4 sm:p-5 md:p-6 text-left hover:bg-blue-50/50 transition-colors"
              >
                <span className="text-base sm:text-lg font-bold text-gray-800 pr-4 sm:pr-8">
                  {faq.question}
                </span>
                <div className={`flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  openIndex === index 
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500' 
                    : 'bg-blue-100'
                }`}>
                  {openIndex === index ? (
                    <ChevronUp className="text-white" size={18} />
                  ) : (
                    <ChevronDown className="text-blue-600" size={18} />
                  )}
                </div>
              </button>
              
              {openIndex === index && (
                <div className="px-4 sm:px-5 md:px-6 pb-4 sm:pb-5 md:pb-6 bg-gradient-to-br from-blue-50 to-cyan-50">
                  <div className="pt-3 sm:pt-4 border-t-2 border-blue-100">
                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-8 sm:mt-10 lg:mt-12 bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 border-2 border-blue-100 shadow-lg">
          <p className="text-gray-700 mb-3 sm:mb-4 text-base sm:text-lg font-semibold">
            Still have questions?
          </p>
          <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
            Our support team is here to help you with any inquiries
          </p>
          <button className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-full hover:from-blue-600 hover:to-cyan-600 transition-all font-semibold shadow-xl text-sm sm:text-base w-full sm:w-auto">
            Contact Our Support Team
          </button>
        </div>
      </div>
    </div>
  );
}

export default FAQSection;