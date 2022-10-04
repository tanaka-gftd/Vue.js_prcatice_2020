//コンポーネントのルートノード
/*querySelector : 指定されたセレクターまたはセレクターのグループに一致する、文書内の最初の Element を返す*/
var nodeApp = document.querySelector('#app')


//チェックボックス（セール対象、送料無料）のイベントハンドラを登録
/*querySelectorAll : 与えられた CSS セレクターに一致する文書中の要素のリストを示す静的なNodeListを返す*/
var nodeCheckbox = nodeApp.querySelectorAll('input[type="checkbox"]');
nodeCheckbox[0].addEventListener('change', onCheckedChanged, false);   //nodeCheckbox[0] : セール対象
nodeCheckbox[1].addEventListener('change', onCheckedChanged, false);   //nodeCheckbox[1] : 送料無料


//セレクトボックス（並び替え）のイベントハンドラを登録
var nodeSelect = nodeApp.querySelector('.sorting');
nodeSelect.addEventListener('change', onOrderChanged, false);


//初期表示時の商品ノードリスト（保存用）
var nodeItemsOrg = nodeApp.querySelectorAll('.item');


//チェック状態変更イベントハンドラ
function onCheckedChanged(event) {

    var nodeItems = nodeApp.querySelectorAll('.item');   //商品ノードのリストを配列に格納
    var nodeCount = nodeApp.querySelectorAll('.count');   //表示件数（検索結果の件数）を変数に格納（初期値は６）
    
    //商品ノードのリスト数を変数に格納
    /*最終的にはnodeCountの値を、countの値で上書きする*/
    var count = nodeItems.length;   
    
    //全ての商品ノードをいったん表示する
    //（showNode関数は下記で定義）
    for (var i = 0; i < nodeItems.length; i++) {
        showNode(nodeItems[i]);   
    }

    //セール対象のチェックがついている場合
    if (nodeCheckbox[0].checked) {
    
        //全ての商品ノードを捜査
        for (var i = 0; i < nodeItems.length; i++) {
    
            //セール対象の商品ではない場合
            //（isSaleItem関数は下記で定義）
            if(!isSaleItem(nodeItems[i])) {
            
                //この商品を非表示にする
                //（hideNode関数は下記で定義）
                hideNode(nodeItems[i]);   
            
                //件数の値を一つ減らす
                count--;
            }
        }
    }


    //送料無料のチェックがついている場合
    if (nodeCheckbox[1].checked) {
    
        //全ての商品ノードを捜査
        for (var i = 0; i < nodeItems.length; i++) {
    
            //送料無料の商品ではない場合
            //（isDelvFreeItem関数は下記で定義）
            if(!isDelvFreeItem(nodeItems[i])) {
            
                //この商品非表示にする
                hideNode(nodeItems[i]);

                //件数の値を一つ減らす
                count--;
            }
        }
    }

    //件数を更新
    nodeCount.textContent = count + '件';
}


//並び順の変更イベントハンドラ
function onOrderChanged(event) {
    var nodeList = nodeApp.querySelector('.list');
    var nodeItems = nodeApp.querySelectorAll('.item');

    //商品ノードのリストを新しい配列に詰め替える（退避しておく）
    var products = [];
    for (var i = 0; i < nodeItems.length; i++) {
        products.push(nodeItems[i]);
    }

    //DOMから全ての商品ノードを削除する
    while (nodeList.firstChild) {
        nodeList.removeChild(nodeList.firstChild);
    }

    //”標準”が選択されている場合
    if (event.target.value == '1') {

        //初期表示時の商品ノードを復元する
        for (var i = 0; i < products.length; i++) {
            nodeList.appendChild(nodeItemOrg[i]);
        }
    }

    //”価格が安い順”が選択されている場合
    else if (event.target.value == '2') {

        //配列を並び替え
        products.sort(function(a,b) {

            //商品価格のノードからカンマを除去した数値を読み取る
            var prevPrice = parseInt(a.querySelector('.price span').
                            textContent.replace(',',''));

            var currentPrice = parseInt(b.querySelector('.price span').
                               textContent.replace(',',''));

            return prevPrice - currentPrice;
        });

        //並び替え後の商品ノードをDOMに追加する
        for (var i = 0; i < products.length; i++) {
            nodeList.appendChild(products[i]);
        }
    }
}


//セール商品かどうかを判定する関数
function isSaleItem(nodeItem) {

    var node = nodeItem.querySelector('.status');
    return (node && node.textContent == 'SALE');
}


//送料無料かどうかを判定する関数
function isDelvFreeItem(nodeItem) {

    var node = nodeItem.querySelector('.shipping-fee');
    return (node && node.textContent == '送料無料');
}


//ノードを非表示にする関数
function hideNode(node) {

    //該当するノードのスタイルに display:none を追加して非表示にする
    node.setAttribute('style', 'display:none');
}


//ノードを表示する関数
function showNode(node) {
      
    //該当するノードからスタイル（display:none）を外して表示させる
    node.removeAttribute('style');
}
