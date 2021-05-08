const test = require('test')
test.setup()

const io = require('io')
const path = require('path')
const uuid = require('uuid')

const cmd = process.execPath
const cwd = process.cwd()
const root = path.resolve(__dirname, '../../')

function textQuote(input) {
	return process.platform === 'win32' ? JSON.stringify(input) : input
}

function openProcess (cmd, args = []) {
	if (!process.open) {
		const child_process = require('child_process')
		const bs = child_process.spawn(
			cmd,
			args
		);

		var stdout = new io.BufferedStream(bs.stdout);

		return stdout
	}

	const sp = process.open(cmd, args);
	sp.wait();

	return sp.stdout;
}

describe('Examples', () => {
	before(() => {
		process.chdir(root)
	})

	after(() => {
		process.chdir(cwd)
	})

	const md5Value = uuid.md5(uuid.URL, Date.now()).hex()

	;[
		[
			'basic-usages',
			'./examples/basic-usages.js',
			['--type', 'fibjs'],
			`{\n  \"args\": [],\n  \"options\": {\n    \"--\": [],\n    \"type\": \"fibjs\"\n  }\n}`
		],
		[
			'ignore-default-value',
			'./examples/ignore-default-value.js',
			['--type'],
			`{\n  \"args\": [],\n  \"options\": {\n    \"--\": [],\n    \"type\": true\n  }\n}`
		],
		[
			'help',
			'./examples/help.js',
			['--help'],
			"help.js v0.0.0\n\nUsage:\n  $ help.js <command> [options]\n\nCommands:\n  lint [...files]  Lint files\n\nFor more info, run any command with the `--help` flag:\n  $ help.js lint --help\n\nOptions:\n  --type [type]  Choose a project type (default: fibjs)\n  --name <name>  Provide your name \n  -h, --help     Display this message \n  -v, --version  Display version number "
		],
		[
			'help',
			'./examples/help.js',
			['--version'],
			`help.js/0.0.0 ${require('../../lib/ctrl').PLATFORM_INFO}`
		],
		[
			'command-options',
			'./examples/command-options.js',
			['rm', './*', '-r'],
			`remove ./* recursively`,
		],
		[
			'command-options',
			'./examples/command-options.js',
			['rm', './foo.js', '-no-r'],
			`remove ./foo.js`,
		],
		[
			'dot-style-options',
			'./examples/dot-style-options.js',
			['build', '--env', 'envv'],
			`{\n  \"--\": [],\n  \"env\": \"envv\"\n}`
		],
		[
			'dot-style-options',
			'./examples/dot-style-options.js',
			[
				'build',
				'--env', 'envv',
				'--foo-bar', textQuote('foo-bar\'s value')
			],
			`{\n  \"--\": [],\n  \"env\": \"envv\",\n  \"fooBar\": \"foo-bar's value\"\n}`
		],
		[
			'dot-style-options',
			'./examples/dot-style-options.js',
			[
				'build',
				// it uncomment it, it ould overwrite `--env.API_SECRET` forward
				// '--env', 'envv',
				'--foo-bar', textQuote('foo-bar\'s value'),
				`--env.API_SECRET=${md5Value}`,
			],
			`{\n  \"--\": [],\n  \"fooBar\": \"foo-bar's value\",\n  \"env\": {\n    \"API_SECRET\": \"${md5Value}\"\n  }\n}`
		],
		[
			'dot-style-options',
			'./examples/dot-style-options.js',
			[
				'build',
				'--foo-bar', textQuote('foo-bar\'s value'),
				`--env.API_SECRET=${md5Value}`,
				'--env', 'envv',
			],
			`{\n  \"--\": [],\n  \"fooBar\": \"foo-bar's value\",\n  \"env\": \"envv\"\n}`
		],
		[
			'rest-arguments',
			'./examples/rest-arguments.js',
			[
				'build',
				`a.js b.js c.js`,
				'--foo', textQuote('foo\'s value')
			],
			// entry is `a.js b.js c.js`, no otherFiles
			process.platform === 'win32' ?
			`a.js\n[\n  \"b.js\",\n  \"c.js\",\n  \"foo's value\"\n]\n{\n  \"--\": [],\n  \"foo\": true\n}`
			: `a.js b.js c.js\n[\n  \"foo's value\"\n]\n{\n  \"--\": [],\n  \"foo\": true\n}`
		],
		[
			'rest-arguments',
			'./examples/rest-arguments.js',
			[
				'build',
				...(`a.js b.js c.js`.split(' ').map(x => textQuote(x))),
				'--foo', textQuote('foo\'s value'),
			],
			// entry is `a.js`, otherFiles is ['b.js', 'c.js']
			`a.js\n[\n  \"b.js\",\n  \"c.js\",\n  \"foo's value\"\n]\n{\n  \"--\": [],\n  \"foo\": true\n}`
		],
		[
			'help',
			'./examples/help.js',
			['--help'],
			``
		],
	].filter(x => x).forEach(([desc, fpath, argvs, result, isJson]) => {
		it(desc, () => {
			const stdout = openProcess(
				cmd,
				[fpath].concat(argvs)
			)
			// normalize EOL of stdout
			// sp.stdout.EOL = '\n'
			const output = stdout.readLines().join('\n')

			if (!isJson) {

				if (result)
					assert.equal(output, result)
				// else
				// 	console.log('output', output);
			} else {
				// const msg = new ws.Message()
				// msg.write(new Buffer(output))

				// console.log('output', output)
			}
		})
	})
})

if (require.main === module)
    test.run(console.DEBUG)
