const test = require('test')
test.setup()

const { CliCommand } = require('../../lib/Command')

describe('CliCommand', () => {
    function commonAssert (cmd, assertObj) {
        assert.propertyVal(cmd, 'name', assertObj.name)
        assert.propertyVal(cmd, 'raw', assertObj.raw)
        assert.propertyVal(cmd, 'description', assertObj.description)
    }

    it('basic', () => {
        const cmd = new CliCommand('test', 'Test Program')

        cmd.option('--foo', 'Foo option')
            .action((entry, otherFiles, options) => {
                console.log(entry)
                console.log(otherFiles)
                console.log(options)
            })

        commonAssert(cmd, {
            name: 'test',
            raw: 'test',
            description: 'Test Program'
        })
    })
})

if (require.main === module)
    test.run(console.DEBUG)
