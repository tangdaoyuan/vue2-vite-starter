#!/bin/sh
if [ ! -d ".husky" ] && [ -d ".git" ]; then
  npx husky install
  npx husky add .husky/pre-commit "npx lint-staged"
  npx husky add .husky/commit-msg "npx --no-install commitlint --edit "$1""
fi
