import Prism from "prismjs";
import { useEffect } from "react";

import "prismjs/components/prism-python";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-css";
import "prismjs/components/prism-markup";

import "prismjs/components/prism-c";       // ✅ Required for C++
import "prismjs/components/prism-cpp";     // ✅ C++ language support
import "prismjs/components/prism-java";    // ✅ Java support


function getLanguage(filename) {
  const ext = filename.split(".").pop();
  const map = {
    js: "javascript",
    jsx: "jsx",
    py: "python",
    html: "html",
    css: "css",
    txt: "markup",
    java: "java",
    cpp: "cpp",
    c: "c",
  };
  return map[ext] || "markup";
}

function sanitizeId(text) {
  return text.replace(/[\/\.]/g, "_");
}

function addSymbolAnchors(content, structure, prefix = "") {
  if (!structure) return content;

  let result = content;

  if (structure.classes) {
    structure.classes.forEach((cls) => {
      const regex = new RegExp(`(class\\s+)${cls}(\\b)`, "g");
      result = result.replace(
        regex,
        `$1<span id="${prefix}${cls}">${cls}</span>$2`
      );
    });
  }

  if (structure.functions) {
    structure.functions.forEach((fn) => {
      const regex = new RegExp(`(\\b${fn})\\s*\\(`, "g");
      result = result.replace(
        regex,
        `<span id="${prefix}${fn}">$1</span>(`
      );
    });
  }


  return result;
}


const CodeViewer = ({ content, filename, structure }) => {
  const language = getLanguage(filename);
  const prefix = sanitizeId(filename) + "-";

  useEffect(() => {
    Prism.highlightAll();
  }, [content, structure]);

  const withAnchors = addSymbolAnchors(content, structure, prefix);

  return (
    <pre className="bg-black text-sm p-4 rounded overflow-auto leading-relaxed max-h-[500px]">
      <code
        className={`language-${language}`}
        dangerouslySetInnerHTML={{
          __html: Prism.highlight(
            withAnchors,
            Prism.languages[language] || Prism.languages.markup,
            language
          ),
        }}
      />
    </pre>
  );
};

export default CodeViewer;
