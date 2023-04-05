echo "Swithicng to branch master"
git checkout master

echo "Building app..."
npm run build

echo "Deploying files to server"
scp -r build/* mehedi@159.65.169.254:/var/www/support-data.efoli.com/

echo "Done deploy !!!"