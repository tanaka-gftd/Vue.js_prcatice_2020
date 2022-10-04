//数値を通貨書式（３桁ごとにコンマを挿入）に変換するフィルター
//便利なので、グローバルスコープに登録
/* 注意！ フィルターは、そのフィルターを利用するコンポーネントよりも先に定義しなくてはならない*/
Vue.filter('number_format', function(val){
    return val.toLocaleString();
});



var app = new Vue({
    
    //このコンポーネントのインスタンスを、HTMLのappクラスと結びつける
    el: '#app',

    //このコンポーネントが保持するデータを定義する
    data: {

        /* 商品リスト以外のデータには初期値を設定しておく */
        /* データの持たせ方は、数値、真偽値、配列、文字列など */

        //表示中の商品数
        /* 数値型の変数の初期値は、０が基本 */
        /* 配列の長さを件数として表示するようにしたので、この項目は不要 */
        //count: 0,

        //”セール対象”のチェック状態（true：チェック有り false：チェック無し）
        showSaleItem: false,

        //”送料無料”のチェック状態（true：チェック有り false：チェック無し）
        showDelvFree: false,

        //”並び替え”の選択値（１：標準、２：価格が安い順）
        sortOrder: 1,

        //商品リスト
        /* 商品のデータをオブジェクト形式にまとめ、配列に詰め込んでおく */
        products: [
            {id: 1, name: 'Micheal<br>スマホケース', price: 1580, image: '../images/01.png', delv: 0, isSale: true},
            {id: 2, name: 'Raphael<br>スマホケース', price: 1580, image: '../images/02.png', delv: 0, isSale: true},
            {id: 3, name: 'Gabriel<br>スマホケース', price: 1580, image: '../images/03.png', delv: 240, isSale: true},
            {id: 4, name: 'Uriel<br>スマホケース', price: 980, image: '../images/04.png', delv: 0, isSale: true},
            {id: 5, name: 'Ariel<br>スマホケース', price: 980, image: '../images/05.png', delv: 0, isSale: false},
            {id: 6, name: 'Azrael<br>スマホケース', price: 1580, image: '../images/06.png', delv: 0, isSale: false},
        ]
    },

    //このコンポーネントが保持するデータ監視し、変更を検知する(今回はチェックボックスを監視)
    watch: {
        //”セール対象”のチェックボックスの状態を監視するウォッチャ
        showSaleItem: function(newVal, oldval) {

            //ここでproductsの配列を書き換える
            console.log('showSaleItemウォッチャが呼び出されました。');
        },
        //”送料無料”のチェックボックスの状態を監視するウォッチャ
        showDelvFree: function(newVal, oldVal) {

            //ここでproductsの配列を書き換える
            console.log('showDelvFreeウォッチャが呼び出されました。');
        }
    },

    //アプリケーションのデータに基づいて、そのデータに加工を行なった結果を返す
    computed: {

        //絞り込み後の商品リストを返す算出プロパティ
        filteredList: function() {

            //絞り込み後の商品リストを格納する新しい配列を作成
            var newList = [];

            for (var i=0; i<this.products.length; i++) {

                //表示対象かどうかを判定するフラグ
                var isShow = true;

                //i番目の商品が表示対象かどうかを判定する
                if (this.showSaleItem && !this.products[i].isSale) {

                    //”セール対象”チェック有りで、セール対象ではない場合
                    isShow = false; //この商品は表示しない
                }
                if (this.showDelvFree && this.products[i].delv>0) {
                    
                    //”送料無料”チェック有りで、送料有りの商品の場合
                    isShow = false; //この商品は表示しない
                }

                //表示対象の商品だけを新しい配列に追加していく
                if (isShow) {
                    newList.push(this.products[i]);
                }
                
                //新しい配列を並び替える
                if(this.sortOrder == 1) {
                    
                    //標準に並び替え
                    //元の順番にpushしているので並び替え済み
                }

                else if (this.sortOrder == 2) {

                    //価格が安い順に並び替える
                    newList.sort(function(a,b) {
                        return a.price - b.price;
                    })
                }
            }

            //絞り込み後の商品リストを返す
            return newList;
        },

        //絞り込み後の商品リストの件数を返す算出プロパティ
        count: function() {
            return this.filteredList.length;
        }
    }
});
