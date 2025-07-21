# 🧠 CodeScope

> **Offline Codebase Analyzer with Symbol Explorer and Visual Dashboard**

CodeScope is a lightweight offline tool that lets you explore and analyze your codebase visually — no cloud, no clutter.  
It detects file types, counts lines of code, identifies programming languages, and provides a symbol navigator and dashboard, all in a clean frontend.

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
│   ├── analyzer.py
│   ├── utils.py
├── requirements.txt
└── README.md
```


---

## 🚀 Features

- 📁 Recursive folder scan with file type detection
- 📊 Dashboard panel with:
  - Total files, lines of code, and language breakdown
  - Visual pie/bar charts
- 🧠 Symbol explorer (functions, classes, variables)
- 🔍 Search and filter across file tree
- 🌙 Dark/light mode toggle
- ⚙️ Built to work **fully offline**

---

## 🛠 Tech Stack

| Layer     | Tech                    |
|-----------|-------------------------|
| Frontend  | React (Vite), Tailwind CSS |
| Backend   | FastAPI, Python         |
| Charts    | Recharts.js             |
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

⚠️ Disclaimer
Some core logic may be omitted from the public version to preserve original implementation details.

📄 License
This project is licensed under the MIT License — you are free to use, modify, and distribute it with proper attribution.



