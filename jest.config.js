module.exports = {
  collectCoverage: true,
  // on node 14.x coverage provider v8 offers good speed and more or less good report
  coverageProvider: "v8",
  collectCoverageFrom: [
    "**/*.{js,jsx,ts,tsx}",
    "!**/*.d.ts",
    "!**/node_modules/**",
    "!<rootDir>/src/out/**",
    "!<rootDir>/src/.next/**",
    "!<rootDir>/src/*.config.js",
    "!<rootDir>/src/coverage/**",
  ],
  moduleNameMapper: {
    // Handle CSS imports (with CSS modules)
    // https://jestjs.io/docs/webpack#mocking-css-modules
    "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",

    // Handle CSS imports (without CSS modules)
    "^.+\\.(css|sass|scss)$": "<rootDir>/src/__mocks__/styleMock.js",

    // Handle image imports
    // https://jestjs.io/docs/webpack#handling-static-assets
    "^.+\\.(png|jpg|jpeg|gif|webp|avif|ico|bmp|svg)$/i": `<rootDir>/src/__mocks__/fileMock.js`,

    // Handle module aliases
    "^@/components/(.*)$": "<rootDir>/src/components/$1",
    "^@/utils/(.*)$": "<rootDir>/src/utils/$1",
  },
  // Add more setup options before each test is run
  setupFilesAfterEnv: ["<rootDir>/src/utils/testUtils/setup.ts"],
  testPathIgnorePatterns: [
    "<rootDir>/src/node_modules/",
    "<rootDir>/src/.next/",
  ],
  testEnvironment: "jsdom",
  transform: {
    // Use babel-jest to transpile tests with the next/babel preset
    // https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object
    "^.+\\.(js|jsx|ts|tsx)$": ["babel-jest", { presets: ["next/babel"] }],
  },
  transformIgnorePatterns: [
    "/node_modules/",
    "^.+\\.module\\.(css|sass|scss)$",
  ],
};
