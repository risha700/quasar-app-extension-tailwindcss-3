module.exports = function () {
    return [
        {
            name: 'prefix',
            type: 'string',
            required: false,
            message: 'Tailwind Class Prefix. No prefix can result in overlapping classes with Quasar.',
            default: 'tw-',
        }
    ]
}
