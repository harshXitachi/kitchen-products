// This file is used as the entry point for Vercel deployment
try {
  // Import the compiled server module
  import('./dist/index.js').catch(error => {
    console.error('Error importing server module:', error);
    process.exit(1);
  });
} catch (error) {
  console.error('Unhandled error in vercel-server.js:', error);
  process.exit(1);
} 