module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx,vue,html}'],
    theme: {
        extend: {}
    },
    <% if (prompts.prefix) { %>
    prefix:  '<%= prompts.prefix %>',
    <% } %>
    plugins: [],
    corePlugins: {
        preflight: false
    }
}
