//数値を通貨書式「#,###,###」に変換するフィルター

/* どのコンポーネントからも呼び出せるよう、独立させて別ファイルにしておく*/

Vue.filter('number_format', function(val) {
    return val.toLocaleString();
});