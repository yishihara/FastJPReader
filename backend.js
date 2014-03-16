(function(){
  //loading tiny_segmenter
  var tinysegmenter = 'https://raw.github.com/yishihara/FastJPReader/master/tiny_segmenter-0.2.js';
  loadScript(tinysegmenter, doAll);

  function loadScript(src, onloadFunc){
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.onreadystatechange = function(){
      if(this.readyState == 'complete') everything();
    }
    script.onload = function(){
      onloadFunc();
    }
    script.src = src;
    head.appendChild(script);
  }

  function doAll(){
    var selection = window.getSelection();
    if(selection == ""){
      alert("テキストを選択してください！");
      return false;
    }

    var overlay = document.createElement('div');
    overlay.setAttribute("id", "fastjpreaderoverlay");
    overlay.setAttribute("class", "fastjpreaderoverlay");
    document.body.appendChild(overlay);
    document.getElementById("fastjpreaderoverlay").style.position="fixed";
    document.getElementById("fastjpreaderoverlay").style.top="25%";
    document.getElementById("fastjpreaderoverlay").style.left="0";
    document.getElementById("fastjpreaderoverlay").style.width="100%";
    document.getElementById("fastjpreaderoverlay").style.height="50%";
    document.getElementById("fastjpreaderoverlay").style.backgroundColor="white";
    document.getElementById("fastjpreaderoverlay").style.verticalAlign="bottom";

    var style = document.createElement("style");
    style.innerHTML = ".jptext {font-size:300%; width:100%;} span.middle {color:red} span.left {float:left; text-align:right; vertical-align:middle; width:45%; line-height:200px;} span.right{float:right; text-align:left; width:55%; line-height:200px;}";
    document.getElementsByTagName('head')[0].appendChild(style);

    var wordspermin = parseInt(prompt("毎分なん文字にしますか？（推薦４００字）"));
    var time = 60/wordspermin * 1000;

    var segmenter = new TinySegmenter();
    var segs = segmenter.segment(selection.toString());

    document.getElementById('fastjpreaderoverlay').innerHTML = '<strong><div id="jptext" class="jptext"></div></strong>';

    segs = smarterSegmentation(segs);
    //alert(segs.join(" | "));

    displayTextWindow(segs, time);
  }

  function addingSpace(text){
    var redpos = Math.floor((text.length+1)/2)-1;
    if(redpos < 0) redpos = 0;
    var redtext = "<span class=\"middle\">" + text[redpos] + "</span>";
    //var redtext = text[redpos];
    var newtext = "<span class=\"left\">" + text.substring(0,redpos) + "</span>" + "<span class=\"right\">" + redtext + text.substring(redpos+1, text.length) + "</span>";
    return newtext;
  }

  function displayTextWindow(segs, time){
    var i = 0;
    var interval = 1.1;
    var ttime = time;
    function displayText(){
      setTimeout(function(){
        document.getElementById("jptext").innerHTML = addingSpace(segs[i]);
        i++;
        if(i < segs.length){
          displayText();
        }
        else{
          document.getElementById("jptext").innerHTML = '<span class="left"><a href="javascript:(function(){document.body.removeChild(document.getElementById(\'fastjpreaderoverlay\'));})();">閉じる</a></span>';
        }
      }, ttime);
      ttime = time * Math.pow(interval, segs[i].length);
    }

    displayText();
  }

  function smarterSegmentation(segs){
    var newseg = new Array();
    newseg.push(segs[0]);
    for(var i=1; i<segs.length; i++){
      if(segs[i].length == 1 && isHiragana(segs[i])){
        newseg[newseg.length-1] += segs[i];
      }
      /*
      else if(!isHiragana(segs[i]) && !isKatakana(segs[i]) && !isKanji(segs[i])){
        var temp = newseg[newseg.length-1];
        if(!isHiragana(temp) && !isKatakana(temp) && !isKanji(temp)) newseg[newseg.length-1] += segs[i];
        else newseg.push(segs[i]);
      }
      */
      else if((segs[i] >= "0" && segs[i] <= "9")){
        newseg[newseg.length-1] += segs[i];
      }
      else newseg.push(segs[i]);
    }
    return newseg;
  }

  function isKanji(c){
    var unicode = c.charCodeAt(0);
    if( (unicode>=0x4e00  && unicode<=0x9fcf) ||
        (unicode>=0x3400  && unicode<=0x4dbf) ||
        (unicode>=0x20000 && unicode<=0x2a6df) ||
        (unicode>=0xf900  && unicode<=0xfadf) ||
        (unicode>=0x2f800 && unicode<=0x2fa1f) )
      return true;
    return false;
  }

  function isHiragana(c){
    var unicode = c.charCodeAt(0);
    if( unicode>=0x3040 && unicode<=0x309f ) return true;
    return false;
  }

  function isKatakana(c){
    var unicode = c.charCodeAt(0);
    if( unicode>=0x30a0 && unicode<=0x30ff ) return true;
    return false;
  }
})();
