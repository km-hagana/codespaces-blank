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