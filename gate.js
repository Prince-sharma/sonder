/* Bench prototype — access gate for the published site (GitHub Pages).
   A casual gate for a design prototype, not real security: static hosting
   has no server to verify passwords. The password never appears in source —
   only this SHA-256 hash does. Unlock lasts 30 days on this browser.

   Not active when opened from disk (file://) or on localhost.
   The hash is duplicated in access.html — change both together. */
(function(){
  var HASH="a74182d5485176d2d620fd1369134106093ccf644ac9cc731aa5c53bfcffaf83";
  var DAYS=30;
  if(!/^https?:$/.test(location.protocol)) return;
  if(location.hostname==="localhost"||location.hostname==="127.0.0.1") return;
  try{
    var s=(localStorage.getItem("bench-gate")||"").split("|");
    if(s[0]===HASH && Date.now()-(+s[1])<DAYS*864e5) return;
  }catch(e){}
  var me=(document.currentScript&&document.currentScript.src)||"";
  var root=me.replace(/gate\.js(\?.*)?(#.*)?$/,"");
  if(!root) return;
  var next=encodeURIComponent(location.pathname+location.search+location.hash);
  location.replace(root+"access.html?next="+next);
})();
