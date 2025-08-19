#!/bin/bash

# قائمة بجميع ملفات HTML التي تحتاج إصلاح (عدا index.html و Technical.html)
files=(
    "Business.html"
    "Art & Entertainment.html" 
    "Education and culture.html"
    "General.html"
    "Health & Wellness.html"
    "News & Media.html"
    "Personal.html"
    "Science.html"
    "Self-development.html"
    "Social.html"
    "sports.html"
)

# إصلاح كل ملف
for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "Fixing $file..."
        
        # إزالة sign in من navigation وإصلاح الروابط
        sed -i 's|Main\.html|index.html|g' "$file"
        sed -i 's|<li><a href="sign in\.html">sign in</a></li>||g' "$file"
        sed -i 's|<div class="sign">||g' "$file"
        sed -i 's|</div></nav>|</nav>|g' "$file"
        
        # إصلاح navigation structure
        sed -i 's|<nav class="headeer navbar navbar-expand-lg bg-body-tertiary">|<nav class="headeer navbar navbar-expand-lg bg-body-tertiary"><ul class="navbar-nav">|g' "$file"
        sed -i 's|</nav>|</ul></nav>|g' "$file"
        
        # إضافة header tags
        sed -i 's|</head>|</head>|g' "$file"
        sed -i 's|<body>|<body><header>|g' "$file"
        sed -i 's|</nav>|</nav></header>|g' "$file"
        
        # إصلاح copyright
        sed -i 's|© 2020 Copyright:.*|© 2024 Podcasts Library - All Rights Reserved|g' "$file"
        
        echo "$file fixed!"
    else
        echo "File $file not found!"
    fi
done

echo "All files have been processed!"
