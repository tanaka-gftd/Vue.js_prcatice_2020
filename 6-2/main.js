//ルートコンポーネント（main.js）

/* HTMLと結びついているのは、本コンポーネント
   （憶測：HTMLと結びついているから、ルートコンポーネント？） */

/* ルートコンポーネントには商品データを持たせる 
  
   説明：
   実際のアプリケーションではデータベースなどから外部データとして取り込むが、
   ここではルートコンポーネントが商品データをdataオプションのプロパティとして取り込み済みとする */

var app = new Vue ({

    el: '#app',
    data: {

        //商品データ
        products: [
            {id: 1, name: 'Michael<br> スマホケース', price: 1580, image: '../images/01.png', delv: 0, isSale: true},
            {id: 2, name: 'Raphael<br> スマホケース', price: 1980, image: '../images/02.png', delv: 300, isSale: false},
            {id: 3, name: 'Gabriel<br> スマホケース', price: 1450, image: '../images/03.png', delv: 240, isSale: true},
            {id: 4, name: 'Uriel<br> スマホケース', price: 1200, image: '../images/04.png', delv: 0, isSale: true},
            {id: 5, name: 'Ariel<br> スマホケース', price: 880, image: '../images/05.png', delv: 0, isSale: false},
            {id: 6, name: 'Azrael<br> スマホケース', price: 1350, image: '../images/06.png', delv: 200, isSale: false},
        ]
    }
});
