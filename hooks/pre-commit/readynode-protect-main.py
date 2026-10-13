import subprocess
import sys

branch = (
    subprocess.check_output(
        ["git", "branch", "--show-current"],
        text=True
    )
    .strip()
)

if branch == "main":
    print(
        "\n[ERROR] Les commits directs sur la branche 'main' sont interdits.\n"
        "Creez une branche de travail, par exemple :\n\n"
        "  git checkout -b feature/ma-feature\n"
    )

    sys.exit(1)

sys.exit(0)
