import Markdown from "react-markdown";
import "../styles/RenderMarkdown.css";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import "katex/dist/katex.min.css";

const CustomParagraph = ({ children }: any) => {
  return <p className="custom-paragraph">{children}</p>;
};

const CustomCodeBlock = ({ children }: any) => {
  return <code className="custom-code">{children}</code>;
};

const CustomHeading3 = ({ children }: any) => {
  return <h3 className="custom-heading3">{children}</h3>;
};

const CustomHeading2 = ({ children }: any) => {
  return <h2 className="custom-heading2">{children}</h2>;
};

const CustomOrderList = ({ children }: any) => {
  return <ol className="custom-orderlist">{children}</ol>;
};

const CustomUnOrderList = ({ children }: any) => {
  return <ul className="custom-unorderlist">{children}</ul>;
};

const CustomPre = ({ children }: any) => {
  return <pre className="custom-pre">{children}</pre>;
};

export default function RenderMarkdown({ children }: { children: string }) {
  const preprocessLaTeX = (content: string) => {
    const blockProcessedContent = content.replace(
      /\\\[(.*?)\\\]/gs,
      (_, equation) => `$$${equation}$$`
    );
    const inlineProcessedContent = blockProcessedContent.replace(
      /\\\((.*?)\\\)/gs,
      (_, equation) => `$${equation}$`
    );
    return inlineProcessedContent;
  };

  return (
    <>
      <Markdown
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          p: CustomParagraph,
          code: CustomCodeBlock,
          ol: CustomOrderList,
          ul: CustomUnOrderList,
          h3: CustomHeading3,
          h2: CustomHeading2,
          pre: CustomPre,
        }}
      >
        {preprocessLaTeX(children)}
      </Markdown>
    </>
  );
}
