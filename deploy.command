#!/bin/bash
cd "$(dirname "$0")"
git add .
git commit -m "update"
git push
echo "✅ 배포 완료! 이 창 닫아도 됩니다."
