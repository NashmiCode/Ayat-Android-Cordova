(function(){
  'use strict';
  var pages = [
    {file:'index.html',label:'الرئيسية',icon:'⌂'},
    {file:'web3.html',label:'القرآن',icon:'📖'},
    {file:'web2.html',label:'الأحاديث',icon:'📜'},
    {file:'web1.html',label:'السنن',icon:'🌿'}
  ];
  var name = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  var nav = document.createElement('nav');
  nav.className = 'ayat-bottom-nav'; nav.setAttribute('aria-label','التنقل بين أقسام آيات');
  pages.forEach(function(p){
    var a = document.createElement('a'); a.href=p.file;
    a.setAttribute('aria-label',p.label); a.innerHTML='<span aria-hidden="true">'+p.icon+'</span>'+p.label;
    if(name===p.file) a.setAttribute('aria-current','page');
    nav.appendChild(a);
  });
  document.body.appendChild(nav);
  var banner=null;
  function updateOnlineState(){
    if(!navigator.onLine){
      if(!banner){banner=document.createElement('div');banner.className='ayat-connection-banner';banner.setAttribute('role','status');document.body.appendChild(banner);}
      banner.textContent='أنت بدون إنترنت: القرآن والتفسير والصوتيات تحتاج اتصالًا بالشبكة';
    }else if(banner){banner.remove(); banner=null;}
  }
  addEventListener('online',updateOnlineState);addEventListener('offline',updateOnlineState);updateOnlineState();
  // Cordova serves local assets on https://localhost; do not register a web PWA worker there.
  if('serviceWorker' in navigator && /^https:$/.test(location.protocol) && !['localhost','127.0.0.1'].includes(location.hostname) && !window.cordova){
    addEventListener('load',function(){navigator.serviceWorker.register('./sw.js',{scope:'./'}).catch(function(e){console.warn('SW:',e);});});
  }
})();
