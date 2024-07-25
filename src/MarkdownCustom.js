import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { stripIndent } from 'common-tags';


const MarkdownCustom = ({ children, ...props }) => {
  if (typeof children !== 'string') {
    console.error('MarkdownCustom expects a string as children');
    return null;
  }

  return (
    <ReactMarkdown
      {...props}
      children={stripIndent(children)}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
    />
  );
};


export default MarkdownCustom;