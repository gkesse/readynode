import re
import sys

msg_file = sys.argv[1]

with open(msg_file, encoding="utf-8") as f:
    message = f.read().strip()

pattern = (
    r"^(feat|fix|docs|style|refactor|perf|test|build|ci|chore)"
    r"\([a-z0-9-]+\): .+$"
)

if not re.fullmatch(pattern, message):
    print(
        "\n[ERROR] Message de commit invalide.\n\n"
        "Format obligatoire :\n"
        "  type(scope): description\n\n"
        "Exemples :\n"
        "  feat(auth): ajout connexion\n"
        "  fix(home): correction navigation\n"
        "  chore(ci): configuration pre-commit\n"
    )
    sys.exit(1)

sys.exit(0)
