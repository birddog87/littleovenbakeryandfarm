#!/bin/bash

# Make sure postcss.config.mjs is deleted
rm -f postcss.config.mjs

# Make sure tailwind.config.ts is deleted
rm -f tailwind.config.ts

# Update About.tsx with correct hours
find . -name "About.tsx" -exec sed -i 's/Monday - Friday: 8AM - 5PM/Order anytime online/g' {} \;
find . -name "About.tsx" -exec sed -i 's/Saturday: 9AM - 3PM/Saturday: 9AM - 5PM/g' {} \;
find . -name "About.tsx" -exec sed -i 's/Sunday: Closed/Sunday: 9AM - 5PM/g' {} \;

# Commit and push all changes
git add .
git commit -m "Enhance legal pages with modern design, fix navigation bar, update business hours"
git push origin main
