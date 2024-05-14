module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    roots: ["<rootDir>/e2e/"],
    testMatch: ['**/*.test.ts'],
    transform: {
      '^.+\\.(j|t)sx?$': [
        'ts-jest', {
          isolatedModules: true
        }
      ]
    }
}
