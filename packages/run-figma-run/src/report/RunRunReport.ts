import { Suite } from '../Suite';

export enum TestStatus {
  PASSED = 'passed',
  FAILED = 'failed',
  SKIPPED = 'skipped',
  PENDING = 'pending',
}

/**
 * Represents the statistics generated by a test suite.
 */
export type Stats = {
  /** The total number of test suites. */
  suites: number;

  /**
   * Totalizations of tests by statuses and more.
   */
  tests: {
    /** The total number of tests registered. */
    registered: number;
    /** The total number of tests registered. */
    executed: number;
    /** The number of tests that passed. */
    passed: number;
    /** The number of tests that are pending. */
    pending: number;
    /** The number of tests that failed. */
    failed: number;
    /** The number of skipped tests. */
    skipped: number;
  };

  /** The percentage of tests that passed. */
  passPercent: number;
  /** The percentage of tests that are pending. */
  executedPercent: number;
  /** The start date and time of the test suite execution. Will be null if not yet run. */
  start: Date | null;
  /** The end date and time of the test suite execution. Will be null if not yet run. */
  end: Date | null;
  /** The duration of the test suite execution in milliseconds. Will be null if not yet run. */
  duration: number | null;
};

export enum FailureType {
  ASSERTION,
  EXCEPTION,
}

export type TestResult = {
  title: string;
  status: TestStatus;
  failure: null | {
    type: FailureType;
    message: string;
    expected: unknown | null;
    actual: unknown | null;
  };
  /** The start date and time of the test suite execution. Will be null if not yet run. */
  start: number | null;
  /** The end date and time of the test suite execution. Will be null if not yet run. */
  end: number | null;
  /** The duration of the test suite execution in milliseconds. Will be null if not yet run. */
  duration: number | null;
};

export type SuiteResult = {
  suites: SuiteResult[];
  tests: TestResult[];
  stats: Stats;
  isRoot: false;
};

export type RunRunReport = Omit<SuiteResult, 'isRoot'> & {
  isRoot: true;
};

export function createEmptyTestResult(title: string = ''): TestResult {
  return {
    title,
    status: TestStatus.PENDING,
    failure: null,
    start: null,
    end: null,
    duration: null,
  };
}

/**
 * createSuiteResult returns an object that represents the results BEFORE any test was ran. *
 */
export function createEmptySuiteResult(suite: Suite): SuiteResult {
  const testsTotal =
    suite.tests.length +
    suite.suites.reduce<number>(
      (acc: number, child) => acc + child.tests.length,
      0
    );

  return {
    isRoot: false,
    suites: [],
    tests: [],
    stats: {
      suites: suite.suites.length,
      tests: {
        registered: testsTotal,
        pending: testsTotal,
        executed: 0,
        passed: 0,
        failed: 0,
        skipped: 0,
      },
      passPercent: 0,
      executedPercent: 0,
      start: null,
      end: null,
      duration: 0,
    },
  };
}

// export interface SuiteResult {
//   failures: number;
//   successes: number;
//   skips: number;
//   suiteResults: SuiteResult[];
//   testResults: TestResult[];
// }
