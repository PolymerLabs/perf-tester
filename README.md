# perf-tester
An element to help performance test other elements.

## How to use

The perf-tester element accepts an array of `tests` which are html files containing perf tests to run. A simple "runner.html" as is shown in `/demo` can be created to display output.

Each test file should load `perf.js` and call `console.perf()` to start the test and `console.perfEnd()` to finish it.