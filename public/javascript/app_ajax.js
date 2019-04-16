function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

$('#createAccount').on('submit', function(evt){
  evt.stopPropagation();
  evt.preventDefault() ;
  var data = {} ;
  $(this).serializeArray().map(function(x){data[x.name] = x.value;});
  // console.log(data.nom);

  $.ajax({
    url : '/users',
    method : 'post',
    data : data
  }).done(function(res){
    // console.log(res) ;
    console.log('Communication avec Ajax' + ' nom : ' +nom+ ' prenom : ' +prenom+ ' email : ' +email+ ' naissance : ' +birth+ ' Mdp : ' +password + 'id :'+id);
  })
})

$('#update_user').on('submit', function(evt){
  evt.stopPropagation();
  evt.preventDefault() ;
  var data = {} ;
  $(this).serializeArray().map(function(x){data[x.name] = x.value;});
  data.id = getCookie("id");
  console.log(data) ;

  var id = getCookie("id");
  $.ajax({
    url : '/users/'+ id,
    method : 'put',
    data : data
  }).done(function(res){
    console.log(res) ;
    console.log('Communication avec Ajax');
  })
})

$('#login_user').on('submit', function(evt){
  evt.stopPropagation();
  evt.preventDefault() ;
  var data = {} ;
  $(this).serializeArray().map(function(x){data[x.name] = x.value;});
  console.log(data) ;

  $.ajax({
    url : '/login',
    method : 'post',
    data : data
  }).done(function(res){
    console.log(res) ;
    // console.log('Communication avec Ajax' + ' nom : ' +nom+ ' prenom : ' +prenom+ ' email : ' +email+ ' naissance : ' +birth+ ' Mdp : ' +password + 'id :'+id);
  })
})
