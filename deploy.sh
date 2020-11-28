rm -rf docs
npm run build
mv ./blog/.vuepress/dist ./docs #部署路径
git add .
git commit -m "deploy"
git push origin master

