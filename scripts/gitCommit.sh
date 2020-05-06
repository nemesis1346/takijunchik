#!/bin/bash -e

cd ..
git add .
git commit -m "deploy sh" --no-verify
git push --no-verify 