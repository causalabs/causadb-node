module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    roots: ["<rootDir>/src/"],
    testMatch: ['**/*.test.ts'],
    transform: {
      '^.+\\.(j|t)sx?$': [
        'ts-jest', {
          isolatedModules: true
        }
      ]
    }
}
