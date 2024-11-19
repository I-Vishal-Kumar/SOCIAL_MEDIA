/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom', // For DOM testing
  moduleNameMapper: {
    '^@/(.*)$': "<rootDir>/src/$1", // Adjust this if you use path aliases in tsconfig.json
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  transformIgnorePatterns: [
    "/node_modules/(?!graphql-request)/", // Exclude graphql-request from transformation ignore
  ],
  setupFilesAfterEnv: ['./jest.setup.ts'], // Custom setup for Jest
};
