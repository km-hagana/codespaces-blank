///// どの括弧にも入ってないグローバル変数のため都度定義の必要なし
 // getelem~idメソッドの名前を短絡化
 var byId = function(id){ return document.getElementById(id); };

 ///// textareaのIDを指定
	const textarea = document.getElementById('URL');

(function () {
 // 実行ボタンを押すと処理
 var btnGo = document.getElementById('go');
 btnGo.addEventListener('click', function(){
   // テキストの内容を取得
  	var text = textarea.value;
   textarea.focus();
   // PC版クエリ始まりeyJ0e ~ 終わり9fQ fX0 n19 まだある？集める　ケタが決まってないから法則性でマッチさせる
	  // 正規表現   0:nico, 1:sm, 2:|&nico|, 3:sm
	  text = text.replace(/(?:(?:https?:\/\/)?(?:nico\.ms|(?:(?:www|sp)?\.)?nico(?:video|chart)\.jp)?\/)?(?:watch\/)?((?:[a-z]{2})[0-9]+|[0-9]{10,})(?:[\?\&][a-z_]+=(?:(?:[a-zA-Z0-9_\-]+|eyJ0e[a-zA-Z]+(?:9fQ|fX0|n19))(?:https?)?))*|((?:\|)?\&nicovideo\((?:[a-z]{2})?[0-9]+\)(?:\|)?)/g , 
        function(){     // 特定の文字に置換するのではなくfunctionで条件付け
   // ニコニコにマッチするが、3つ目のカッコである|&nicovideo|形式は変換しない
   if(!arguments[2]) {
     // &nicovideo形式と固有番号をくっつけて出力するよ
      return "|&nicovideo\(" + arguments[1] + "\)|";
   } else {
      return arguments[0] //繰り返し
   }
                  }
             )

	  // 正規表現   0:youtube, 1:watch, 2:xxx, 3:|&youtube|
    .replace(/(?:(?:https?:\/\/)?(?:(?:www|m)?\.)?youtu[\.]?be(?:\.com)?\/)?(watch\?v=)?([a-zA-Z0-9_\-]{11})(?:\&[a-z]+=[a-zA-Z0-9]+)?|((?:\|)?\&youtube\((https:\/\/www\.youtube\.com\/watch\?v=[a-zA-Z0-9_\-]{11}(\{[0-9]{2,4}\,[0-9]{2,4}\})?)\)(?:\|)?)/g, 
        function(){
   // ようつべにマッチするが、8つ目のカッコである|&youtube|は変換しない
    // {123,456}があったら
    if(arguments[0] && !arguments[3] && arguments[4]) {
    // &youtube形式とアドレスと固有番号をくっつけて出力するよ
      return "|&youtube\(" + "https://www.youtube.com/" + "watch\?v=" + arguments[2] + "\)" + arguments[4] + "|";
    }
    // {123,456}がなかったら
    else if(arguments[0] && !arguments[3]) {
      return "|&youtube\(" + "https://www.youtube.com/watch\?v=" + arguments[2] + "\)" + "{342,187}" + "|";
   } else {
      return arguments[0] // 繰り返し
   }
                   }
                      ).replace(/\|:\/\/\|/g, "||"); // 英字とhttpがくっついて :// になるので|://|を||に変換。削除にすると&Youtubeの中身のやつまで消えるからダメ
	textarea.value = text; // 変更を加えたテキストをtextareaに反映
	}, false);
}());





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
 };
};

///// 個別メニュー
 /// 移動の配列
 

 /// 削除メニュー
 function deleteShow(){
  // 削除メニュー取得
  const deleteMenu = byId('deleteMenu');
  // アイコンの個数を取得（配列型メソッド）
  const dragIcon = document.getElementsByClassName('drag');
  const deleteIcon = document.getElementsByClassName('delete');
  // getElementsByClassName は HTMLCollection という配列風オブジェクトを返すため配列ではない。配列に変換
  const dragIconArray = Array.from(dragIcon);
  const deleteIconArray = Array.from(deleteIcon);

    if(dragIcon[0]) {
      // drag -> delete
      dragIconArray.forEach((element) => {element.setAttribute("class","delete")});
      // 削除メニューを押したままにする
      deleteMenu.classList.toggle("pushBtn");
    } else if(deleteIcon[0]) {
      // delete -> drag
      deleteIconArray.forEach((element) => {element.setAttribute("class","drag")});
      deleteMenu.classList.toggle("pushBtn");
    };
}
//追加ボタン押したらdragに戻すようにしたい
//配列の最後を読み取って判断？



 /// 追加ボタン押したら追加
 function addForm(){
  // template取得
  const template = byId('template');
  // 一番最後のアイコンがどっちなのか取得
  const divCls = template.lastElementChild.className;

     //input作る
     const newinput = document.createElement("input");
     const newinput2 = document.createElement("input");
     //div作る
     const newdiv = document.createElement("div");
     const newdiv2 = document.createElement("div");

     //divにアイコン設定
     if(divCls === "drag"){
 newdiv.setAttribute("class","drag");
     newdiv2.setAttribute("class","drag");
} else if(divCls === "delete"){
 newdiv.setAttribute("class","delete");
     newdiv2.setAttribute("class","delete");
};

       //作ったやつを挿入
       template.appendChild(newinput) + template.appendChild(newdiv);
       template.appendChild(newinput2) + template.appendChild(newdiv2);
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

// サムネ表示