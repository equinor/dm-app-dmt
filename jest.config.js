module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: false,
  collectCoverageFrom: ['**/*.{js,ts,tsx}'],
  transformIgnorePatterns: ['node_modules/@development-framework'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testMatch: [
    'src/**/__tests__/**/*.{js,jsx,ts,tsx}',
    'src/**/?(*.)(spec|test).{js,jsx,ts,tsx}',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'node'],
  coverageDirectory: 'coverage/',
  verbose: true,
  coverageThreshold: {
    global: {
      branches: 10,
      functions: 15,
      lines: 15,
      statements: 15,
    },
  },
  coverageReporters: ['json-summary', 'text', 'lcov'],
}
