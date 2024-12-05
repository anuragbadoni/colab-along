import "codemirror/lib/codemirror.css"; 
import "codemirror/theme/monokai.css";

import React from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/monokai.css";

const CodeEditor = ({ code, onCodeChange }) => {
  return (
    <CodeMirror
      value={code}
      options={{
        mode: "javascript",
        lineNumbers: true,
        theme: "monokai",
      }}
      onBeforeChange={(editor, data, value) => onCodeChange(value)}
    />
  );
};

export default CodeEditor;
