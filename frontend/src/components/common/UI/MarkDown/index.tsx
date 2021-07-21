import React, { FC } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import Markdown from "markdown-to-jsx";
import styled from "styled-components";

type MarkDownProps = {
  children: string;
};

const MarkDown: FC<MarkDownProps> = ({ children }) => {
  return (
    <MarkDownContainer>
      <Markdown
        options={{
          overrides: {
            h1: CustomH1,
            h2: CustomH2,
            h3: CustomH3,
            h4: CustomH4,
            h5: CustomH5,
            h6: CustomH6,
            a: CustomA,
            code: CustomCode,
          },
          forceBlock: true,
        }}
      >
        {children}
      </Markdown>
    </MarkDownContainer>
  );
};

const MarkDownContainer = styled.div`
  font-family: inherit;
  font-size: 1.125rem;
  color: var(--theme-main);
  line-height: 1.7;
  letter-spacing: -0.004em;
  word-break: keep-all;
  overflow-wrap: break-word;

  @media screen and (max-width: 730px) {
    font-size: 1rem;
  }

  p {
    margin: 1.5rem 0;
    white-space: pre-wrap;
  }

  p + h1,
  p + h2,
  p + h3,
  p + h4 {
    margin-top: 2.5rem;

    @media screen and (max-width: 730px) {
      margin-top: 2rem;
    }
  }

  h1,
  h2,
  h3,
  h4 {
    font-weight: bold;
    line-height: 1.5;
    margin-bottom: 1.5rem;
    padding-bottom: 0.5rem;

    @media screen and (max-width: 730px) {
      margin-bottom: 0.75rem;
    }
  }

  h1,
  h2 {
    border-bottom: 1px solid var(--theme-border);
  }

  h1 {
    font-size: 2.5rem;

    @media screen and (max-width: 730px) {
      font-size: 2.25rem;
    }
  }

  h2 {
    font-size: 2rem;

    @media screen and (max-width: 730px) {
      font-size: 1.75rem;
    }
  }

  h3 {
    font-size: 1.5rem;

    @media screen and (max-width: 730px) {
      font-size: 1.25rem;
    }
  }

  h4 {
    font-size: 1.125rem;

    @media screen and (max-width: 730px) {
      font-size: 1rem;
    }
  }

  hr {
    height: 1px;
    width: 100%;
    margin-top: 2rem;
    margin-bottom: 2rem;
    border-width: initial;
    border-style: none;
    border-color: initial;
    border-image: initial;
    background: var(--theme-border);
  }

  blockquote {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    color: var(--theme-text-scale-3);
    font-size: 1rem;
    border-left: 4px solid;
    border-color: var(--theme-background-scale-0);
    background-color: var(--theme-background-scale-2);
    margin: 2rem 0;
    padding: 0.7rem 1rem 0.7rem 2rem;

    & :first-child {
      margin-top: 0px;
    }

    & :last-child {
      margin-bottom: 0px;
    }
  }

  pre {
    font-family: "Fira Mono", source-code-pro, Menlo, Monaco, Consolas,
      "Courier New", monospace;
    font-size: 1rem;
    line-height: 1.5;
    overflow-x: auto;
    letter-spacing: 0px;
    border-radius: 5px;
  }

  code {
    font-family: "Fira Mono", source-code-pro, Menlo, Monaco, Consolas,
      "Courier New", monospace;
  }

  p > code {
    background: var(--theme-background-scale-1);
    padding: 0.2em 0.4em;
    border-radius: 5px;
    font-size: 85%;
    font-family: inherit;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
  }

  p > img {
    display: block;
    max-width: 100%;
    margin: 2rem auto;
  }

  p > a {
    text-decoration: none;
    color: var(--theme-text-scale-4);
    font-weight: bold;
  }

  table {
    border-collapse: collapse;
    display: block;
    width: 100%;
    width: -webkit-max-content;
    width: -moz-max-content;
    width: max-content;
    max-width: 100%;
    overflow: auto;
    margin-top: 1.5rem;

    tr:nth-child(2n) {
      background-color: var(--theme-background-scale-2);
    }

    tr {
      background-color: var(--theme-main-background);
      border-top: 1px solid var(--theme-border);
    }

    td,
    th {
      padding: 1px 13px;
      border: 1px solid var(--theme-border);
    }
  }
`;

const CustomH1 = ({ children }: { children: string }) => {
  return <h1 id={children.toString().replace(/\s/g, "-")}>{children}</h1>;
};

const CustomH2 = ({ children }: { children: string }) => {
  return <h2 id={children.toString().replace(/\s/g, "-")}>{children}</h2>;
};

const CustomH3 = ({ children }: { children: string }) => {
  return <h3 id={children.toString().replace(/\s/g, "-")}>{children}</h3>;
};

const CustomH4 = ({ children }: { children: string }) => {
  return <h4 id={children.toString().replace(/\s/g, "-")}>{children}</h4>;
};

const CustomH5 = ({ children }: { children: string }) => {
  return <h5 id={children.toString().replace(/\s/g, "-")}>{children}</h5>;
};

const CustomH6 = ({ children }: { children: string }) => {
  return <h6 id={children.toString().replace(/\s/g, "-")}>{children}</h6>;
};

const CustomA = ({ children, ...props }: { children: string }) => {
  return (
    <a {...props} target="_blank">
      {children}
    </a>
  );
};

const CustomCode = ({ children, ...props }) => {
  const match = /lang-(\w+)/.exec(props.className || "");
  return match ? (
    <SyntaxHighlighter
      language={match[1]}
      PreTag="div"
      style={dracula}
      {...props}
    >
      {children}
    </SyntaxHighlighter>
  ) : (
    <code {...props}>{children}</code>
  );
};

export default MarkDown;
