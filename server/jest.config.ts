import type { Config } from "@jest/types"

const config: Config.InitialOptions = {
  collectCoverage: true,
  coveragePathIgnorePatterns: [
    "node_modules",
    "test-config",
    "interfaces",
    "jestGlobalMocks.ts",
    ".module.ts",
    "<rootDir>/src/database/links/links.methods.ts",
    "<rootDir>/src/database/links/links.statics.ts",
    ".mock.ts",
  ],
  coverageReporters: ["html", "json", "lcov", "text"],
  extensionsToTreatAsEsm: [".ts"],
  globals: {
    "ts-jest": {
      useESM: true,
    },
  },
  moduleFileExtensions: ["ts", "js"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  testEnvironment: "node",
  testRegex: "/src/.*.spec.ts",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
}

export default config
