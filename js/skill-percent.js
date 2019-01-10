$(function(){
	var $about = $('#about');
	var skillbarIsNotShow = true;
	var $skillbar = $('.skills').children().children('span');
	var $percNum = $skillbar.children('span');

	//动态效果展示技能百分数，宽度计算方法为class的数字值乘3
	function display(){
		$skillbar.width(0);
		$skillbar.each(function(){
			$(this).children('span').text($(this).attr('class').substr(4) + "%");
			$(this).animate({
				width:$(this).attr('class').substr(4) * 3
			},1000,function(){
				$percNum.fadeIn();
			});
		})
	}

	$(window).scroll(function(){
		if(skillbarIsNotShow && $(window).scrollTop() >= $about.offset().top + 200){
			display();
			skillbarIsNotShow = false;
		}
	})
})
