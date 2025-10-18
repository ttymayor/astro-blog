"use client";

import { useState } from "react";

const errorCodesMap = {
  404: "Page Not Found",
  405: "Method Not Allowed",
  406: "Not Acceptable",
  407: "Proxy Authentication Required",
  408: "Request Timeout",
  409: "Conflict",
  410: "Gone",
  411: "Length Required",
  412: "Precondition Failed",
  413: "Payload Too Large",
  414: "URI Too Long",
  415: "Unsupported Media Type",
  416: "Range Not Satisfiable",
  417: "Expectation Failed",
  418: "I'm a teapot",
  422: "Unprocessable Entity",
  423: "Locked",
  424: "Failed Dependency",
  425: "Too Early",
  426: "Upgrade Required",
  428: "Precondition Required",
  429: "Too Many Requests",
  431: "Request Header Fields Too Large",
  451: "Unavailable For Legal Reasons",
  500: "Internal Server Error",
  501: "Not Implemented",
  502: "Bad Gateway",
  503: "Service Unavailable",
  504: "Gateway Timeout",
  505: "HTTP Version Not Supported",
  506: "Variant Also Negotiates",
  507: "Insufficient Storage",
  508: "Loop Detected",
  510: "Not Extended",
  511: "Network Authentication Required",
} as const satisfies Record<number, string>;

export default function NotFound() {
  const [errorCode, setErrorCode] = useState(404);
  const [description, setDescription] = useState(
    "The page you are looking for does not exist.",
  );

  return (
    <div className="flex flex-col items-center justify-center select-none">
      <h1
        className="cursor-pointer text-2xl font-bold"
        onClick={() => setErrorCode(errorCode + 1)}
      >
        {errorCode} -{" "}
        {errorCodesMap[errorCode as keyof typeof errorCodesMap] ??
          "Unknown Error"}
      </h1>
      <p
        className="text-muted-foreground text-sm"
        onClick={() => setDescription("ㄉㄧㄢˇ ㄙㄢ ㄒㄧㄠˇ")}
      >
        {description}
      </p>
      <a href="/" className="text-primary hover:text-primary">
        Go back to the home page
      </a>
    </div>
  );
}
