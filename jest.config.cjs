// jest.config.js

module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    testMatch: ['**/*.test.ts'],
    transform: {
      '^.+\\.(j|t)sx?$': [
        'ts-jest', {
          isolatedModules: true
        }
      ]
    }
}
