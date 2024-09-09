///// グローバル変数
 // getElem~idメソッドを短絡化
 var byId = function(id){ return document.getElementById(id); };

 // textareaのIDを指定
	const textarea = document.getElementById('URL');

 // 動画URLの配列 再代入ありのためvar
 var inBoxStr = [];
 // 変更履歴の配列 再代入ありのためvar
 var changeText = [];

///// 変換
function btnGo() {
  // テキストの内容を取得
  var text = textarea.value;
  textarea.focus();

 // replace(/使う(?:削除)/g , アクション)  gはグローバル(全文)検索

  // PC版クエリ始まりeyJ0e ~ 終わり9fQ fX0 n19 まだある？集める　ケタが決まってないから法則性でマッチさせる
  // 正規表現   0:nico, 1:sm |  2:|&nico|, 3:(sm)
  text = text.replace(/(?:(?:https?:\/\/)?(?:nico\.ms|(?:(?:www|sp)?\.)?nico(?:video|chart)\.jp)?\/)?(?:watch\/)?((?:sm|nm|so)[0-9]+|[0-9]{10,})(?:[\?\&][a-z_]+=(?:(?:[a-zA-Z0-9_\-]+|eyJ0e[a-zA-Z]+(?:9fQ|fX0|n19))(?:https?)?))*|((?:\|)?\&nicovideo\((?:[a-z]{2})?[0-9]+\)(?:\|)?)/g, 
    function(){
      // ニコニコにマッチするが、2つ目のカッコである|&nicovideo|形式は変換しない
      if(!arguments[2]) {
        // &nicovideo形式と固有番号をくっつけて出力するよ
        return "\|\&nicovideo\(" + arguments[1] + "\)\|";
      } else {
        return arguments[0]; //繰り返し
      }
    }
  );

  // 正規表現   0:youtube, 1:watch, 2:xxx | 3:|&youtube(){}|, 4:(https://~xxx){123,456}, 5:{123,456}
  text = text.replace(/(?:(?:https?:\/\/)?(?:(?:www|m)?\.)?youtu[\.]?be(?:\.com)?\/)?(watch\?v=)?([a-zA-Z0-9_\-]{11})(?:\&[a-z]+=[a-zA-Z0-9]+)?|((?:\|)?\&youtube(\(https:\/\/www\.youtube\.com\/watch\?v=[a-zA-Z0-9_\-]{11}(\{[0-9]{2,4}\,[0-9]{2,4}\})?)\)(?:\|)?)/g, 
    function(){
      // ようつべにマッチするが、3つ目のカッコである|&youtube|は変換しない
      // {123,456}があったら
      if(arguments[0] && !arguments[3] && arguments[4]) {
        // &youtube形式とアドレスと固有番号をくっつけて出力するよ
        return "|&youtube(" + "https://www.youtube.com/watch\?v=" + arguments[2] + ")" + arguments[4] + "|";
      // {123,456}がなかったら
      } else if(arguments[0] && !arguments[4]) {
        return "|&youtube(" + "https://www.youtube.com/watch\?v=" + arguments[2] + ")" + "{342,187}" + "|";
      } else {
        return arguments[0]; // 繰り返し
      }
    });

  // 空白を削除
  //text = text.replace(/\s|\n/g , "");

  // |&ny()| 1:n/y 2:( sm??? or http~{ ) 3:)or}
  const nyBox = "\\|\\&(nicovideo|youtube)(\\([a-zA-Z0-9\\_\\:\\/\\?\\,\\.\\=\\)\\{\\-]+)(\\)|\\})" ; 
  // 改行
  text = text.replace( new RegExp(nyBox,"g") ,
    function(){
      if( arguments[3] === "}" )
       { return "\|\&" + arguments[1] + arguments[2] + arguments[3] + "\n" ; }
      else if( arguments[3] === ")" )
       { return "\|\&" + arguments[1] + arguments[2] + arguments[3] + "\n" ; }
      else { return arguments[0]; }
    }
  );
  // 先頭の不要な文字列を削除
  //text = text.replace(/^.*?\|/gm, "\|");

  // 配列に格納
    inBoxStr = text.match(/\|\&.+(\)|\})/g);

  // 2つずつ
    for( let i=0; i < inBoxStr.length; i++ ){
      //2の加算を繰り返して偶数位置に|\nを入れる   ※注意※ iにすると無限ループ地獄
      inBoxStr.splice(i+=2,0,'\|\n');   // ( 位置 , 0:挿入/1:削除 , 挿入する文字)
      text = inBoxStr.join("");
    }


  // 2列目と3列目の+3していった位置をとりだす
  for( let i=0; i < inBoxStr.length; i+=3){
    let Bi = i+1; // 2つ目の列
    let Ci = i+2; // |\nの列
    inBoxStr.slice(Bi,Bi+1); // 2つを取り出す(開始位置,終了位置-1)
   console.log(inBoxStr.slice(Bi,Bi+2)); // ここで確認しつつ調整！！！
  }
  // 連結



  // 奇数個だったら最後に|を付ける
  const result  = [];
    if(inBoxStr.length % 2 == 1){
      textarea.value = text.replace(/\n$/g, "\|\n");
      console.log(inBoxStr.length + "個 奇数");
    }else{
      textarea.value = text;
      console.log(inBoxStr.length + "個 偶数");
    }



 //[番号i][box中身j] boxの中身を二次元配列で格納
 //let boxInfo = [[,],[,]]; 
 // for( let i = 0; 0 < 2/*splitText.length*/; i-- ){
 // 番号を[i]に振っていく
 
 // 中身を[j]に格納
 // boxInfo[j] = [];
 // boxInfo.push(
 //  text.replace(new RegExp(// , "m") ,
 //  )
 // );

// }

  textarea.value = text; // 変更を加えたテキストをtextareaに反映
  return;
}





///// テキストエリアでのUndo/Redo

 var btnClear = byId('clear');
 var undo = byId('undo');
 var redo = byId('redo');

// 消去
 btnClear.addEventListener('click', function() {
   //execCommand('insertText')
   textarea.focus();
  // 全選択・削除コマンド
   document.execCommand('selectAll'); 
   document.execCommand('delete');
});

///// 参考にもある通り、execCommandは廃止の一途を辿るのみ
///// chromeではギリ使用可能、いずれ代替のものを使う

// 戻す
 undo.addEventListener('click', function() {
   //execCommand('insertText')
   textarea.focus();
   document.execCommand('undo', false);
});
// やり直す
 redo.addEventListener('click', function() {
   //execCommand('insertText')
   textarea.focus();
   document.execCommand('redo', false);
});



// テキストエリア・ボタン操作を配列に記録
// push:配列の末尾に追加 pop:末尾を削除 concat()メソッド:配列を結合


///// 編集方法切り替え
function radio() {
 // ラジオボタン取得
 const mButton = byId('sm');
 const sButton = byId('ss');
 // クラスmany・singleを取得
 const many = byId("many");
 const single = byId("single");

 if (mButton.checked === true) {
  // 一括変換なら個別を非表示
  single.style.display = "none";
  many.style.display = "";
 } else if(sButton.checked === true) {
  // 個別なら一括変換を非表示・個別を表示
  many.style.display = "none";
  single.style.display = "inline-block";
 }
}



///// 個別
// template取得
const template = byId('template');
// アイコンを取得（配列風メソッド）
const dragIcon = template.getElementsByClassName('drag');
const deleteIcon = template.getElementsByClassName('delete');
// inputとdivを取得
const input = template.getElementsByTagName('input');
const div = template.getElementsByTagName('div');
//  const inputArray = Array.from(input);
//  const divArray = Array.from(div);

/// 配列
const inputAndDiv = [];
 // inputとdivをセットで格納
 (function(){
  for (let i=0; i<input.length; i++){
    inputAndDiv[i] = [[i],[input[i]+div[i]]];
  }
  return inputAndDiv;
 }())
//D&D時spliceで挿入　配列取得いつ？即時関数？

 /// 削除アイコンを押したら削除
 for (let i=0; i < div.length; i++){
   div[i].addEventListener("click", function(){
     if(this.className === "delete"){
       // HTMLから削除
       this.previousElementSibling.remove(); //前にあるinput
       this.remove(); //押したdiv
       // 配列から削除
       const aaa = inputAndDiv.splice(inputAndDiv[i],1);
       console.log(inputAndDiv);
     }
    return inputAndDiv;
   });
 }

 // 消したデータ格納
 const deleteData = [];



 /// 削除メニュー
 // 削除メニュー取得
 const deleteMenu = byId('deleteMenu');
 function deleteShow(){
  // getElementsByClassName は HTMLCollection という配列風オブジェクトのため配列ではない。配列に変換
  const dragIconArray = Array.from(dragIcon);
  const deleteIconArray = Array.from(deleteIcon);

  if(dragIcon[0]){
    // drag -> delete
    dragIconArray.forEach((i) => {i.setAttribute("class","delete")});
    // 削除メニューを押した状態にする
    deleteMenu.classList.toggle("pushBtn");
  }else if(deleteIcon[0]){
    // delete -> drag
    deleteIconArray.forEach((i) => {i.setAttribute("class","drag")});
    deleteMenu.classList.toggle("pushBtn");
  }else{
    // 何も存在しなければ切り替え可能にする
    deleteMenu.classList.toggle("pushBtn");
  }
 }

 /// 追加ボタン押したら追加
 function addForm(){
  // inputとdivを作る
  const newinput = document.createElement("input");
  const newdiv = document.createElement("div");

  /// divにアイコン設定
  // 削除メニュー押してたらdelete
  if(deleteMenu.className == "defaultBtn pushBtn"){
    newdiv.setAttribute("class","delete");
  }else if(deleteMenu.className == "defaultBtn"){
   newdiv.setAttribute("class","drag");
  }
  
  // 作ったアイテムを挿入
  const set1 = template.appendChild(newinput)+template.appendChild(newdiv);
  // 配列に反映
  inputAndDiv.push(inputAndDiv.slice(-1),[set1]); //最後の数字を+1したい
    console.log(inputAndDiv);
    return inputAndDiv;
 }





///// プレビュー表示
function check() {
 // チェックボックス取得
 const spCheckbox = document.getElementById('sp');
 // クラスpreviewを取得
 const previewStyle = document.getElementById("preview");
 // クラスtypeとその幅を取得
 const type = document.getElementById('type');
 const typeWidth = type.querySelector("#window-innerWidth");

 // チェックONならプレビューを表示
 if (spCheckbox.checked === true) {
  previewStyle.style.display = "";
  // クラスtypeの幅を戻す
  type.style.width = typeWidth;
 } else {
  // チェックOFFならプレビューを非表示
  previewStyle.style.display = "none";
  // 編集枠の幅100%
  type.style.width = "100%";
 };
};

/// サムネ表示
