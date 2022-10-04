Vue.component('my-option', {
    template: '<option v-bind:value="id">{{name}} {{price}}（円）</option>',
    props: ['id', 'name', 'price']
});