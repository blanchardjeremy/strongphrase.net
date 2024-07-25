import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { stripIndent } from 'common-tags';


const MarkdownCustom = ({ children, ...props }) => {
  // Ensure children is a string
  const content = typeof children === 'string' ? children : children.join('');

  return (
    <ReactMarkdown
      {...props}
      children={stripIndent(content)}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
    />
  );
};


export default MarkdownCustom;