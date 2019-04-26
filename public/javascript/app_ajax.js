$('#connexion').hide();
$('#block_connexion').hide();
$('#block_inscription').hide();

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
    console.log(res) ;
    if (res.message == 'ok'){
      alert(res.message);
      $('#block_inscription').hide();
    }
    else{
      alert(res.message);
    }
  })
})

$('#update_user').on('submit', function(evt){
  evt.stopPropagation();
  evt.preventDefault() ;
  var data = {} ;
  $(this).serializeArray().map(function(x){data[x.name] = x.value;});
  console.log(data) ;
  $.ajax({
    url : '/users/'+ id,
    method : 'put',
    data : data
  }).done(function(res){
    console.log(res) ;
    console.log('Communication avec Ajax');
    alert(res.message);
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
    if (res.message == 'ok'){
      alert(res.message);
      $('#block_connexion').hide();
    }
    else{
      alert(res.message);
    }
  })
})

$('#users').on('click', function(evt){
  $('#connexion').show();
  $('#block_connexion').show();
  $('#block_inscription').hide();
})

$('#lien_inscription').on('click', function(evt){
  $('#block_connexion').hide();
  $('#block_inscription').show();
})