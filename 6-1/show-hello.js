/* コンポーネントを定義するにはVue.component()メソッドを使う */
/* Vue.component()メソッドを実行すると、グローバルスコープにコンポーネントを登録したことになるので、
   以後はどこからでもコンポーネントが利用できるようになる */
/* 注意!  Vue.filter()と同様に、Vue.component()などのグローバルメソッドは、new Vue()よりも先にHTMLに読み込まれなくてはならない */

Vue.component('show-hello', {
   
   //テンプレート部分
   /* templateオプションに指定するテンプレートは、必ず全体を単一のタグで囲まなければならない
      例えば、template: '<span>{{name}}</span>:<span>{{price}}</span>'として、dataオプションでそれぞれの値を指定しても、前者しか描画されない
      そういう場合は、template:'<div><span>{{name}}</span> : <span>{{price}}</span></div>' の様に全体をタグで囲めばOK
      ただし、templateタグはDOMに出力されない性質があるため、templateタグでは囲めない*/

   /* テンプレート全体をバッククォートで囲むと、テンプレートの中に改行を含めることができる → 可読性UP */
   template:
      `<div>
         <span>{{name}}</span> : <span>{{price}}</span>
      </div>`,
   //dataオプション
   /* 注意! new Vue()のdataオプションとは違って、コンポーネントのdataオプションは｛プロパティ名：値｝形式のオブジェクトを返す関数として定義しなければならない */
   data: function() {
      return {
         name: 'スマホケース',
         price: 980
      }
   },

   //メソッド
   methods: {

   },

   //算出プロパティ
   computed: {

   },

   //ウォッチャ
   watch: {

   },

   //フィルター
   filter: {

   },

   //ライフサイクルハック
   created: function() {

   }
});
