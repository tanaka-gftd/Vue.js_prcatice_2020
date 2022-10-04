/* 子コンポーネントを定義する */

/* myComponentを定義している場所はグローバルスコープなので、親コンポーネントのスクリプトファイル(main.js)から参照できる */
var myComponent = {
    template: '<p>{{message}}</p>',
    data: function() {
        return {
            message: 'コンポーネントです。'
        }
    }
};