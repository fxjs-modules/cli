const test = require('test')
test.setup()

const { CliCommand } = require('../../lib/Command')
const getCli = require('../../lib')

describe('CliCommand', () => {
	function commonAssert(cmd, assertObj) {
		assert.propertyVal(cmd, 'name', assertObj.name)
		assert.propertyVal(cmd, 'raw', assertObj.raw)
		assert.propertyVal(cmd, 'description', assertObj.description)
	}

	describe('top-command', () => {
		let cli;
		before(() => {
			cli = getCli('test')
		});

		it('basic', () => {
			cli.topLevelCommand.option('--foo', 'Foo option')
				.action((entry, otherFiles, options) => {
					console.log(entry)
					console.log(otherFiles)
					console.log(options)
				})

			assert.propertyVal(cli.topLevelCommand, 'name', '@@global@@')
			assert.propertyVal(cli.topLevelCommand, 'raw', '@@global@@')
			assert.propertyVal(cli.topLevelCommand, 'description', '')
		})

		it(`#parse: top level command`, () => {
			cli.topLevelCommand
				.option('--out [out]', 'out option', {
				})
				.option('--bool-opt', 'bool-opt option', {
				})
				.option('--no-boolean-opt', 'neg-opt option', {
				})
				.action((entry, otherFiles, options) => {
					console.log(entry)
					console.log(otherFiles)
					console.log(options)
				})

			var parsed = cli.parse([cli.name, '', './src', '--out', 'abc'], { run: false });

			assert.deepEqual(parsed, {
				"args": [
					"./src"
				],
				"options": {
					"--": [],
					'boolean-opt': true,
					"out": "abc"
				}
			})

			var parsed = cli.parse([cli.name, '', './src', '--out', 'abc', '--bool-opt', '--no-boolean-opt'], { run: false });

			assert.deepEqual(parsed, {
				"args": [
					"./src"
				],
				"options": {
					"--": [],
					"boolean-opt": true,
					"out": "abc",
					"boolOpt": true,
					"booleanOpt": false
				}
			})
		});

		it(`#parse: empty name command`, () => {
			cli.command('[...files]')
				.option('--out [out]', 'out option', {
				})
				.action((entry, otherFiles, options) => {
					console.log(entry)
					console.log(otherFiles)
					console.log(options)
				})

			const parsed = cli.parse([cli.name, '', './src', '--out', 'abc'], { run: false });

			assert.deepEqual(parsed, {
				"args": [
					"./src"
				],
				"options": {
					"--": [],
					// affected by tolLevelCommand, consider to remove it
					"boolean-opt": true,
					"out": "abc"
				}
			});
		});
	})

	describe('sub-command', () => {
		let cli;
		before(() => {
			cli = getCli('test')
		});

		it('generate', () => {
			const cmd = new CliCommand('test', 'Test sub command')

			cmd.option('--foo', 'Foo option')
				.action((entry, otherFiles, options) => {
					console.log(entry)
					console.log(otherFiles)
					console.log(options)
				})

			commonAssert(cmd, {
				name: 'test',
				raw: 'test',
				description: 'Test sub command'
			})
		});

		it(`#parse: boolean type option`, () => {
			cli.command('abc [...files]')
				.option('--should-out', 'should out option', {
				})
				.action((entry, otherFiles, options) => {
					console.log(entry)
					console.log(otherFiles)
					console.log(options)
				})

			const parsed = cli.parse([cli.name, 'abc', './src', '--should-out'], { run: false });

			assert.deepEqual(parsed, {
				"args": [
					"./src"
				],
				"options": {
					"--": [],
					"shouldOut": true
				}
			});
		});

		it(`#parse: string type option`, () => {
			cli.command('abc [...files]')
				.option('--out [out]', 'out option', {
				})
				.action((entry, otherFiles, options) => {
					console.log(entry)
					console.log(otherFiles)
					console.log(options)
				})

			const parsed = cli.parse([cli.name, 'abc', './src', '--out', 'abc'], { run: false });

			assert.deepEqual(parsed, {
				"args": [
					"./src"
				],
				"options": {
					"--": [],
					"out": "abc"
				}
			});
		});
	})
})

if (require.main === module)
	test.run(console.DEBUG)
