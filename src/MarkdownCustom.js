import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { stripIndent } from 'common-tags';



const MarkdownTableWrapper = ({ children }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse">{children}</table>
    </div>
  );
};

const renderers = {
  table: MarkdownTableWrapper,
};




const MarkdownCustom = ({ children, ...props }) => {
  if (typeof children !== 'string') {
    console.error('MarkdownCustom expects a string as children');
    return null;
  }

  return (
    <ReactMarkdown
      {...props}
      children={stripIndent(children)}
      components={renderers}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
    />
  );
};


export default MarkdownCustom;