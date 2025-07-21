# 🧠 CodeScope

> **Offline Codebase Analyzer with Symbol Explorer and Visual Dashboard**

CodeScope is a lightweight offline tool that lets you explore and analyze your codebase visually — no cloud, no clutter.  
It automatically detects file types, counts lines of code, identifies programming languages, and provides a symbol navigator and dashboard, all in a clean frontend.

---

## 📂 Project Structure


```text
CodeScope/
├── frontend/
│   ├── public/
│   └── src/
│       ├── App.jsx
│       ├── components/
│       └── index.css
├── backend/
│   ├── main.py
│   ├── utils.py
├── requirements.txt
└── README.md
```


---

## 🚀 Features

- 📁 Recursive folder upload with file type detection
- 📊 Dashboard panel with:
  - Total files and total lines of code
  - Language-wise file count
  - Top 5 largest files
  - Class/function counts for Python files
- 🧠 Symbol Explorer:
  - Detects **functions and classes** (Python, JS, Java, C++, etc.)
  - Click to jump to symbol in the code viewer
- 🧾 Code Viewer:
  - Shows file content with syntax highlighting (using Prism.js)
  - Auto-scroll and anchor links for symbols
- 🌙 Dark/Light Mode toggle
- ⚙️ Fully offline — no internet or server dependency required after setup

---

## 🛠 Tech Stack

| Layer     | Tech                    |
|-----------|-------------------------|
| Frontend  | React (Vite), Tailwind CSS |
| Backend   | FastAPI, Python         |
| Syntax Highlighting | Prism.js   |
| Parsing   | Custom code analysis utils (Python) |
| Other     | Git, HTML/CSS/JS, Google Colab |

---

## 🧪 Getting Started

> Install dependencies and run both backend and frontend servers locally.

### 1. Clone the repository

```bash
git clone https://github.com/devxsam/CodeScope.git
cd CodeScope
```

### 2. Backend Setup (FastAPI)

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

### 3. Frontend Setup (React)

```bash
cd frontend
npm install
npm run dev
```
---

🛠️ Upcoming: ZIP upload support, variable scopes, pie charts, live widgets, and AI assistant.

---

⚠️ Disclaimer
Some core logic may be omitted from the public version to preserve original implementation details.

📄 License
This project is licensed under the MIT License — you are free to use, modify, and distribute it with proper attribution.



