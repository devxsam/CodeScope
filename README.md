title: "🧠 CodeScope"
tagline: "Offline Codebase Analyzer with Symbol Explorer and Visual Dashboard"

about: |
  CodeScope is a lightweight offline tool that lets you explore and analyze your codebase visually — no cloud, no clutter.
  It detects file types, counts lines of code, identifies programming languages, and provides a symbol navigator and dashboard, all in a clean frontend.

project_structure: |
  CodeScope/
  ├── frontend/
  │   ├── public/
  │   └── src/
  │       ├── App.jsx
  │       ├── components/
  │       └── index.css
  ├── backend/
  │   ├── main.py
  │   ├── analyzer.py
  │   ├── utils.py
  ├── requirements.txt
  └── README.md

features:
  - "📁 Recursive folder scan with file type detection"
  - "📊 Dashboard panel with:"
  - "  - Total files, lines of code, and language breakdown"
  - "  - Visual pie/bar charts"
  - "🧠 Symbol explorer (functions, classes, variables)"
  - "🔍 Search and filter across file tree"
  - "🌙 Dark/light mode toggle"
  - "⚙️ Built to work fully offline"

tech_stack:
  Frontend: "React (Vite), Tailwind CSS"
  Backend: "FastAPI, Python"
  Charts: "Recharts.js"
  Parsing: "Custom code analysis utils (Python)"
  Other: "Git, HTML/CSS/JS, Google Colab"

getting_started:
  clone: |
    git clone https://github.com/devxsam/CodeScope.git
    cd CodeScope
  backend: |
    cd backend
    pip install -r requirements.txt
    uvicorn main:app --reload
  frontend: |
    cd frontend
    npm install
    npm run dev

disclaimer: |
  Some core logic may be omitted from the public version to preserve original implementation details.

license: "MIT License (or your preferred license)"

notes: "GitHub README for CodeScope"
