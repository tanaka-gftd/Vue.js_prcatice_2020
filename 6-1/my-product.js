/* 親コンポーネントから子コンポーネントへデータを渡す際は、属性を介してpropsオプションに渡す */

Vue.component('my-product', {
    template: '<li>{{id}} {{name}} {{price}}（円）</li>',
    props: ['id', 'name', 'price']
});