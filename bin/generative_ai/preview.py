"""Build a local preview with the globally installed Windows Jekyll runtime."""
import argparse
from pathlib import Path
import subprocess

import yaml

REPO = Path(__file__).resolve().parents[2]


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--output", required=True)
    args = parser.parse_args()
    output = Path(args.output).resolve()
    output.parent.mkdir(parents=True, exist_ok=True)
    config = yaml.safe_load((REPO / "_config.yml").read_text(encoding="utf-8"))
    config["imagemagick"]["enabled"] = True
    config["imagemagick"]["input_directories"] = []
    config["exclude"] = config.get("exclude", []) + ["assets/jupyter/"]
    override = output.parent / "preview_config.yml"
    override.write_text(yaml.safe_dump(config, allow_unicode=True), encoding="utf-8")
    log = output.parent / "jekyll_build.log"
    command = ["C:/Ruby34-x64/bin/ruby.exe", "-e", "ENV['JEKYLL_NO_BUNDLER_REQUIRE']='true'; load Gem.bin_path('jekyll','jekyll')", "--", "build", "--trace", "--config", str(override), "--destination", str(output)]
    with log.open("w", encoding="utf-8") as stream:
        result = subprocess.run(command, cwd=REPO, stdout=stream, stderr=subprocess.STDOUT)
    print("Jekyll exit:", result.returncode, "log:", log)
    if result.returncode:
        print("\n".join(log.read_text(encoding="utf-8", errors="replace").splitlines()[-35:]))
    raise SystemExit(result.returncode)


if __name__ == "__main__":
    main()
