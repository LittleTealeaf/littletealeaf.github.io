type JsonDom = Element | {
  tag: string;
  classList: string[];
  children: JsonDom[];
  text: string;
  html: string;
  attributes: {
    [key: string]: string;
  };
  style: {
    [key: string]: string;
  };
  data: {
    [key: string]: string;
  };
  onclick: () => void;
  src: string;
  href: string;
  target: string;
}
