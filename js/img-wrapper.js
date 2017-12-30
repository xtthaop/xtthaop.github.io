$(function() {
    //some elements..
    var $ps_container       = $('#ps_container'),
        $ps_image_wrapper   = $ps_container.find('.ps_image_wrapper'),
        $ps_next            = $ps_container.find('.ps_next'),
        $ps_prev            = $ps_container.find('.ps_prev'),
        $ps_nav             = $ps_container.find('.ps_nav'),
        $tooltip            = $ps_container.find('.ps_preview'),
        $ps_preview_wrapper = $tooltip.find('.ps_preview_wrapper'),
        $links              = $ps_nav.children('li').not($tooltip),
        total_images        = $links.length,
        currentHovered      = -1,
        current             = 0,
        $loader             = $('#loader');
    
    $tooltip.css({opacity : 0}).show();
        
    var loaded  = 0;
    $links.each(function(i){
        var $link = $(this);
        $link.find('a').preload({
            onComplete : function(){
                ++loaded;
                if(loaded == total_images){
                    $loader.hide();
                    $ps_container.show();
                    $links.bind('mouseenter',showTooltip)
                          .bind('mouseleave',hideTooltip)
                          .bind('click',showImage);
                    $ps_next.bind('click',nextImage);
                    $ps_prev.bind('click',prevImage);
                }
            }
        });
    });
    
    function showTooltip(){
        var $link           = $(this),
            idx             = $link.index(),
            linkOuterWidth  = $link.outerWidth(),
            left            = parseFloat(idx * linkOuterWidth) - $tooltip.width()/2 + linkOuterWidth/2,
            $thumb          = $link.find('a').attr('rel'),
            imageLeft;
        
        if(currentHovered != idx){
            if(currentHovered != -1){
                if(currentHovered < idx){
                    imageLeft   = 75;
                }
                else{
                    imageLeft   = -75;
                }
            }
            currentHovered = idx;
            
            var $newImage = $('<img/>').css('left','0px').attr('src',$thumb);

            if($ps_preview_wrapper.children().length > 1)
                $ps_preview_wrapper.children(':last').remove();
            
            $ps_preview_wrapper.prepend($newImage);
            
            var $tooltip_imgs       = $ps_preview_wrapper.children(),
                tooltip_imgs_count  = $tooltip_imgs.length;
                
            if(tooltip_imgs_count > 1){
                $tooltip_imgs.eq(tooltip_imgs_count-1)
                             .stop()
                             .animate({
                                left:-imageLeft+'px'
                              },150,function(){
                                    $(this).remove();
                              });
                $tooltip_imgs.eq(0)
                             .css('left',imageLeft + 'px')
                             .stop()
                             .animate({
                                left:'0px'
                              },150);
            }
        }

        $tooltip.stop().animate({left:left + 'px',opacity:1},150);
    }
    
    function hideTooltip(){
        $tooltip.stop().animate({opacity:0},150);}
    
    function showImage(e){
        var $link               = $(this),
            idx                 = $link.index(),
            $image              = $link.find('a').attr('href'),
            $currentImage       = $ps_image_wrapper.find('img'),
            currentImageWidth   = $currentImage.width();
        
        if(current == idx) return false;
        
        $links.eq(current).removeClass('selected');
        $link.addClass('selected');

        var $newImage = $('<img/>').css('left',currentImageWidth + 'px')
                                   .attr('src',$image);

        if($ps_image_wrapper.children().length > 1){
            $ps_image_wrapper.children(':last').remove();
        }

        $ps_image_wrapper.prepend($newImage);

        var newImageWidth   = $newImage.width();

        if(current > idx){
            $newImage.css('left',-newImageWidth + 'px');
            currentImageWidth = -newImageWidth;
        }
        current = idx;

        $ps_image_wrapper.stop().animate({
            width   : newImageWidth == 0 ? 636+'px' : + newImageWidth + 'px'
        },350);
        $newImage.stop().animate({
            left    : '0px'
        },350);
        $currentImage.stop().animate({
            left    : -currentImageWidth + 'px'
        },350);
    
        e.preventDefault();
    }               
    
    function nextImage(){
        if(current < total_images){
            $links.eq(current+1).trigger('click');
        }
    }
    function prevImage(){
        if(current > 0){
            $links.eq(current-1).trigger('click');
        }
    }
});
