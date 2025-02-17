export const SIDEBAR_COOKIE_NAME = "sidebar:state";
export const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
export const SIDEBAR_WIDTH = "12rem";
export const SIDEBAR_WIDTH_MOBILE = "12rem";
export const SIDEBAR_WIDTH_ICON = "3rem";
export const SIDEBAR_KEYBOARD_SHORTCUT = "b";
export const BASE_URL = process.env.NEXT_PUBLIC_APP_URL;
export const MAX_URL_LENGTH = 2000;
export const ALLOWED_HTML_TAGS = [
  "p",
  "br",
  "b",
  "i",
  "em",
  "strong",
  "a",
  "img",
  "ul",
  "ol",
  "li",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "blockquote",
  "pre",
  "code",
  "div",
  "span",
  "table",
  "thead",
  "tbody",
  "tr",
  "td",
  "th",
];

export const ALLOWED_HTML_ATTRIBUTES = {
  a: ["href", "target", "rel"],
  img: ["src", "alt", "width", "height"],
  "*": ["style", "class"],
};

export const ALLOWED_HTML_STYLES = {
  "*": {
    color: [/^#(0x)?[0-9a-f]+$/i, /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/],
    "background-color": [
      /^#(0x)?[0-9a-f]+$/i,
      /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/,
    ],
    "text-align": [/^left$/, /^right$/, /^center$/],
    "font-size": [/^\d+(?:px|em|%)$/],
  },
};

export const EMAIL_HTML_TEMPLATE = `
<!DOCTYPE html>
  <html>
    <head>
      <base target="_blank" />
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <style>
        body {
          margin: 0;
          padding: 16px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
          line-height: 1.5;
          height: fit-content;
        }
        .auto-details summary::marker {
           content: "...";
           cursor: pointer;
        }
      </style>
    </head>
    <body>

    </body>
  </html>`;
