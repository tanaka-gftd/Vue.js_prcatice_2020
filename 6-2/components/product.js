//商品コンポーネント（product.js）

/* 商品コンポーネントには、商品１個分のデータが必要
   親である商品一覧コンポーネントからpropsオプションで受け取れるようにする */

/* 本コンポーネントは、親コンポーネント（product-list.js）内でのみ使用するので、ローカルスコープに登録する。
   そのため、コンポーネントの定義をオブジェクトで表記して変数productに格納しておく。
   この変数product自体はグローバルスコープにあるので、親コンポーネントから参照できる。*/

var product = {

    template: `
        <div class="item">
            <figure class="image">
                <template v-if="product.isSale">
                    <div class ="status">SALE</div>
                </template>
                <img v-bind:src="product.image" alt="">
                <figcaption v-html="product.name"></figcaption>
            </figure>
            <div class="detail">
                <div class="price"><span>{{product.price | number_format}}</span>円（税込）</div>
                <template v-if="product.delv == 0">
                    <div class="shipping-fee none">送料無料</div>
                </template>
                <template v-else>
                    <div class="shipping-fee">
                        ＋送料{{product.delv | number_format}}円
                    </div>
                </template>
                </div>
            </div>`,

    //propsオプションで、親である商品一覧コンポーネントから商品１個分のデータを受け取れるようにする
    props: ['product']
};