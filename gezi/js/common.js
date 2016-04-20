;
$(function() {
    $('.link-follow a.weixin').hover(function() {
        $('.qrcode_show').stop().fadeIn(1000);
    }, function() {
        $('.qrcode_show').stop().fadeOut(200);
    })
});
$(function() {
    
    $(document).scroll(function() {
		//console.log($('div[data-content]'));
		var d = $('div[data-content]').scrollTop();
		//console.log(d)
        /*var $menu = $('.menu'),
            stop = $(document).scrollTop();
        if (stop >= 134) {
            if ($menu.css('position') != 'fixed') {
                $menu.css({
                    top: '0px',
                    position: 'fixed'
                })
            }
        } else {
            if ($menu.css('position') == 'fixed') {
                $menu.css({
                    top: '0px',
                    position: 'static'
                })
            }
        }*/
    })
    $('.menu>li>a').click(function(e) {
        // e.preventDefault();
        // var $this = $(this);
        // if(!$this.next('.submenu').is(':hidden')) return;
        // $this.addClass('active').next('.submenu').slideDown().closest('.menu').children('li').children('a').not($this).removeClass('active');
    });
    var isScroll=false;
    $('.submenu a').click(function(e) {
        e.preventDefault();
        var $this = $(this),
            target;
        if (!$this.is('.active')) {
            $this.closest('.menu').find('.submenu a').removeClass('active');
            $this.addClass('active');
            var href = $this.prop('href');
            if (/(#\w+)/g.test(href) && (target = RegExp.$1) && target != '') {
                var offsetTop = $(target).offset().top-134;
				isScroll=true;
                $("body,html").animate({
                    scrollTop: offsetTop
                }, 300,function(){
                    isScroll=false;
                });
            }
        }else{
            var href = $this.prop('href');
            if (/(#\w+)/g.test(href) && (target = RegExp.$1) && target != '') {
                var offsetTop = $(target).offset().top-134;
                isScroll=true;
                $("body,html").animate({
                    scrollTop: offsetTop
                }, 300,function(){
                    isScroll=false;
                });
            }
        }
        return false;
    })
    $('footer a').click(function(e){

        var reg = /\/(\w+).html#?/;     
        if(reg.test($(this).prop('href'))){
            var a1 = RegExp.$1;
            if(reg.test(location.href)){
                var a2 = RegExp.$1;
                if(a1==a2){
                    if(/(#\w+)/g.test($(this).prop('href'))){
                        var t = RegExp.$1;
                        $('.menu>li>a.active+.submenu li a[href='+t+']').click();
                    }
                }
            }
        }
    })
	
	function parseLink() {
        var href = location.href,target;
        if (/(#\w+)/g.test(href) && (target = RegExp.$1) && target != '') {
			$('.submenu').find('a[href=' + target + ']').click();
			$('.menu').find('a[href=' + target + ']').addClass('active');
        } else {
            $('.menu>li>a.active+.submenu a').eq(0).addClass('active');
        }
    }
    parseLink();
	$(document).scroll(function(){
		if(isScroll) return ;
		var pTop = $(this).scrollTop()+140;
		var els = $('div[data-content]').filter(function(){
			var top = $(this).offset().top;
			//console.log(top,pTop);
			if(top <= pTop) return true;
		});
		if(els.length>0){
			$('.menu>li>a.active+.submenu li a').filter(function(){
				if($(this).prop('href').indexOf('#'+els.last().prop('id'))>-1 && !$(this).is('.active')){
                    $('.menu>li>a.active+.submenu li a').removeClass('active');
                    $(this).addClass('active');
                }
			})
		}
	})
})
