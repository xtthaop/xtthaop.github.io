/*
 *the images preload plugin
 */
(function($) {
    $.fn.preload = function(options) {
        var opts = $.extend({}, $.fn.preload.defaults, options);

        return this.each(function() {
            var $e = $(this),
                t = $e.attr('rel'),
                i = $e.attr('href'),
                l = 0;
            $('<img/>').on('load',function(i){
                ++l;
                if(l==2) opts.onComplete();
            }).attr('src',i);   
            $('<img/>').on('load',function(i){
                ++l;
                if(l==2) opts.onComplete();
            }).attr('src',t);
        });
    };
    $.fn.preload.defaults = {
        onComplete  : function(){return false;}
    };
})(jQuery);