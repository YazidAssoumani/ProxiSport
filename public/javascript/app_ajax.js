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
