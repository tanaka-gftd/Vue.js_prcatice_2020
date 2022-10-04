import Vue from 'vue';

/* どのコンポーネントからも呼び出せるよう、独立させて別ファイルにしておく*/

Vue.filter('number_format', function(val) {
    return val.toLocaleString();
});