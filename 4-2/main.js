var btnLoad = document.querySelector('#load');

//読み込みボタンのクリックイベントハンドラを定義
//読み込みボタンが押されると、以下の処理が実行される
btnLoad.addEventListener('click', function(event) {

    //手順１-XMLHttpRequestオブジェクトのインスタンスを生成
    //XMLHHttpRequestオブジェクトのインスタンスが通信を担う
    var xmlHttpRequest = new XMLHttpRequest();

    //手順２-通信状態の変化を監視するイベントハンドラを設定
    //onreadystatechange : 通信の開始や完了といった通信状況の変化を監視する
    //onreadystatechangeに設定されたイベントハンドラが実行されるのは、手順５の後
    xmlHttpRequest.onreadystatechange = function() {

        //レスポンスの受信が正常に完了した時
        //readyState == 4 : 通信の完了を表す
        //status == 200 : 通信が成功したかどうかをHTTPレスポンスコードの値で確認
        if (this.readyState == 4 /* && this.status == 200   ローカル開発環境なので不要*/) {

            //受信したJSONを変数に格納する
            var products = this.response;
            
            //商品リストの子ノードを削除する(毎回、更新されるようにするために削除する)
            var result = document.querySelector('#result');
            result.textContent='';

            //商品の子ノードをDOMに挿入する
            for (var i=0; i<products.length; i++) {
                var text = '商品ID:' + products[i].id;
                text += ' 商品名:' + products[i].name;
                text += ' 料金:' + products[i].price;
                text += ' 画像パス:' + products[i].image;
                text += ' 送料:' + products[i].delv;
                text += ' セール対象:' + products[i].isSale;
                var div = document.createElement('div');
                div.textContent = text;
                result.appendChild(div);
            }
            //受信したデータをコンソールに出力する(デバッグ用)
            console.log(this.readyState, this.response);
        }
    };
   
    //手順３-レスポンスの形式を指定する
    //サーバにデータを要求する前に設定しておく
    xmlHttpRequest.responseType = 'json';

    //手順４-リクエストメソッドと読み込むファイルのパスを指定する
    //今回はデータを要求する場なので、GETメソッドを用いる
    xmlHttpRequest.open('GET', 'products.json');

    //手順５-リクエストを送信する(非同期通信を開始する)
    xmlHttpRequest.send();
})