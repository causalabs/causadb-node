module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    testMatch: ['**/*.test.ts'],
   testPathIgnorePatterns: ['<rootDir>/e2e/'],
      transform: {
      '^.+\\.(j|t)sx?$': [
        'ts-jest', {
          isolatedModules: true
        }
      ]
    }
}
