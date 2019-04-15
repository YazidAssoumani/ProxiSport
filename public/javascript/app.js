var map = new ol.Map({
  target: 'map',
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM()
    })
  ],
  view: new ol.View({
    center: ol.proj.fromLonLat([3.974842,43.543136 ]),
    zoom: 16
    
  })
});



map.on('click', console.log);
//      ol.marker([3.974842,43.543136 ]).addTo(map);


document.getElementById('search').addEventListener('submit', function(evt){
  evt.stopPropagation();
  evt.preventDefault();
  var datas = {};
  var els = evt.target.querySelectorAll('[name]') ;
  for(var i in els) {
    if(els[i].name && els[i].value)
      datas[els[i].name] = els[i].value ;
  }
  console.log(datas) ;
})


document.getElementById('ville').addEventListener('keypress', function(evt){
  var q = evt.target.value.replace(' ', '+') ;
  if(q.length >= 3) {
    fetch('https://nominatim.openstreetmap.org/search?q='+q+'&format=json&countrycodes=FR&limit=500').then(function(response) {
      return response.json();
    })
      .then(function(myJson) {
        var container = document.getElementById('listVille') ;
        container.innerHTML = '' ;
        myJson.forEach(function(el) {
          if(el.type == 'administrative') {
            var L = document.createElement('li');
            L.setAttribute('data-lat', el.lat);
            L.setAttribute('data-lng', el.lon);
            L.addEventListener('click', function(evt){
              console.log('click', L)
            });
            L.innerText = el.display_name ;
            container.appendChild(L) ;
          }
        })
//        console.log(JSON.stringify(myJson));
      });
    
  }
  
})