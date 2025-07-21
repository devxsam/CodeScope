import os

def scan_codebase_stats(upload_dir: str):
    stats = {
        "total_files": 0,
        "total_lines": 0,
        "languages": {},
        "largest_files": [],
        "total_classes": 0,
        "total_functions": 0,
    }

    def is_text_file(filepath):
        try:
            with open(filepath, "r", encoding="utf-8") as f:
                f.read()
            return True
        except:
            return False

    for root, _, files in os.walk(upload_dir):
        for file in files:
            path = os.path.join(root, file)
            ext = file.split(".")[-1]
            stats["total_files"] += 1

            if ext not in stats["languages"]:
                stats["languages"][ext] = 0
            stats["languages"][ext] += 1

            try:
                with open(path, "r", encoding="utf-8") as f:
                    content = f.read()
                    lines = content.count("\n") + 1
                    stats["total_lines"] += lines

                    # Quick class/function count for .py files
                    if ext == "py":
                        stats["total_classes"] += content.count("class ")
                        stats["total_functions"] += content.count("def ")

                    # Track largest files
                    stats["largest_files"].append({
                        "filename": file,
                        "lines": lines,
                        "path": os.path.relpath(path, upload_dir)
                    })
            except:
                continue

    stats["largest_files"] = sorted(stats["largest_files"], key=lambda f: f["lines"], reverse=True)[:5]

    return stats
