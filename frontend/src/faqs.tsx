import React from 'react';
import { useState } from 'react';

const faqs = [
  {
    question: 'What is this app for?',
    answer:
      'This app is designed to help members of The Church of Jesus Christ of Latter-day Saints grow their testimonies, record their thoughts, and participate in discussion groups.',
  },
  {
    question: 'How do I join a discussion group?',
    answer:
      "You can join a discussion group by navigating to the 'Groups' section in the app and selecting a group that interests you.",
  },
  {
    question: 'Are there any inspiring videos available?',
    answer:
      'Yes! We provide a collection of uplifting videos to help strengthen your faith and testimony.',
  },
  {
    question: 'Can I save my personal thoughts and impressions?',
    answer:
      'Yes, you can record your thoughts and feelings in a personal journal within the app.',
  },
];

function Faqs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-center mb-6">
          Frequently Asked Questions
        </h1>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border rounded-lg p-4">
              <button
                onClick={() => toggleFAQ(index)}
                className="flex justify-between items-center w-full text-left text-lg font-semibold"
              >
                {faq.question}
                <span>{openIndex === index ? '▲' : '▼'}</span>
              </button>
              {openIndex === index && (
                <p className="mt-2 text-gray-700">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Faqs;
