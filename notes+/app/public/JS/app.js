var easter_egg = new Konami(function() { window.location.assign("/secret");});
$('#theme').on('change',function(){
     if( $(this).val()==="-Custom-"){
       $("#advanced").toggleClass('hidden');
     }
     else{
       $("#advanced").addClass('hidden');
     }
 });

 $('#type').on('change',function(){
    if( $(this).val()==="Default"){
      $("#default").toggleClass('hidden');
    }
    else{
      $("#default").addClass('hidden');
    }
});

$('.posttext').on('change', function () {
  var id = this.id;
  $("#form_" + id).submit();
});

$('.editnote-btn').on('click', function() {
  $('#editpage').submit();
});

$(".page").height( $(".page")[0].scrollHeight );
