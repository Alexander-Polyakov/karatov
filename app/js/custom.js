$(document).ready(function () {
    var doc = $(document);

    if ($(".filter-checkbox").length > 0) {
        // $(".filter-checkbox").styler();
        $('.filter-checkbox').each(function () {
            var cls = $(this).attr('class');
            $(this).wrap('<div class="jq-checkbox"></div>');
            $(this).after('<div class="jq-checkbox__div"></div>');
            $(this).parent().addClass(cls);
        })
    }

    if ($(".filter-radio").length > 0) {
        // $(".filter-radio").styler();
        $('.filter-radio').each(function () {
            var cls = $(this).attr('class');
            $(this).wrap('<div class="jq-radio"></div>');
            $(this).after('<div class="jq-radio__div"></div>');
            $(this).parent().addClass(cls);
        })
    }

    if ($("select").length > 0) {
        $("select").styler();
    }

    if($('.inputmask').length > 0) {
        $('.inputmask').mask("+7 (999) 999-99-99");
    }

    if ($(".b-selects-list__item__select").length > 0) {
        $(".b-selects-list__item__select").styler();
    }


    var options = {
        url: "json/region.json",
        getValue: "city_name",

        template: {
            type: "description",
            fields: {
                description: "region_name"
            }
        },

        list: {
            showAnimation: {
                type: "fade", //normal|slide|fade
                time: 400,
                callback: function() {}
            },

            hideAnimation: {
                type: "sgylide", //normal|slide|fade
                time: 400,
                callback: function() {alert("hi");}
            }
        }

    };

    $("#search-region").easyAutocomplete(options);


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

    doc.on('click', '.b-flag-select__selected', function (e) {
        $(this).closest(".b-flag-select").toggleClass("open");
    });

    doc.on('click', '.b-flag-select__item', function (e) {
        var img_src = $(this).find("img").attr("src"),
            region_wrapper = $(this).closest(".b-phone-region");
        $(this).closest(".b-flag-select").toggleClass("open");
        $(this).closest(".b-flag-select").find(".b-flag-select__selected img").attr("src", img_src);

        if (region_wrapper.length) {
            var data_mask =  $(this).data("mask");
            region_wrapper.find(".region-input").mask(data_mask).attr("placeholder", data_mask);
        }
    });

    doc.on('click', '[data-tab]', function (e) {
        var this_data = $(this).data("tab"),
            this_block = $(this).closest(".tabs-wrapper");
        if ((doc.outerWidth() <= 768) && ($(this).hasClass("active"))) {
            $(this).closest(".b-sliders-tabs__nav").addClass("selection");

        } else {
            this_block.find("[data-tab]").removeClass("active");
            this_block.find("[data-tab=" + this_data + "]").addClass("active");

            this_block.find("[data-slide]").removeClass("active");
            this_block.find("[data-slide=" + this_data + "]").addClass("active");

            $(this).closest(".b-sliders-tabs__nav").removeClass("selection");
        }

        e.preventDefault();

    });

    doc.on('click', '.filter-open-btn', function (e) {

        if (doc.outerWidth() > 768) {
            if ($(".b-sidebar-filter").hasClass("active")) {
                $("#b-catalog-content").css("min-height", 1);
            } else {
                filter_change();
            }
        }

        $(".b-sidebar-filter").toggleClass("active");
        $(this).find(".hamburger").toggleClass("active");
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
        var doc_width = doc.outerWidth();

        if ($(this).hasClass("active")) {
            doc.find(".b-site-wrapper").css("width", "auto");
        } else {
            doc.find(".b-site-wrapper").toggleClass("x-ovh").css("width", doc_width);
        }
        doc.find(".b-site-wrapper__content").toggleClass("menu-open");
        $(this).toggleClass("active");
        e.preventDefault();
    });


    doc.on('click', '.accordion-toggle', function (e) {
        $(this).toggleClass("active");

        if ($(this).closest("#b-sidebar-filter").length) {
            $(this).closest(".b-accordion-item").find(".b-accordion-item__popup").stop().slideToggle(400, filter_change );
        } else {
            $(this).closest(".b-accordion-item").find(".b-accordion-item__popup").stop().slideToggle(400);
        }
        e.preventDefault();
    });


    doc.on('click', '.b-dropbox__static', function (e) {
        var this_dropbox = $(this).closest(".b-dropbox");

        if (!this_dropbox.hasClass("active")) {
            this_dropbox.toggleClass("active");
        } else {
            $(".b-dropbox").removeClass("active");
            this_dropbox.addClass("active");
        }

        if ($(this).closest("#b-sidebar-filter").length) {
            this_dropbox.find(".b-dropbox__popup").stop().slideToggle(400, filter_change);
        } else {
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
        if (doc.outerWidth() > 992) {
            var this_elem = $(this).data("fade-nav"),
                this_slider = $(this).closest(".b-fade-slider");
            this_slider.find("[data-fade-nav]").removeClass("active");
            $(this).addClass("active");
            this_slider.find("[data-fade-slide]").removeClass("active");
            this_slider.find("[data-fade-slide=" + this_elem + "]").addClass("active");
        }
        e.preventDefault();
    });

    doc.click(function (e) {
        var target = $(e.target),
            select = target.closest(".b-filter-select"),
            search = target.closest(".b-search"),
            filter = target.closest("#b-sidebar-filter"),
            filter_btn = target.closest(".b-filter-open"),
            b_saved = target.closest(".b-saved");


        if (!b_saved.length > 0) {
            doc.find(".b-saved").removeClass("opened");
        }

        if (!select.length > 0) {
            $(".b-filter-select").removeClass("open");
        } else if (target.hasClass('b-filter-select__name')) {
            $(".b-filter-select").not(select).removeClass("open");
            select.toggleClass("open");
        }

        if ((search.length == 0) && (doc.outerWidth() < 992)) {
            doc.find(".b-search").removeClass("open");
        }

        if ((filter.length == 0) && (filter_btn.length == 0) && (doc.find("#b-sidebar-filter").hasClass("active"))) {
            doc.find("#b-sidebar-filter").removeClass("active");
            doc.find(".filter-open-btn .hamburger").removeClass("active");
            doc.find("#b-catalog-content").css("min-height", "1px");
        }
    });

    doc.on('click', '.b-events-list__item.b-saved', function (e) {
        $(this).addClass("opened");
        e.preventDefault();
    });

    doc.on('click', '.b-changing__more-btn', function (e) {
        $(this).closest(".b-changing").toggleClass("see-all");
        e.preventDefault();
    });


    doc.on('click', '.filter-height-btn', function (e) {
        if ($("#b-sidebar-filter").hasClass("active")) {
            filter_change();
        }
        e.preventDefault();
    });


    if (($("#b-sidebar-filter").length > 0) && (!$("#b-sidebar-filter").hasClass("active")) && (doc.outerWidth() > 992) ) {
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
            cat_header_h = $("#b-catalog-header").outerHeight(),
            cat_h = $("#b-catalog-content").outerHeight();


        if (cat_h > filt_h) {
            $("#b-sidebar-filter").css("bottom", -61 );
        } else {
            $("#b-catalog-content").css("min-height", filt_h - (fix_filt_h + cat_header_h + 61 ) );
            $("#b-sidebar-filter").css("bottom", "auto");
        }


        $("#b-sidebar-filter").css("top", -(fix_filt_h + cat_header_h));

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

    var id;
    $(window).resize(function(){
        clearTimeout(id);
        id = setTimeout( function(){
            var site_wrapper = doc.find(".b-site-wrapper").outerWidth(),
                doc_width = doc.outerWidth();

            init_mobile_slider();
            doc.find("#b-sidebar-filter").removeClass("active");

            doc.find('.filter-open-btn').find(".hamburger").removeClass("active");

            doc.find("#b-catalog-content").css("min-height", "1px");

            if (doc_width < 769) {
                if (doc_width != site_wrapper) {
                    doc.find(".b-site-wrapper").css("width", doc_width);
                }
            } else {
                doc.find(".b-site-wrapper").css("width", "auto");
                doc.find(".mobile-menu-btn").removeClass("active");
                doc.find(".b-site-wrapper__content").removeClass("menu-open");
            }


        }, 500);
    });

    doc.scroll(function () {
        if (($("#b-sidebar-filter").length > 0) && (!$("#b-sidebar-filter").hasClass("active")) && (doc.outerWidth() > 992) ) {
            filter_fix();
        }

        if (($(".header-orange-sep").length > 0) && (doc.outerWidth() > 768) ) {
            sep_fix();
        }
    });

    init_mobile_slider();

    function init_mobile_slider() {
        var
            best_collection =  $(".b-best-collection__units"),
            similar = $(".b-similar-units"),
            set_slider =  $(".b-set-products");


        if (doc.outerWidth() <= 769) {
            similar.owlCarousel({
                items: 4,
                loop: false,
                nav: false,
                dots: true,
                mouseDrag: true,
                margin: 30,
                responsive: true
            });

        } else {
            // grid_slider.trigger('destroy.owl.carousel').removeClass('owl-carousel owl-loaded');
            // grid_slider.find('.owl-stage-outer').children().unwrap();

            // best_collection.trigger('destroy.owl.carousel').removeClass('owl-carousel owl-loaded');
            // best_collection.find('.owl-stage-outer').children().unwrap();

            similar.trigger('destroy.owl.carousel').removeClass('owl-carousel owl-loaded');
            similar.find('.owl-stage-outer').children().unwrap();

            // set_slider.trigger('destroy.owl.carousel').removeClass('owl-carousel owl-loaded');
            // set_slider.find('.owl-stage-outer').children().unwrap();
        }
    }

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
    }

    doc.on('mouseenter', '.b-increase-hover', function (e) {
        var bl = $(this),
            img = $(this).find('img'),
            img_h = img.outerHeight(),
            img_w = img.outerWidth(),
            this_h = bl.outerHeight(),
            this_w = bl.outerHeight(),
            offset = bl.offset();

        increase_hover(img_h, img_w, this_h, this_w, offset);
    });

    function increase_hover(img_h, img_w, this_h, this_w, offset) {

        doc.on('mousemove', '.b-increase-hover', function (e) {
            // var this_elem = $(this);
            //     pos_x = (e.pageX - offset.left),
            //     pos_y = (e.pageY - offset.top),
            //     need_pers_x = pos_x * persent_w,
            //     need_pers_y = pos_y * persent_h;

            var delta_x = img_w - this_w,
                need_pers_x = delta_x/this_w,
                delta_y = img_h - this_h,
                need_pers_y = delta_y/this_h;

            var this_elem = $(this),
                pos_x = (e.pageX - offset.left),
                pos_y = (e.pageY - offset.top),
                pers_x = pos_x*need_pers_x,
                pers_y = pos_y*need_pers_y;

            this_elem.find("img").css({"top": -pers_y, "left": -pers_x});

            e.preventDefault();
        });
    }


    doc.on('click', '[data-open-popup]', function () {
        doc.find(".b-popups-wrapper").fadeIn(400);

        var data_val = $(this).data("open-popup"),
            need_popup = doc.find("[data-popup="+data_val+"]"),
            popup_height = need_popup.outerHeight();

        if (doc.outerWidth() > 992) {
            doc.find(".b-site-overlay").css("height", popup_height + 235);
        } else {
            doc.find(".b-site-overlay").css("height", popup_height + 130);
        }
        need_popup.fadeIn(500).addClass("active");
        $("body").addClass("ovh");

        if (doc.outerWidth() > 992) {
            setTimeout(function(){
                if ($(".jScrollPane").length) {
                    $(".jScrollPane").jScrollPane();
                }
            },100);
        }
    });

    doc.on('click', '[data-close="popups"]', function () {
        doc.find(".b-popups-wrapper").fadeOut(400);
        doc.find("[data-popup]").fadeOut(500).removeClass("active");
        $("body").removeClass("ovh");
    });





    if ($("#map-popup").length){
        initLandMap();
    }

    var map;

    function initLandMap() {
        map = new google.maps.Map(document.getElementById('map-popup'), {
            center: {lat: 55.750701, lng: 37.617047},
            scrollwheel: false,
            zoom: 7,
            styles:
                [
                    {
                        stylers:
                            [
                                { saturation: -100 },
                                { lightness: 30 }
                            ]
                    }
                ]
        });
    }


});