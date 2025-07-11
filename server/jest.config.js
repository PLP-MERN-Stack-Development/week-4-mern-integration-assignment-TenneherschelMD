export default {
  testEnvironment: 'node',
  collectCoverage: true,
  collectCoverageFrom: [
    'controllers/**/*.js',
    'routes/**/*.js',
    'models/**/*.js',
    '!**/node_modules/**',
    '!**/server.js',
    '!**/app.js'
  ]
};
