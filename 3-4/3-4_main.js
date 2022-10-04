// 数値を通貨書式（３桁ごとにコンマを挿入）に変換するフィルター

//フィルターを有効にすると、Vueが読み込まれなくなり、エラーになってしまう
/*Vue.filter('number_format', function(val){
    return val.toLocaleString();
});
*/


var app = new Vue({
    
    //このコンポーネントのインスタンスを、HTMLのappクラスと結びつける
    el: '#app',

    //このコンポーネントが保持するデータを定義する
    data: {

        /* 商品リスト以外のデータには初期値を設定しておく */
        /* データの持たせ方は、数値、真偽値、配列、文字列など */

        //表示中の商品数
        /* 数値型の変数の初期値は、０が基本 */
        count: 0,

        //”セール対象”のチェック状態（true：チェック有り false：チェック無し）
        showSaleItem: false,

        //”送料無料”のチェック状態（true：チェック有り false：チェック無し）
        showDelvFree: false,

        //”並び替え”の選択値（１：標準、２：価格が安い順）
        sortOrder: 1,

        //商品リスト
        /*商品のデータをオブジェクト形式にまとめ、配列に詰め込んでおく */
        products: [
            {name: 'Micheal<br>スマホケース', price: 1580, image: '../images/01.png', delve: 0, isSale: true},
            {name: 'Raphael<br>スマホケース', price: 1580, image: '../images/02.png', delve: 0, isSale: true},
            {name: 'Gabriel<br>スマホケース', price: 1580, image: '../images/03.png', delve: 240, isSale: true},
            {name: 'Uriel<br>スマホケース', price: 980, image: '../images/04.png', delve: 0, isSale: true},
            {name: 'Ariel<br>スマホケース', price: 980, image: '../images/05.png', delve: 0, isSale: false},
            {name: 'Azrael<br>スマホケース', price: 1580, image: '../images/06.png', delve: 0, isSale: false},
        ]

    }
});
