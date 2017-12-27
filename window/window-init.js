(function(){

	var $content = $('#share-options').detach();   // Remove modal from page

  	$('#share').on('click', function(e) {           // Click handler to open modal
    	modal.open({content: $content, width:1000, height:500});
  	});

}())