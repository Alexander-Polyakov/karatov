$(document).ready(function(){

    function animation_init() {
        move_el_init($('*[data-elmove="true"], *[data-elmove="group"]'));

        setTimeout(function() {
            move_el_action($('*[data-elmove="true"]'));
            move_el_group($('*[data-el-group="group"]'));
        }, 1500)
    }

    animation_init();


    function move_el_init(el) {
        el.each(function(){
            var dur, posX, posY, transform_v, delay;

            if(!$(this).data('dur'))
                dur = 2;
            else
                dur = $(this).data('dur')



            posX = $(this).data('left')+'px';
            posY = $(this).data('top')+'px';

            if($(this).data('transform')) {
                transform_v = $(this).data('transform');
            } else {
                transform_v = '';
            }

            if($(this).data("delay")) {
                delay = $(this).data('delay');
            } else {
                delay = 0;
            }

            $(this).css({'transform': 'translate('+posX+', '+posY+') '+transform_v, opacity:0});
            var bll = $(this);
            setTimeout(function(){
                bll.css({transition:'all '+dur+'s ease', 'transition-delay': delay+'s'});
            }, 100)
        });
    }

    function move_el_action(el) {
        el.each(function() {
            if (check_pos($(this)) !== true || $(this).hasClass('animation_done__'))
                return;

            if($(this).data("height")) {
                h0_need = $(this).data('height')+'px';
                $(this).css({
                    'transform': 'translate(0,0) scale(1)',
                    opacity: 1,
                    height: h0_need

                }).addClass('animation_done__');
            } else {
                $(this).css({
                    'transform': 'translate(0,0) scale(1)',
                    opacity: 1,

                }).addClass('animation_done__');
            }


        })
    }

    function move_el_group(el) {
        el.each(function(){
            if (check_pos($(this)) !== true || $(this).hasClass('animation_done__'))
                return;

            $(this).addClass('animation_done__');

            $(this).find('*[data-elmove="group"]').each(function(){

                if($(this).data("height")) {
                    h0_need = $(this).data('height')+'px';
                    $(this).css({
                        'transform': 'translate(0,0) scale(1)',
                        opacity: 1,
                        height: h0_need

                    }).addClass('animation_done__');
                } else {
                    $(this).css({
                        'transform': 'translate(0,0) scale(1)',
                        opacity: 1,

                    }).addClass('animation_done__');
                }
            });
        });
    }

    function check_pos(bl) {

        if (bl.data('force-start') == true)
            return true;

        var top_pos = bl.offset().top,
            wh = $(window).height(),
            wpos = $(window).scrollTop(),
            wbot = wh + wpos - wh * 0.3;


        if (wbot > top_pos) {
            return true;
        } else {
            return false;
        }
    }


    $(window).scroll(function() {
        move_el_action($('*[data-elmove="true"]'));
        move_el_group($('*[data-el-group="group"]'));
    });


})




