//商品一覧コンポーネント（product-list.js）

/* 商品一覧コンポーネントは、子コンポーネントである商品コンポーネントを描画するために商品データを参照できなければならない 
   商品一覧コンポーネントではpropsオプションを用意しておいて、ルートコンポーネントから商品データを受け取る形にする（親から子へデータを渡す）*/

/* グローバルスコープに設定する*/
Vue.component('product-list', {
    template: `
        <div class="container">
            
            <!-- ヘッダーコンポーネントが表示される部分。
                 表示件数は算出プロパティのfilteredListが返す配列の要素数なので v-bind:count = "filteredList.length"とし、ヘッダーコンポーネントのcountプロパティに渡す。
                 絞り込み条件と並び順も同様にバインドし、ヘッダーコンポーネントの各プロパティに渡す。

                 ヘッダーコンポーネントから絞り込み条件と並び順の変更を通知してもらうために、ヘッダーコンポーネントで決めたカスタムイベントをv-onディレクティブに指定する。
                 チェックボックスについては真偽値（trueとfalse）を反転させるだけなので、!演算子で反転させた値を自身に代入するのが楽。
                 sortOrderChangedは値を受け取って処理をする必要があるので、methodsオプションに用意したイベントハンドラ用のメソッドを設定する。
                 -->
            <product-header
                v-bind:count = "filteredList.length"
                v-bind:showSaleItem = "showSaleItem"
                v-bind:showDelvFree = "showDelvFree"
                v-bind:sortOrder = "sortOrder"
                v-on:showSaleItemChanged = "showSaleItem = !showSaleItem"
                v-on:showDelvFreeChanged = "showDelvFree = !showDelvFree"
                v-on:sortOrderChanged = "sortOrderChanged"
            >
            </product-header>
            <div class="list">

                  <!-- 商品コンポーネントが繰り返し表示される部分。
                     商品コンポーネントは、filteredListが返す商品リストを１件ずつ描画するために使うので、
                     v-forディレクティブでfilteredListを繰り返しながら、
                     配列要素（１件分の商品データ）を商品コンポーネントのproductプロパティにバインドする。
                     また、v-forディレクティブを使うのでデータを一意に定める値をv-bindしておく-->
                <product 
                    v-for = "product in filteredList"
                    v-bind:product = "product"
                    v-bind:key = "product.id">
                </product>
            </div>
        </div>`,
        
    /*componentsオプション・・・子コンポーネントを設定するオプション
      書式：
          '子コンポーネント名': 子コンポーネントのデータが格納された変数
    */
   /* これで、子コンポーネント（ヘッダーコンポーネントと商品コンポーネントが使えるようになる）*/
    components: {
        'product-header': productHeader,
        'product': product
    },

    //propsオプション・・・親コンポーネントからデータを受け取るための入れ物を設定するオプションで、親テンプレートのカスタムタグの属性と共に使う
    /* 親であるルートコンポーネント(main.js)からproductsという名前のデータ（商品データ）が受け取れる */
    props: ['products'],

    
    /* dataオプションには、絞り込み条件と並び順の現在の値を保持するプロパティを定義する。
       注意・・・コンポーネントなので、オブジェクトを返す関数として定義する */
    data: function() {
        return {

            /* 下記の設定は各プロパティの初期値 */

            //「セール対象」のチェック状態（true: チェック有り、 false: チェック無し）
            showSaleItem: false,

            //「送料無料」のチェック状態（true: チェック有り、 false: チェック無し）
            showDelvFree: false,

            //「並び替え」の選択肢（１:標準、２:価格が安い順）
            sortOrder: 1
        }
    },

    methods: {
        //「並び替え」の選択肢が変わったとき呼び出されるメソッド
        sortOrderChanged: function(order) {

            //ソート方法(１又は２)を格納する
            this.sortOrder = order;
        }
    },
   
    computed: {

        //絞り込み後の商品リストを返す算出プロパティ
        /* 算出プロパティなので処理の結果は再利用される */
        filteredList: function() {

            /* filteredListのロジック内で使われる「this」は、props及びdataオプションのプロパティを指す */

            //絞り込み後の商品リストを格納する新しい配列
            var newList = [];

            //新しい配列に追加する商品を選定し、pushする
            for(var i=0; i<this.products.length; i++) {

                //表示対象かどうかを判定するフラグ
                var isShow = true;

                //i番目の商品が表示対象かどうかを判定する（セール対象）
                if (this.showSaleItem && !this.products[i].isSale) {

                    //「セール対象」チェック有りで、セール対象商品ではない場合
                    isShow = false;   //この商品は表示しない
                }

                //i番目の商品が表示対象かどうかを判定する（送料無料）
                if (this.showDelvFree && this.products[i].delv > 0) {
                   
                    //「送料無料」チェック有りで、送料有りの商品の場合
                    isShow = false;   //この商品は表示しない
                }

                //表示対象の商品だけを新しい配列に追加する
                if (isShow) {
                    newList.push(this.products[i]);
                }
            }

            //新しい配列を並び替える
            //this.sortOrderの現在値は、methodsオプションで定義される
            if (this.sortOrder == 1) {
                //元の順番をもとにpushしているので並び替え済み
            }
            else if (this.sortOrder == 2) {

                //価格が安い順に並び替える
                /* sort()関数・・・配列の要素を並び替える
                   sort()関数には様々な書式があり、下記の記述だと昇順に並び替えられる */
                newList.sort(function(a,b) {
                    return a.price - b.price;
                });
            }

            //絞り込み後の商品リストを返す
            return newList;
        }
    }
});
