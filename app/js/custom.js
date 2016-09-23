$(document).ready(function () {
    var doc = $(document);

    if ($(".filter-checkbox").length > 0) {
        $(".filter-checkbox").styler();
    }

    if ($(".filter-radio").length > 0) {
        $(".filter-radio").styler();
    }

    if ($(".select").length > 0) {
        $(".select").styler();
    }


    doc.on('click', '.b-search__submit', function (e) {
        var value_input = $(this).closest(".b-search").find(".b-search__input").val(),
            this_search = $(this).closest(".b-search");

        if ((doc.outerWidth() < 992) && (value_input == "")) {
            this_search.addClass("open");
            e.preventDefault();
        } else if ((doc.outerWidth() < 992) && (!this_search.hasClass("open"))) {
            this_search.addClass("open");
            e.preventDefault();
        }
    });


    doc.on('click', '[data-tab]', function (e) {
        var this_data = $(this).data("tab"),
            this_block = $(this).closest(".tabs-wrapper");

        this_block.find("[data-tab]").removeClass("active");
        this_block.find("[data-tab=" + this_data + "]").addClass("active");

        this_block.find("[data-slide]").removeClass("active");
        this_block.find("[data-slide=" + this_data + "]").addClass("active");
        e.preventDefault();
    });

    doc.on('click', '[data-filter-btn="toggle"]', function (e) {
        $(".b-sidebar-filter").toggleClass("active");
        filter_height();
        e.preventDefault();
    });

    doc.on('click', '.b-set-products__item-check', function (e) {
        $(this).toggleClass("active");
        e.preventDefault();
    });

    doc.on('click', '.up-site-btn', function (e) {
        $('body,html').animate({scrollTop: 0}, 800);
        e.preventDefault();
    });

    doc.on('click', '.b-header-teaser__close', function (e) {
        $(".b-header-teaser").slideUp(400).addClass("hidden_el");
        e.preventDefault();
    });

    doc.on('click', '.mobile-menu-btn', function (e) {
        $(this).toggleClass("active");
        $("body").toggleClass("x-ovh");
        doc.find(".b-site-wrapper").toggleClass("menu-open");
        e.preventDefault();
    });


    doc.on('click', '.accordion-toggle', function (e) {
        $(this).toggleClass("active");
        $(this).closest(".b-accordion-item").find(".b-accordion-item__popup").stop().slideToggle(400);
        e.preventDefault();
    });


    doc.on('click', '.b-dropbox__static', function (e) {
        var this_dropbox = $(this).closest(".b-dropbox");

        if (!this_dropbox.hasClass("active")) {
            this_dropbox.toggleClass("active");
            this_dropbox.find(".b-dropbox__popup").stop().slideToggle(400);
        } else {
            $(".b-dropbox").removeClass("active");
            this_dropbox.addClass("active");
            this_dropbox.find(".b-dropbox__popup").stop().slideToggle(400);
        }
        e.preventDefault();
    });


    doc.on('click', '.save-product-btn', function (e) {
        if ($(this).hasClass("active")) {
            $(this).removeClass("active");
        } else {
            $(this).addClass("active");
            var this_click = $(this);
            product_saved(this_click);
        }

        e.preventDefault();
    });

    doc.on('mousemove', function (e) {
        var l = $('.b-container:eq(0)').offset().left,
            l_mouse = e.clientX;

        if (l < l_mouse) {
            $('.up-site-btn').removeClass('dark');
        } else {
            $('.up-site-btn').addClass('dark');
        }
        // console.log(e.clientX)
    });

    doc.on('mouseenter', '[data-fade-nav]', function (e) {
        var this_elem = $(this).data("fade-nav"),
            this_slider = $(this).closest(".b-fade-slider");
        this_slider.find("[data-fade-nav]").removeClass("active");
        $(this).addClass("active");
        this_slider.find("[data-fade-slide]").removeClass("active");
        this_slider.find("[data-fade-slide=" + this_elem + "]").addClass("active");
        e.preventDefault();
    });

    doc.click(function (e) {
        var target = $(e.target),
            filter = target.closest(".b-filter-select"),
            search = target.closest(".b-search");

        if (!filter.length > 0) {
            $(".b-filter-select").removeClass("open");
        } else if (target.hasClass('b-filter-select__name')) {
            $(".b-filter-select").not(filter).removeClass("open");
            filter.toggleClass("open");
        }

        if ((search.length == 0) && (doc.outerWidth() < 992)) {
            doc.find(".b-search").removeClass("open");
        }

    });


    doc.on('click', '.more-filters-btn', function (e) {
        $(this).closest(".b-filter-section").toggleClass("see-all");
        e.preventDefault();
    });


    doc.on('click', '.filter-height-btn', function (e) {
        setTimeout(function () {
            filter_change();
        }, 500);
        e.preventDefault();
    });


    if (($("#b-sidebar-filter").length > 0) && (!$("#b-sidebar-filter").hasClass("active"))) {
        filter_fix();
    }

    function filter_fix() {
        var doc_pos = doc.scrollTop(),
            cat_body_pos = $("#b-catalog-body").offset().top,
            fix_filt_h = $("#b-fix-filter").outerHeight();

        if (doc_pos > cat_body_pos) {
            $("#b-fix-filter").addClass("fixed");
            $("#b-catalog-body").css("padding-top", fix_filt_h);
        } else if ($("#b-fix-filter").hasClass("fixed") && (doc_pos < cat_body_pos)) {
            $("#b-fix-filter").removeClass("fixed");
            $("#b-catalog-body").css("padding-top", 0);
        }

    }

    function filter_change() {
        var filt_h = $("#b-sidebar-filter").outerHeight(),
            fix_filt_h = $("#b-fix-filter").outerHeight(),
            cat_header_h = $("#b-catalog-header").outerHeight();

        $("#b-catalog-content").css("min-height", filt_h - (fix_filt_h + cat_header_h + 61));
        $("#b-sidebar-filter").css("top", -(fix_filt_h + cat_header_h));
    }


    function filter_height() {
        var filt_h = $("#b-sidebar-filter").outerHeight(),
            fix_filt_h = $("#b-fix-filter").outerHeight(),
            cat_header_h = $("#b-catalog-header").outerHeight();

        if (!$(".b-sidebar-filter").hasClass("active")) {
            $("#b-catalog-content").css("min-height", 1);
            $("#b-sidebar-filter").css("top", -95);
        } else {
            $("#b-catalog-content").css("min-height", filt_h - (fix_filt_h + cat_header_h + 61));
            $("#b-sidebar-filter").css("top", -(fix_filt_h + cat_header_h));

        }
    }

    function product_saved(this_click) {
        $("body").append("<span class='saved-animation'></span>");
        var this_elem = $(".saved-animation");
        var anim_elem = this_click.find(".icon"),
            pos_top = anim_elem.offset().top,
            pos_left = anim_elem.offset().left;

        // console.log(pos_top, pos_left);
        this_elem.css({"left": pos_left, "top": pos_top});

        setTimeout(function () {
            $(".saved-animation").addClass("anim");
        }, 100);


        setTimeout(function () {
            $(".saved-animation").remove();
        }, 1000);

    }


    doc.scroll(function () {
        if (($("#b-sidebar-filter").length > 0) && (!$("#b-sidebar-filter").hasClass("active"))) {
            filter_fix();
        }

        if ($(".header-orange-sep").length > 0) {
            sep_fix();
        }
    });


    doc.on('mouseenter', '.b-increase-hover', function (e) {
        var img_h = $(this).find("img").outerHeight(),
            img_w = $(this).find("img").outerWidth(),
            this_h = $(this).outerHeight(),
            this_w = $(this).outerHeight(),
            percent_h = img_h / this_h,
            persent_w = img_w / this_w,
            offset = $(this).offset();

        increase_hover(percent_h, persent_w, offset);
    });


    sep_fix();

    function sep_fix() {
        var teaser_h = $(".b-header-teaser").outerHeight(),
            w_pos = $(window).scrollTop();


        if (!$(".b-header-teaser").hasClass("hidden_el")) {
            if (w_pos > teaser_h) {
                $(".header-orange-sep").addClass("sep-fix");
            } else {
                $(".header-orange-sep").removeClass("sep-fix");
            }
        } else if ($(".b-header-teaser").hasClass("hidden_el")) {
            $(".header-orange-sep").addClass("sep-fix");
        }


    };

    function increase_hover(percent_h, persent_w, offset) {

        doc.on('mousemove', '.b-increase-hover', function (e) {
            var this_elem = $(this);
            pos_x = (e.pageX - offset.left),
                pos_y = (e.pageY - offset.top),
                need_pers_x = pos_x * persent_w,
                need_pers_y = pos_y * percent_h;

            this_elem.find("img").css({"margin-top": -need_pers_y, "margin-left": -need_pers_x});

            e.preventDefault();
        });
    }


});