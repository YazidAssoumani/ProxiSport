$('#connexion').hide();
$('#block_connexion').hide();
$('#block_inscription').hide();
$('#user_connected').hide();
$('#block_informations_user').hide();

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
      alert('inscription validée :)');
      $('#block_inscription').hide();
    }
  })
})

$('#update_user').on('submit', function(evt){
  evt.stopPropagation();
  evt.preventDefault() ;
  var data = {} ;
  $(this).serializeArray().map(function(x){data[x.name] = x.value;});
  $.ajax({
    url : '/users/'+ data.id,
    method : 'put',
    data : data
  }).done(function(res){
    console.log(res) ;
    if(res.message == 'Le compte est MAJ'){
      alert(res.message);
      $('#connexion').hide();
      $('#update_user').hide();
    }
    else{
      alert(res.message);
    }
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
      alert('connexion établie :)');
      $('#connexion').hide();
      $('#block_connexion').hide();
      $('#user_connected').show();
      $('#user').hide();
      $('#user_connected').html(res.result.email);

      $('#update-nom').val(res.result.nom);
      $('#update-prenom').val(res.result.prenom);
      $('#update-email').val(res.result.email);
      $('#update-birth').val(res.result.birth);
      $('#user-id').val(res.result._id);

    }
    else{
      alert(res.message);
    }
  })
})

$('#delete_user').on('click', function(evt){

  $.ajax({
    url : '/users/' + $('#user-id').val(),
    method : 'delete'
  }).done(function(res){
    console.log(res) ;
    if (res.message == 'Le compte est supprimer'){
      $('#connexion').hide();
      alert(res.message);
      alert('Vas y tire toi');
      $('#block_informations_user').hide();
      $('#user').show();
      $('#user_connected').html('');
      $('#user_connected').hide();
      $('#update-nom').val('');
      $('#update-prenom').val('');
      $('#update-email').val('');
      $('#update-birth').val('');
      $('#user-id').val('');
    }
    else{
      console.log(res);
      alert(res.message);
    }
  })
})

$('#deconnexion').on('click', function(evt){

  $.ajax({
    url : '/login/' + $('#user-id').val(),
    method : 'get'
  }).done(function(res){
    console.log(res) ;
    if (res.message == 'Deconnexion ok'){
      alert('A bientôt');
      $('#connexion').hide();
      $('#block_informations_user').hide();
      $('#user').show();
      $('#user_connected').html('');
      $('#user_connected').hide();
      $('#update-nom').val('');
      $('#update-prenom').val('');
      $('#update-email').val('');
      $('#update-birth').val('');
      $('#user-id').val('');
    }
    else{
      alert(res.message);
    }
  })
})

$('#users').on('click', function(evt){
  $('#connexion').show();
  $('#block_connexion').toggle();
  $('#block_inscription').hide();
})

$('#lien_inscription').on('click', function(evt){
  $('#block_connexion').hide();
  $('#block_inscription').show();
})

$('.fa-times').on('click', function(evt){
  $('#connexion').hide();
  $('#block_connexion').hide();
  $('#block_inscription').hide();
  $('#block_informations_user').hide();
})

$('#user_connected').on('click', function(evt){
  $('#block_informations_user').show();
  $('#connexion').show();
})