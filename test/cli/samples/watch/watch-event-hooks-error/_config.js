const { assertIncludes } = require('../../../../testHelpers.js');

module.exports = defineTest({
	description: 'onError event hook shell commands write to stderr',
	spawnScript: 'wrapper.js',
	spawnArgs: ['-cw', '--watch.onError', 'echo error'],
	abortOnStderr(data) {
		if (data.includes('waiting for changes')) {
			return true;
		}
	},
	stderr(stderr) {
		assertIncludes(
			stderr,
			`watch.onError $ echo error
error`
		);
	}
});
