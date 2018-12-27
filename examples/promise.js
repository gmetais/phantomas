#!/usr/bin/env node

/**
 * Example script that uses phantomas npm module with promise pattern
 */
const phantomas = require('..');

console.log('phantomas v%s loaded from %s', phantomas.version, phantomas.path);

const promise = phantomas('http://google.is', {
	'analyze-css': true,
	'assert-requests': 1
});

console.log('Results: %s', promise);

// metrics metadata
console.log('Number of available metrics: %d', phantomas.metadata.metricsCount);

// handle the promise
promise.
	then(function(res) {
		console.log('Resolved: %s', res);
		/**
		console.log('Exit code: %d', res.code);
		console.log('Number of requests: %d', res.results.getMetric('requests'));
		console.log('Failed asserts: %j', res.results.getFailedAsserts());
		**/
	}).
	catch(function(res) {
		console.error(res);
		console.log('Error code #%d', res.code);
		process.exit(res.code);
	});

// events handling
promise.on('milestone', function(milestone) {
	console.log('Milestone reached: %s', milestone);
});

promise.on('recv', function(response) {
	console.log('Response #%d: %s %s [HTTP %d]', response.id, response.method, response.url, response.status);
});

// including the custom once emitted by phantomas modules
promise.on('domQuery', function(type, query) {
	console.log('DOM query by %s - "%s"', type, query);
});
