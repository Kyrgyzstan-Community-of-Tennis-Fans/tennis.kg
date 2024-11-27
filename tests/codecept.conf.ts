exports.config = {
  output: "./output",
  helpers: {
    Puppeteer: {
      url: "http://localhost:5183",
      show: true,
      windowSize: "1200x900",
    },
  },
  include: {
    I: "./steps_file",
  },
  mocha: {},
  bootstrap: null,
  timeout: null,
  teardown: null,
  hooks: [],
  gherkin: {
    features: "./features/*.feature",
    steps: [
      "./step_definitions/carouselSteps.ts",
      "./step_definitions/steps.ts",
      "./step_definitions/usersSteps.ts",
      "./step_definitions/partnersSteps.ts",
      "./step_definitions/footersSteps.ts",
      "./step_definitions/categoriesSteps.ts",
      "./step_definitions/mainRatingsSteps.ts",
    ],
  },
  plugins: {
    screenshotOnFail: {
      enabled: true,
    },
    tryTo: {
      enabled: true,
    },
    retryFailedStep: {
      enabled: true,
    },
    retryTo: {
      enabled: true,
    },
    eachElement: {
      enabled: true,
    },
    pauseOnFail: {},
  },
  stepTimeout: 0,
  stepTimeoutOverride: [
    {
      pattern: "wait.*",
      timeout: 0,
    },
    {
      pattern: "amOnPage",
      timeout: 0,
    },
  ],
  tests: "./*_test.ts",
  name: "tests",
};
