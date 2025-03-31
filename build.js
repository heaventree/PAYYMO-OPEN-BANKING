/**
 * Simple build script for Netlify deployment
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Log with timestamp
function log(message) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${message}`);
}

// Main build function
async function build() {
  log('Starting build process for Netlify deployment');
  
  // Check if flask_backend/static exists
  const staticDir = path.join(__dirname, 'flask_backend', 'static');
  if (!fs.existsSync(staticDir)) {
    log('Error: Static directory not found!');
    process.exit(1);
  }
  
  log(`Static directory found at ${staticDir}`);
  log('Checking for required static files...');
  
  // Check for index.html
  const indexPath = path.join(staticDir, 'index.html');
  if (!fs.existsSync(indexPath)) {
    log('Warning: index.html not found in static directory. Site may not work correctly.');
  } else {
    log('Found index.html');
  }
  
  // Check for CSS files
  const cssDir = path.join(staticDir, 'css');
  if (!fs.existsSync(cssDir)) {
    log('Creating CSS directory');
    fs.mkdirSync(cssDir, { recursive: true });
  }
  
  // Check for JS files
  const jsDir = path.join(staticDir, 'js');
  if (!fs.existsSync(jsDir)) {
    log('Creating JS directory');
    fs.mkdirSync(jsDir, { recursive: true });
  }
  
  // Create netlify.toml in the static directory for proper configuration
  const netlifyConfig = `
# This file is used by Netlify to configure your site
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
`;
  
  fs.writeFileSync(path.join(staticDir, 'netlify.toml'), netlifyConfig);
  log('Created netlify.toml in static directory');
  
  // Create a _redirects file for Netlify (alternative to netlify.toml)
  fs.writeFileSync(path.join(staticDir, '_redirects'), '/* /index.html 200');
  log('Created _redirects file for Netlify');

  log('Build process completed successfully');
}

// Run the build
build().catch(error => {
  console.error('Build failed:', error);
  process.exit(1);
}); 