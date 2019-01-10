var request; //声明当前点击请求变量
var $current; //声明当前显示的图片标签变量
var cache   =  {}; //图片和下载状态对象缓存
var $frame  =  $('#photo-viewer');
var $thumbs =  $('.thumb');

//图片显示到父元素中的函数
function crossfade($img) {
    $current && $current.hide();
    $img.stop().fadeTo('slow', 1);
    $current = $img;
}

//缩略图监听点击事件
$(document).on('click', '.thumb', function(e){
    e.preventDefault(); 
    $thumbs.removeClass('active');
    $(this).addClass('active');//清除所有按钮选中状态，给当前按钮添加选中状态
    var $img;
    var src = this.href;
    request = src;
    if (cache.hasOwnProperty(src) && !cache[src].isLoading) {
        //提高执行效率重复点击不重复执行代码使用缓存中内容
        $frame.removeClass('is-loading')
        crossfade(cache[src].$img); 
    } else {
        //图片加载
        $img = $('<img/>');
        cache[src] = {
            $img: $img,
            isLoading: true
        };
        $img.on('load', function(){
            $img.hide();
            $frame.removeClass('is-loading').append($img);
            cache[src].isLoading = false;
            if (request === src) {
                crossfade($img);
            }
        });
        $frame.addClass('is-loading');
        $img.attr({
            'src': src,
            'alt': this.title || '' 
        });
    }
});

//默认点击第一张缩略图
$thumbs.eq(0).click();