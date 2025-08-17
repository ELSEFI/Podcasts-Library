#!/bin/bash

# Function to update a single HTML file
update_html_file() {
    local file="$1"
    local category="$2"
    local arabic_title="$3"
    
    echo "Updating $file..."
    
    # Create a temporary file for the updated navbar
    cat > temp_navbar.html << 'EOF'
  <header>
    <nav class="navbar navbar-expand-lg bg-body-tertiary fixed-top navbar-fixed">
      <div class="container-fluid">
        <!-- Logo and Brand -->
        <a class="navbar-brand" href="index.html">
          <img src="image/_d1959416-a926-4cf5-ae6e-82a5c2d3802b.jpeg" alt="Logo" width="40" height="40" class="d-inline-block align-text-top">
          <span style="font-family: fantasy; margin-left: 10px;">Ur Podcasts</span>
        </a>

        <!-- Mobile toggle button -->
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Navigation items -->
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <a href="index.html" class="nav-link">Home</a>
            </li>
            <li class="nav-item">
              <a href="https://www.podcastinsights.com/what-is-a-podcast/" class="nav-link" target="_blank">
                What Is Podcast?
              </a>
            </li>
            <li class="nav-item">
              <a href="#wrapper" class="nav-link">Contact with us</a>
            </li>
          </ul>

          <!-- Language and Theme buttons on the right -->
          <div class="d-flex align-items-center">
            <div class="dropdown me-3">
              <button class="btn btn-outline-secondary dropdown-toggle" type="button" id="languageDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="fas fa-globe"></i> EN
              </button>
              <ul class="dropdown-menu" aria-labelledby="languageDropdown">
                <li><a class="dropdown-item" href="#" onclick="changeLanguage('en')">English</a></li>
                <li><a class="dropdown-item" href="#" onclick="changeLanguage('ar')">العربية</a></li>
              </ul>
            </div>
            
            <button class="btn btn-outline-secondary" type="button" id="themeToggle" onclick="toggleTheme()">
              <i class="fas fa-moon" id="themeIcon"></i>
            </button>
          </div>
        </div>
      </div>
    </nav>
  </header>
  
  <!-- Add padding to body to account for fixed navbar -->
  <div class="main-content">
EOF

    echo "File $file has been prepared for update."
}

# Categories mapping
declare -A categories=(
    ["Business.html"]="Business|الأعمال"
    ["Art & Entertainment.html"]="Art & Entertainment|الفن والترفيه"
    ["Science.html"]="Science|العلوم"
    ["sports.html"]="Sports|الرياضة"
    ["Health & Wellness.html"]="Health & Wellness|الصحة واللياقة"
    ["Personal.html"]="Personal|شخصي"
    ["Social.html"]="Social|اجتماعي"
    ["Self-development.html"]="Self-development|التطوير الذاتي"
    ["News & Media.html"]="News & Media|الأخبار والإعلام"
    ["Education and culture.html"]="Education and Culture|التعليم والثقافة"
    ["General.html"]="General|عام"
)

# Update each file
for file in "${!categories[@]}"; do
    if [ -f "$file" ]; then
        IFS='|' read -r english_title arabic_title <<< "${categories[$file]}"
        update_html_file "$file" "$english_title" "$arabic_title"
    else
        echo "File $file not found!"
    fi
done

echo "All navbar updates have been prepared!"
