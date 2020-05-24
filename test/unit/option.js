const test = require('test')
test.setup()

const CliOption = require('../../lib/Option')

describe('CliOption', () => {
    let option = null

    it('simple', () => {
        option = new CliOption('--foo', 'Foo options')

        assert.deepEqual(option, {
            name: 'foo',
            names: [ 'foo' ],
            raw: '--foo',
            description: 'Foo options',

            negative: false,
            isBoolean: true,
            config: {}
        })
    })

    it('not required', () => {
        option = new CliOption('--scale [level]', 'Scaling level')

        assert.deepEqual(option, {
            name: 'scale',
            names: [ 'scale' ],
            raw: '--scale [level]',
            description: 'Scaling level',

            negative: false,
            required: false,
            config: {}
        })
    })

    it('required', () => {
        option = new CliOption('--out <dir>', 'Output directory')

        assert.deepEqual(option, {
            name: 'out',
            names: [ 'out' ],
            raw: '--out <dir>',
            description: 'Output directory',

            negative: false,
            required: true,
            config: {}
        })
    })

    it('negative', () => {
        option = new CliOption('--no-config', 'Disable config file')

        assert.deepEqual(option, {
            name: 'config',
            names: [ 'config' ],
            raw: '--no-config',
            description: 'Disable config file',

            negative: true,
            isBoolean: true,
            // required: false,
            config: { default: true }
        })
    })
})

if (require.main === module)
    test.run(console.DEBUG)
