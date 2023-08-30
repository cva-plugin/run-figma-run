# Run, Figma, Run

## Project Specification

Write a test runner in typescript that has the following features:

- Tests can be grouped into suites
- Suites can contain other suites
- Each suite defines an execution context
- A suite execution context is isolated from other suites
- A suite execution context is inherited by child suits
- Assertions are NOT part of the runner. Libraries like Chai, Should, or Expect JS must be used
- In an execution context a call to the function `fail(message: string)` fails that test
- Failures and successes are recorded and totalized at each level
- The runner returns a hierarchical TestRunResult with the recorded data
- Suites and tests that have the same parent should run in parallel (by default) using web workers
- The following modifiers can be used when creating a suite:
  - sequence: runs child suites or tests in order
  - story: runs child suites or tests in order and stop at first failed test or suite

- The following modifiers are available for suites and tests:
  - skip: does not execute suite / test
  - timeout(number): overrides the default timeout
- The runner must differentiate between 'assertion' and 'exception' failures
- No exception should escape the runner and must instead be recorded as a failure of the suite or test where it was thrown
- A single test result must contain at least the properties: name, scope (the parent suite), outcome
- The failure information should contain the properties: expected, actual, context (object containing context variables except for the ones created by the runner)

- Modify tests and suites using decorators

  It run tests for the scopes in the config using web workers and, for each:

  - creates an execution scope with proxies for the `assert` and `fail` functions
  - use those proxies to record the results in the appropriate scope
  - recursively execute the scope, doing the same for each child scope
  - capture any exceptions so they do not bubble, save it to `scope.exception` and set `scope.failureType = 'exception'`
  - totalize how many tests where executed, successful, and failed
  - return a Promise of a TestRunResult

## Building

Run `nx build run-figma-run` to build the library.

## Running unit tests

Run `nx test run-figma-run` to execute the unit tests via [Jest](https://jestjs.io).
