import { useState, useEffect } from "react";
import FileTree from "./components/FileTree";
import { buildTree } from "./utils/buildTree";
import CodeViewer from "./components/CodeViewer";
import SymbolExplorer from "./components/SymbolExplorer";
import DashboardStats from "./components/DashboardStats";

function App() {
  const [files, setFiles] = useState([]);
  const [tree, setTree] = useState(null);
  const [activeFile, setActiveFile] = useState(null);
  const [fileContent, setFileContent] = useState("");
  const [parsedFiles, setParsedFiles] = useState([]);
  const [dashboardStats, setDashboardStats] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(true);  // 🆕 for toggle

  // Theme toggle handler
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Fetch dashboard stats from backend
  const fetchDashboardStats = async () => {
    const res = await fetch("http://127.0.0.1:8000/dashboard/");
    const data = await res.json();
    setDashboardStats(data);
  };

  useEffect(() => {
    fetchDashboardStats();
  }, [parsedFiles]);

  const handleFileUpload = async (e) => {
    const fileList = Array.from(e.target.files);
    setFiles(fileList);

    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append("files", file, file.webkitRelativePath);
    });

    const res = await fetch("http://127.0.0.1:8000/analyze/", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setParsedFiles(data.files);
    const fileTree = buildTree(fileList);
    setTree(fileTree);

    if (data.files.length > 0) {
      setActiveFile(data.files[0].filename);
      setFileContent(data.files[0].content);
    }
  };

  const handleFileClick = (name, content) => {
    setActiveFile(name);
    setFileContent(content);
  };

  return (
    <div className={`app-container ${isDarkMode ? "dark" : "light"}`}>
      <aside className="sidebar">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h1 className="header">📦 CodeScope</h1>

          <button
            onClick={toggleTheme}
            style={{
              padding: "4px 10px",
              fontSize: "12px",
              borderRadius: "20px",
              backgroundColor: "#ab7df6",
              color: "white",
              border: "none",
              cursor: "pointer"
            }}
          >
            {isDarkMode ? "Light" : "Dark"} Mode
          </button>
        </div>

        <label className="upload">
          <span>Upload your codebase:</span>
          <input
            type="file"
            webkitdirectory="true"
            directory="true"
            multiple
            onChange={handleFileUpload}
          />
        </label>

        {tree && <FileTree tree={tree} onFileClick={handleFileClick} />}
      </aside>


      <div className="viewer" style={{ display: "flex", width: "75%" }}>
        <main style={{ width: "80%", paddingRight: "20px" }}>
          {dashboardStats && <DashboardStats stats={dashboardStats} />}

          {parsedFiles.length > 0 ? (
            parsedFiles.map((file) => (
              <div key={file.filename} className="file-box" style={{ marginBottom: "2rem" }}>
                <h2>{file.filename}</h2>
                <p className="meta">
                  <strong>Size:</strong> {file.size} bytes &nbsp;|&nbsp;
                  <strong>Language:</strong> {file.language}
                </p>

                {(file.structure?.classes?.length > 0 || file.structure?.functions?.length > 0) && (
                  <div className="meta">
                    {file.structure.classes.length > 0 && (
                      <p>
                        <strong>Classes:</strong>{" "}
                        {file.structure.classes.map((cls) => (
                          <span key={cls} id={cls}>{cls}, </span>
                        ))}
                      </p>
                    )}
                    {file.structure.functions.length > 0 && (
                      <p>
                        <strong>Functions:</strong>{" "}
                        {file.structure.functions.map((fn) => (
                          <span key={fn} id={fn}>{fn}, </span>
                        ))}
                      </p>
                    )}
                  </div>
                )}

                <CodeViewer
                  content={file.content}
                  filename={file.filename}
                  structure={file.structure}
                />
              </div>
            ))
          ) : (
            <p className="meta">Upload a folder to begin exploring your codebase.</p>
          )}
        </main>

        <SymbolExplorer
          activeFile={activeFile}
          structure={parsedFiles.find((f) => f.filename.endsWith(activeFile))?.structure}
        />

      </div>
    </div>
  );
}

export default App;
