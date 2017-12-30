(function(){
	var $content = $('#window-content').detach();
	var $content1 = $('#window-content1').detach();
  	$('#share').on('click', function(e) {
    	modal.open({content: $content,width:900,height:530});
  	});
  	$('#share1').on('click', function(e) {
    	modal.open({content: $content1,width:900,height:530});
  	});
}())