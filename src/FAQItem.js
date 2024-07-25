import React from 'react';
import MarkdownCustom from './MarkdownCustom.js';

const FAQItem = ({ question, id, answer }) => {
  return (
    <div className="faq-item" id={id}>
      <h2 className="faq-question">{question}</h2>
      <MarkdownCustom
        className="faq-answer"
        children={answer}
      />
    </div>
  );
};

export default FAQItem;