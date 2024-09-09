




///// 参考に追加
$('#addSite').on('click',function() {
 //URL取得
 var pageURL = document.getElementById('siteUrl').value;

//  $.ajax({
//   type: 'GET',
//   url: pageURL,
//   datatype: "html"
//  }).done( function(html) {
     // 別ページにあるhtml内の一部の要素を指定
//     var html = $(html).find('title');
//     var pageTitle = html.text();
     //liタグ作る
     var newli = document.createElement("li");
     //aタグ作る
     var newa = document.createElement("a");
     //aタグに諸々設定
     newa.setAttribute("href",document.createTextNode(pageURL));
     newa.setAttribute("target","_blank");
     //タイトルをテキストとして入れる
//     newa.appendChild(document.createTextNode(pageTitle));
     //↑の代わりにURLかメモ入れる
     var pageMemo = document.getElementById('pageMemo').value;
       //分岐
       const valueResult = (pageMemo.length > 0) ?
         pageMemo :
         pageURL;
     newa.appendChild(valueResult);
     //liにa入れる
     newli.appendChild(newa);
     //作ったやつを挿入
     //参考取得
     var ref = document.getElementById('reference').innerHTML;
     ref.appendChild(newli);
      })
// .fail(function(){});
//  });
