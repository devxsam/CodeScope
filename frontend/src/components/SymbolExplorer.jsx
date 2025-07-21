const SymbolExplorer = ({ activeFile, structure }) => {
  if (!structure) return <div style={{ padding: "16px", color: "#999" }}>No file selected</div>;

  const { classes = [], functions = [] } = structure;

  if (classes.length === 0 && functions.length === 0) {
    return <div style={{ padding: "16px", color: "#999" }}>No symbols found</div>;
  }

  const scrollToSymbol = (name) => {
    const el = document.getElementById(name);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      const originalBg = el.style.backgroundColor;
      el.style.backgroundColor = "#444";
      setTimeout(() => {
        el.style.backgroundColor = originalBg || "transparent";
      }, 1200);
    }
  };

  return (
    <div
      style={{
        width: "20%",
        backgroundColor: "#1e1e1e",
        padding: "16px",
        borderLeft: "2px solid #f472b6",
        overflowY: "auto",
        maxHeight: "500px",
        minHeight: "200px",
        color: "#ccc",
      }}
    >
      <h3 style={{ color: "#ab7df6", fontWeight: "bold", marginBottom: "12px" }}>🧠 Symbols</h3>

      {classes.length > 0 && (
        <>
          <h4 style={{ color: "#f472b6", fontWeight: "bold" }}>Classes</h4>
          <ul>
            {classes.map((cls) => (
              <li
                key={cls}
                onClick={() => scrollToSymbol(cls)}
                style={{ cursor: "pointer", color: "#ccc", marginBottom: "4px" }}
                tabIndex={0}
                onKeyPress={(e) => {
                  if (e.key === "Enter") scrollToSymbol(cls);
                }}
              >
                • {cls}
              </li>
            ))}
          </ul>
        </>
      )}

      {functions.length > 0 && (
        <>
          <h4 style={{ color: "#34d399", fontWeight: "bold", marginTop: "16px" }}>Functions</h4>
          <ul>
            {functions.map((fn) => (
              <li
                key={fn}
                onClick={() => scrollToSymbol(fn)}
                style={{ cursor: "pointer", color: "#ccc", marginBottom: "4px" }}
                tabIndex={0}
                onKeyPress={(e) => {
                  if (e.key === "Enter") scrollToSymbol(fn);
                }}
              >
                • {fn}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default SymbolExplorer;
