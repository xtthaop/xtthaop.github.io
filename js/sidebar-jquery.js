var $nav = $('nav li');
// nav setup @ mouseevents
$nav.bind('click', function(ev) {
	$nav.removeClass('active');
	$(this).addClass('active');
	$nCurrentActive = $(this).attr('id').substr(4);
});
$('#nav-logo').bind('click', function() {
	$nav.removeClass('active');
	$('#nav-1').addClass('active');
});
//nav setup @ window scroll
$contact    =  $('section[id="contact"] header');
$about      =  $('section[id="about"] header');
$collection =  $('section[id="collection"] header');
$(window).scroll(function() {
	if($(window).scrollTop() >= $contact.offset().top - 500)
	{
		$nav.removeClass('active');
		$('#nav-4').addClass('active');
	}
	else if($(window).scrollTop() >= $collection.offset().top - 500)
	{
		$nav.removeClass('active');
		$('#nav-3').addClass('active');
	}
	else if($(window).scrollTop() >= $about.offset().top - 500)
	{
		$nav.removeClass('active');
		$('#nav-2').addClass('active');
	}
	else
	{
		$nav.removeClass('active');
		$('#nav-1').addClass('active');
	}
});
//window scroll setup
$nav.bind('click',function(e){
	e.preventDefault();
	$target = $(e.target);
	tarHref = $target.attr('href');
	if(tarHref == 'home'){
		$('html,body').animate({scrollTop: $('section[id="top"]').offset().top}, 100);
	}else{
		$('html,body').animate({scrollTop: $('section[id='+tarHref+'] header').offset().top}, 200);
	}	
})