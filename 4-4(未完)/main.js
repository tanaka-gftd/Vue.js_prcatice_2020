//読み込みボタンのクリックイベントハンドラを定義
$('#load').on('click',clickHandler);

function clickHandler(event) {
    
    //非同期通信のJSONを読み込む
    $.ajax({
        url : 'products.json',      //通信先URL
        type : 'GET',               //使用するHTTPメソッド（デフォルトがGETなので省略可能）
        dataType : 'jsonp',         //レスポンスのデータタイプ
        jsonp : 'callback',         //クエリパラメータの名前
        jsonpCallback : 'products'  //コールバック関数の名前
    })
    .done(function(data, textStatus, jqXHR) {
        console.log('通信が成功しました');

        //通信成功時にupdateScreenを呼ぶ
        updateScreen(data);
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
        console.log('通信が失敗しました');
    });
}

//商品一覧の描画を更新する
function updateScreen(products) {
    
    //商品リストの子ノードを削除する(毎回、更新されるようにするために削除する)
    $('#result').empty();

    //挿入するDOMを生成
    var list = '';
    for (var i=0; i<products.length; i++) {
        list += '<div>';
        list += '商品ID:' + products[i].id;
        list += ' 商品名:' + products[i].name;
        list += ' 料金:' + products[i].price;
        list += ' 画像パス' + products[i].image;
        list += ' 送料' + products[i].delv;
        list += ' セール対象' + products[i].isSale;
        list += '</div>';
    }

    //生成したDOMを追加
    $('#result').append(list);
}
