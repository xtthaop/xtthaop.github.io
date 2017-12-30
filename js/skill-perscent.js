$(function(){
	var flag = true;
	var $skills = $('.skills').children().children('span');
	var $percNum = $skills.children('span');

	function run(){
		$skills.width(0);
		$skills.each(function(){
			$(this).children('span').text($(this).attr('class').substr(4) + "%");
			$(this).animate({
				width:$(this).attr('class').substr(4) * 3
			},1000,function(){
				$percNum.fadeIn();
			});
		})
	}
	$(window).scroll(function(){
		if($(window).scrollTop() >= $about.offset().top + 200 && flag){
			setTimeout(run,100);
			flag = false;
		}
	})
})
