const { execSync } = require('child_process');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  generateBuildId: async () => {
    try {
      // Run the Git command to get the latest commit hash
      const gitHash = execSync('git rev-parse HEAD').toString().trim();
      return gitHash;
    } catch (error) {
      console.error('Error fetching Git hash:', error.message);
      return 'fallbackHash'; // Fallback value in case of an error
    }
  },
}

module.exports = nextConfig
