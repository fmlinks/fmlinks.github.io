"""Verify published routes and byte-identical release assets after Pages succeeds."""
import argparse
import hashlib
import json
from pathlib import Path
import time

from bs4 import BeautifulSoup
import requests

ROOT = Path(__file__).resolve().parents[2]


def normalized(data, suffix):
    return data.replace(b"\r\n", b"\n") if suffix in {".js", ".css", ".json", ".svg"} else data


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--base", default="https://fmlinks.github.io")
    parser.add_argument("--output", required=True)
    args = parser.parse_args()
    session = requests.Session()
    session.headers["User-Agent"] = "GenerativeAI-Library-Deployment-Verification/1.0"
    receipt = {"status": "running", "base": args.base, "routes": {}, "assets": {}}
    for path in ["/library/", "/library/generative-ai/", "/library/generative-ai/zh/"]:
        response = session.get(args.base + path, timeout=30)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, "html.parser")
        if path == "/library/":
            assert soup.select_one('a[href="/library/generative-ai/"]')
        else:
            assert len(soup.select("[data-prose]")) == 87
            assert len(soup.select(".source-figure")) == 38
            assert len(soup.select(".table-wrap table")) == 4
            assert len(soup.select(".timeline-buttons button")) == 540
        receipt["routes"][path] = {"status": response.status_code, "html_lang": soup.html.get("lang")}
    for file in sorted((ROOT / "assets/generative-ai").rglob("*")):
        if not file.is_file():
            continue
        path = file.relative_to(ROOT).as_posix()
        response = session.get(args.base + "/" + path, timeout=40)
        response.raise_for_status()
        expected = hashlib.sha256(normalized(file.read_bytes(), file.suffix)).hexdigest()
        actual = hashlib.sha256(normalized(response.content, file.suffix)).hexdigest()
        assert expected == actual, (path, expected, actual)
        receipt["assets"][path] = {"http": response.status_code, "sha256": actual, "bytes": len(response.content)}
        time.sleep(.08)
    receipt["status"] = "passed"
    Path(args.output).write_text(json.dumps(receipt, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps({"status": "passed", "routes": receipt["routes"], "verified_release_assets": len(receipt["assets"])}, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
