# Navigate to project directory
cd "d:/Games/Lunai Website/sana"

# Stage the changes
git add package.json package-lock.json netlify/functions/skin-analysis.js

# Commit with message
git commit -m "Fix Netlify Function: Replace fetch with axios for Node.js compatibility"

# Push to GitHub
git push origin main

# If push fails, try this instead:
# git push -u origin main
