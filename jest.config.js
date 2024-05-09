/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
      preset: 'ts-jest',
      testEnvironment: 'node',
      testTimeout: 15000,
      verbose: true,
      randomize: true,
      testMatch: [
            "**/?(*.)+(jest|test).ts"
      ],
};