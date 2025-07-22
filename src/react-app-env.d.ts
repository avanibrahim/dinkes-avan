// src/react-app-env.d.ts
import React from "react";
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "a-scene": React.DetailedHTMLProps<any, any>;
      "a-marker": React.DetailedHTMLProps<any, any>;
      "a-entity": React.DetailedHTMLProps<any, any>;
      "a-box": React.DetailedHTMLProps<any, any>;
    }
  }
}
export {};
