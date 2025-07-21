import { useEffect, useState } from "react";
const DashboardStats = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/dashboard/")
      .then((res) => res.json())
      .then(setStats)
      .catch((err) => console.error("Error fetching dashboard stats:", err));
  }, []);

  if (!stats) return <p className="meta">📊 Loading dashboard stats...</p>;

  return (
    <div className="file-box">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>📊 Codebase Dashboard</h2>

      </div>

      <p className="meta"><strong>Total Files:</strong> {stats.total_files}</p>
      <p className="meta"><strong>Total Lines:</strong> {stats.total_lines}</p>
      <p className="meta"><strong>Total Classes:</strong> {stats.total_classes}</p>
      <p className="meta"><strong>Total Functions:</strong> {stats.total_functions}</p>

      <div className="meta" style={{ marginTop: "12px" }}>
        <strong>Languages:</strong>
        <ul>
          {Object.entries(stats.languages).map(([lang, count]) => (
            <li key={lang}>{lang}: {count} file(s)</li>
          ))}
        </ul>
      </div>

      <div className="meta" style={{ marginTop: "12px" }}>
        <strong>Top 5 Largest Files:</strong>
        <ul>
          {stats.largest_files.map((file, idx) => (
            <li key={idx}>
              {file.path} — {file.lines} lines
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default DashboardStats;


