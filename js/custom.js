$(document).ready(function(){
    var doc = $(document);

	if ($(".filter-checkbox").length > 0 ) {
        $(".filter-checkbox").styler();
    }

    if ($(".filter-radio").length > 0 ) {
        $(".filter-radio").styler();
    }

    if ($(".select").length > 0 ) {
        $(".select").styler();
    }

    doc.on('click', '[data-tab]', function(e){
        var this_data = $(this).data("tab"),
            this_block = $(this).closest(".tabs-wrapper");

        this_block.find("[data-tab]").removeClass("active");
        this_block.find("[data-tab="+this_data+"]").addClass("active");

        this_block.find("[data-slide]").removeClass("active");
        this_block.find("[data-slide="+this_data+"]").addClass("active");
        e.preventDefault();
    });

    doc.on('click', '[data-filter-btn="toggle"]', function(e){
        $(".b-sidebar-filter").toggleClass("active");
        filter_geight();
        e.preventDefault();
    });

    doc.on('click', '.b-set-products__item', function(e){
        $(this).toggleClass("active");
        e.preventDefault();
    });

    doc.on('click', '.up-site-btn', function(e){
        $('body,html').animate({scrollTop:0},800);
        e.preventDefault();
    });

	doc.on('click', '.b-header-teaser__close', function(e){
		$(".b-header-teaser").slideUp(400);
        e.preventDefault();
    });

    doc.on('click', '.b-header-teaser__close', function(e){
        $(".b-header-teaser").slideUp(400);
        e.preventDefault();
    });

	doc.on('click', '.accordion-toggle', function(e){
        $(this).toggleClass("active");
		$(this).closest(".b-accordion-item").find(".b-accordion-item__popup").stop().slideToggle(400);
        e.preventDefault();
    });


    doc.on('click', '.b-dropbox__static', function(e){
        var this_dropbox = $(this).closest(".b-dropbox");

        if (!this_dropbox.hasClass("active")) {
            this_dropbox.toggleClass("active");
            this_dropbox.find(".b-dropbox__popup").slideToggle(400, filter_geight);
        }
        e.preventDefault();
    });


    doc.on('click', '.save-product-btn', function(e){
        if ($(this).hasClass("active")) {
            $(this).removeClass("active");
        } else {
            $(this).addClass("active");
            var this_click = $(this);
            product_saved(this_click);
        }
        
        e.preventDefault();
    });

    doc.on('mouseenter', '[data-fade-nav]', function(e){
       var  this_elem = $(this).data("fade-nav"),
            this_slider = $(this).closest(".b-fade-slider");
        this_slider.find("[data-fade-nav]").removeClass("active");
        $(this).addClass("active");
        this_slider.find("[data-fade-slide]").removeClass("active");
        this_slider.find("[data-fade-slide="+this_elem+"]").addClass("active");
        e.preventDefault();
    });

	doc.click(function(e){
        var target = $(e.target),
            filter = target.closest(".b-filter-select");
        if (!filter.length > 0) {
            $(".b-filter-select").removeClass("open");
        } else if(target.hasClass('b-filter-select__name')) {
        	$(".b-filter-select").not(filter).removeClass("open");
        	filter.toggleClass("open");
        }
    });



    function filter_fix() {
        var doc_pos = doc.scrollTop();
        console.log(doc_pos);
    }

    function filter_geight() {
        var filt_h = $("#b-sidebar-filter").outerHeight(),
            fix_filt_h = $("#b-fix-filter").outerHeight(),
            cat_header_h = $("#b-catalog-header").outerHeight();

        if (!$(".b-sidebar-filter").hasClass("active")) {
            $(".b-catalog-m-content").css("min-height", 1);
            $("#b-sidebar-filter").css("top", -95);
        } else {
            $(".b-catalog-m-content").css("min-height", filt_h - 157);
            $("#b-sidebar-filter").css("top", -(fix_filt_h+cat_header_h));

        }
    }

    function product_saved(this_click) {
        $("body").append("<span class='saved-animation'></span>");
        var this_elem = $(".saved-animation");
        var anim_elem = this_click.find(".icon");
            pos_top = anim_elem.offset().top,
            pos_left = anim_elem.offset().left;
        console.log(pos_top, pos_left);
        this_elem.css({"left": pos_left, "top": pos_top});
        setTimeout(function(){
            $(".saved-animation").addClass("anim");
        },100);
        

        setTimeout(function(){
            $(".saved-animation").remove();
        },1000);
        
    }


    doc.scroll(function(){
        filter_fix();
    });
});
