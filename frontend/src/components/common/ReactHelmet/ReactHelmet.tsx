import React from "react";
import { Helmet } from "react-helmet";

interface ReactHelmetProps {
  title: string;
  description: string;
  url?: string;
  image: string;
}

const ReactHelmet = ({ title, description, image, url }: ReactHelmetProps) => {
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="og:url" content={url} />
        <meta name="og:title" content={title} />
        <meta name="og:image" content={image} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={image} />
        <meta name="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
        <meta property="twitter:image" content={image} />
      </Helmet>
    </>
  );
};

export default ReactHelmet;
