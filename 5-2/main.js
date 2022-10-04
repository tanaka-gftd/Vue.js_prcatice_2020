//-----------------------------------------------
// 変数宣言
//-----------------------------------------------

// コンポーネントのルートノード(描画するすべての要素)を取得
/* どこからでも呼び出せるよう、グローバルスコープに登録する */
/* querySelector：HTMLのidとclassを指定して取得する。
  getElementby～系と違い、idとclassで書き分ける必要がない(上位互換？) */
var app = document.querySelector('#app');

// 消費税率
/* 消費税率が変わったときの修正が最小限で済むよう、グローバルスコープに登録 */
var taxRate = 0.08;

//-----------------------------------------------
// イベントハンドラの割り当て ： ユーザの操作などのイベント発生を検知した際の挙動を指定する
//-----------------------------------------------

// ページの読み込み完了イベント
/* window： DOM 文書を収めるウィンドウを表す（画面との認識でOK） */
/* loadイベント：ページ全体が、スタイルシートや画像などのすべての依存するリソースを含めて読み込まれた時に発生（要するにソースが読み込まれて画面に表示される直前） */
window.addEventListener('load', onPageLoad, false);

// 入力内容変更イベント（DVD仕上がり予定日）
app.querySelector('#delivery_date').addEventListener('change', onInputChanged, false);

// 入力内容変更イベント（BGM手配）
app.querySelector('#opt1').addEventListener('change', onInputChanged, false);

// 入力内容変更イベント（撮影）
app.querySelector('#opt2').addEventListener('change', onInputChanged, false);

// 入力内容変更イベント（DVD盤面印刷）
app.querySelector('#opt3').addEventListener('change', onInputChanged, false);

// 入力内容変更イベント（写真スキャニング）
/* 当項目は <input type="number"> のスピンボタンなので、inputイベントにハンドラを割り当てる
   changeイベントだと、入力値を変更しただけではイベントが発生しない（入力欄からフォーカスを外す必要がある） */
app.querySelector('#opt4').addEventListener('input', onInputChanged, false);

//-----------------------------------------------
// イベントハンドラ ： イベントを検知した際の処理
//-----------------------------------------------

// ページの読み込みが完了したとき呼び出されるイベントハンドラ
function onPageLoad(event) {

  // フォーム項目を取得
  var wedding_date  = app.querySelector('#wedding_date');  // 挙式日
  var delivery_date = app.querySelector('#delivery_date');  // DVD仕上がり予定日
  
  // 今日の日付を取得
  var dt = new Date();

  /* Dateオブジェクトは引数なしでnewすると、今日の日付を持つ
    get系メソッドで各種データを取得し、set系メソッドで各種データを設定する */

  // 挙式日の初期値に2ヵ月後の日付を設定
  dt.setMonth(dt.getMonth() + 2);
  wedding_date.value = formatDate(dt);

  // DVD仕上がり予定日の初期値に、挙式日の初期値の１週間前の日付を設定
  dt.setDate(dt.getDate() - 7);
  delivery_date.value = formatDate(dt);

  // DVD仕上がり予定日に翌日以降しか入力できないようにする
  /* setAttribute：指定されたHTMLの要素に属性を追加する */
  delivery_date.setAttribute('min', tommorow());

  // フォームの表示を更新する（updateForm関数で描画内容を更新）
  updateForm();
}

// 入力内容を変更したとき呼び出されるイベントハンドラ
/* ユーザが入力するたびに描画内容が変更されるようにする */
function onInputChanged(event) {

  // フォームの表示を更新する（updateForm関数で描画内容を更新）
  updateForm(); 
}

//-----------------------------------------------
// 関数 ： イベントハンドラで使われる関数を設定
//-----------------------------------------------

// 日付をYYYY-MM-DDの書式で返すメソッド
function formatDate(dt) {

  var y = dt.getFullYear();

  /* 文字列"00"と取得した値を連結し、slice(-2)すれば常に２桁の値が得られる
     例： 3月 → 03 , 8日 → 08 という形で取得する */

  var m = ('00' + (dt.getMonth()+1)).slice(-2);  // getMonth()の範囲は0～11なので、今月を取得する際は +1 する

  var d = ('00' + dt.getDate()).slice(-2);

  return (y + '-' + m + '-' + d);
}

// 明日の日付をYYYY-MM-DDの書式で返す関数
function tommorow() {

  var dt = new Date();  // 今日の日付

  dt.setDate(dt.getDate() + 1);  // 明日の日付
  return formatDate(dt);
}

// 税抜き金額を税込み金額に変換する関数
function incTax(untaxed) {
  
  /* Math.floor：引数として与えた数以下の最大の整数を返す。（今回なら小数点以下切り捨て） */
  return Math.floor(untaxed * (1 + taxRate));
}

// 数値を通貨書式「#,###,###」に変換する関数
function number_format(val) {

  return val.toLocaleString();
}

// 日付の差を求める関数
function getDateDiff(dateString1, dateString2) {

  // 日付を表す文字列から日付オブジェクトを生成
  var date1 = new Date(dateString1);
  var date2 = new Date(dateString2);

  // 2つの日付の差分（ミリ秒）を計算
  var msDiff  = date1.getTime() - date2.getTime();

  // 求めた差分（ミリ秒）を日付に変換
  // 差分÷(1000ミリ秒×60秒×60分×24時間)
  /* Math.ceil：引数として与えた数以上の最小の整数を返す。（今回なら小数点以下切り上げ） */
  return Math.ceil(msDiff / (1000 * 60 * 60 *24));
}

// 再計算した基本料金（税込）を返す関数
function taxedBasePrice() {

  // 割増料金
  var addPrice = 0;

  // フォーム項目を取得（DVD仕上がり予定日）
  var delivery_date = app.querySelector('#delivery_date');

  // 納期までの残り日数を計算
  var dateDiff = getDateDiff(delivery_date.value, (new Date()).toLocaleString());

  // 納期までの日数から割増料金を求める（仕上がり予定日が近い程、高い値が設定される）
  if (21 <= dateDiff && dateDiff < 30) {
    // 納期が1ヵ月未満の場合
    addPrice = 5000;
  }
  else if (14 <= dateDiff && dateDiff < 21) {
    // 納期が3週間未満の場合
    addPrice = 10000;
  }
  else if (7 <= dateDiff && dateDiff < 14) {
    // 納期が2週間未満の場合
    addPrice = 15000;
  }
  else if (3 < dateDiff && dateDiff < 7) {
    // 納期が1週間未満の場合
    addPrice = 20000;
  }
  else if (dateDiff == 3) {
    // 納期が3日後の場合
    addPrice = 40000;
  }
  else if (dateDiff == 2) {
    // 納期が2日後の場合
    addPrice = 45000;
  }
  else if (dateDiff == 1) {
    // 納期が翌日の場合
    addPrice = 50000;
  }

  // 基本料金（税込）を返す
  return incTax(30000 + addPrice);
}

// 再計算したオプション料金（税込）を返す関数
function taxedOptPrice() {

  // オプション料金
  var optPrice = 0;

  // フォーム項目を取得
  var opt1 = app.querySelector('#opt1');  // BGM手配
  var opt2 = app.querySelector('#opt2');  // 撮影
  var opt3 = app.querySelector('#opt3');  // DVD盤面印刷
  var opt4 = app.querySelector('#opt4');  // 写真スキャニング
  
  /* オプション料金を各項目ごとに追加していく */
  
  if (opt1.checked) { optPrice += 5000; }  // BGM手配
  
  if (opt2.checked) { optPrice += 5000; }  // 撮影
  
  if (opt3.checked) { optPrice += 5000; }  // DVD盤面印刷
  
  if (opt4.value == '') { opt4 = 0; }  
  optPrice += opt4.value * 500;  // 写真スキャニング

  // オプション料金（税込）を返す
  return incTax(optPrice);
}

// 金額の表示を更新する関数
function updateForm() {

  // フォーム項目を取得
  var sum_base  = app.querySelector('#sum_base');   // 基本料金（税込）
  var sum_opt   = app.querySelector('#sum_opt');    // オプション料金（税込）
  var sum_total = app.querySelector('#sum_total');  // 合計（税込）

  // 金額を再計算
  var basePrice  = taxedBasePrice();     // 基本料金（税込）  再計算した基本料金（税込）を返す関数を使う
  var optPrice   = taxedOptPrice();      // オプション料金（税込）  再計算したオプション料金（税込）を返す関数を使う
  var totalPrice = basePrice + optPrice; // 合計（税込）

  // 表示を更新（数値を通貨書式「#,###,###」に変換する関数を使って、各値を表示用に変換）
  sum_base.value  = number_format(basePrice);   // 基本料金（税込）
  sum_opt.value   = number_format(optPrice);    // オプション料金（税込）
  sum_total.value = number_format(totalPrice);  // 合計（税込）
}