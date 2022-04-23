import React from "react";
import HTMLReactParser from "html-react-parser";
import { getAsset } from "libs/assets";

interface MarkdownObject {
  content?: string;
}

interface MarkdownProps {
  content?: string;
  object?: MarkdownObject;
  asset?: string;
}

const Markdown = ({ content = "", object = null, asset = null }: MarkdownProps) => {
  if (asset != null) {
    object = getAsset(asset);
  }
  if (object != null) {
    content = object.content;
  }
  return <article className="markdown-body">{HTMLReactParser(content)}</article>;
};

export default Markdown;
