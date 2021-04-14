mv docs/note tmp/
rm -rf docs
npm run build
mv ./blog/.vuepress/dist ./docs #部署路径
mv tmp docs/note

git add .
git commit -m "deploy:blog"
git push origin master

