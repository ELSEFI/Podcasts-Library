// Script to update pages with new navbar system
const pagesToUpdate = [
    'Business.html',
    'Science.html',
    'Social.html',
    'Education and culture.html',
    'Self-development.html',
    'sports.html',
    'News & Media.html',
    'Health & Wellness.html',
    'Art & Entertainment.html',
    'Personal.html',
    'General.html'
];

// Template for head section (excluding title)
const headTemplate = `  <link rel="stylesheet" href="css/bootstrap.min.css">
  <link rel="stylesheet" href="stylees.css">
  <link rel="stylesheet" href="navbar-styles.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
  <script src="navbar-loader.js"></script>
</head>

<body>
  <!-- Navbar will be loaded here by navbar-loader.js -->
  
  <!-- Main Content with proper spacing for fixed navbar -->
  <div class="main-content" style="margin-top: 80px;">
    <div class="container-fluid">`;

// Template for footer section
const footerTemplate = `    </div> <!-- End container-fluid -->
  </div> <!-- End main-content -->
  
  <script src="js/popper.min.js"></script>
  <script src="js/jquery-3.7.1.min.js"></script>
  <script src="js/bootstrap.js"></script>
</body>

</html>`;

console.log('Use this script as reference for updating pages with the new navbar system');
console.log('Head template:', headTemplate);
console.log('Footer template:', footerTemplate);
