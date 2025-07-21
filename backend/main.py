from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from typing import List
import ast
import os
import re


from utils.dashboard_stats import scan_codebase_stats  # Your existing import

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

def extract_code_structure(code: str, ext: str):
    if ext == "py":
        try:
            tree = ast.parse(code)
            classes = [node.name for node in ast.walk(tree) if isinstance(node, ast.ClassDef)]
            functions = [node.name for node in ast.walk(tree) if isinstance(node, ast.FunctionDef)]
            return {"classes": classes, "functions": functions}
        except:
            return {"classes": [], "functions": []}

    elif ext in ["js", "ts"]:
        try:
            classes = re.findall(r'class\s+(\w+)', code)
            functions = re.findall(r'function\s+(\w+)', code)
            arrow_functions = re.findall(r'const\s+(\w+)\s*=\s*\(.*?\)\s*=>', code)
            functions.extend(arrow_functions)
            return {"classes": classes, "functions": functions}
        except:
            return {"classes": [], "functions": []}

    elif ext == "java":
        try:
            classes = re.findall(r'\bclass\s+(\w+)', code)
            functions = re.findall(
                r'(?:public|private|protected)?\s+(?:static\s+)?(?:[\w<>\[\]]+\s+)+(\w+)\s*\(.*?\)\s*\{',
                code)
            return {"classes": classes, "functions": functions}
        except:
            return {"classes": [], "functions": []}

    elif ext == "cpp":
        try:
            classes = re.findall(r'\bclass\s+(\w+)', code)
            functions = re.findall(
                r'(?:void|int|float|double|char|string|bool)\s+(\w+)\s*\(.*?\)\s*\{',
                code)
            return {"classes": classes, "functions": functions}
        except:
            return {"classes": [], "functions": []}

    return {"classes": [], "functions": []}


@app.post("/analyze/")
async def analyze_files(files: List[UploadFile] = File(...)):
    result = []
    for file in files:
        filepath = os.path.join(UPLOAD_DIR, file.filename)
        content = await file.read()
        # Save uploaded file to disk
        os.makedirs(os.path.dirname(filepath), exist_ok=True)
        with open(filepath, "wb") as f:
            f.write(content)

        try:
            decoded = content.decode("utf-8")
        except:
            decoded = "Binary or unreadable"

        ext = file.filename.split(".")[-1].lower()
        structure = extract_code_structure(decoded, ext)

        result.append({
            "filename": file.filename,
            "size": len(content),
            "language": ext,
            "content": decoded,
            "structure": structure
        })
    return {"files": result}



@app.get("/dashboard/")
def dashboard_view():
    return scan_codebase_stats(UPLOAD_DIR)
