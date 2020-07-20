var bcSfFilterSettings = {
    general: {
        limit: bcSfFilterConfig.custom.products_per_page,
        loadProductFirst: !0,
        styleScrollToTop: "style2",
        defaultDisplay: bcSfFilterConfig.custom.layout,
        showPlaceholderProductList: !1,
        swatchStyle: "square-list",
        requestInstantly: !0
    }
};

function buildImageStyle(e) {
    var t = e.images_info,
        i = "ProductCardImage-" + e.id,
        a = "ProductCardImageWrapper-" + e.id,
        r = "";
    if (t.length > 0) {
        var l = t[0],
            s = bcSfFilterConfig.custom.max_height,
            n = bcSfFilterConfig.custom.max_height,
            c = l.width / l.height,
            o = 1 * s / n;
        if (l.aspect_ratio < 1) {
            var p = n * c;
            if (l.height <= n) {
                var f = l.height;
                p = l.width
            } else f = n
        } else if (c < o) {
            f = n / c;
            if (l.height <= n) f = l.height, p = l.width;
            else f = n, p = n * c
        } else {
            f = n / c;
            if (l.width <= s) {
                f = l.height;
                p = l.width
            } else {
                f = (p = s) / c
            }
        }
        r += "<style>", r += "@media screen and (min-width: 750px) {", r += "#" + i + " {max-width: " + p + "px;max-height: " + f + "px;}#" + a + " {max-width: " + p + "px;max-height: " + f + "px;}", r += "}", r += "@media screen and (max-width: 749px) {", r += "#" + i + " {max-width: " + (p = c < 1 ? 750 * c : l.width < 750 ? l.width : 750) + "px;max-height: 750px;}#" + a + " {max-width: " + p + "px;}", r += "}", r += "</style>"
    }
    return r
}

function buildPrice(data, onSale, priceVaries) {  
  var priceHtml = '',
    onSaleClass = onSale ? ' price--on-sale' : '';

  priceHtml += '<dl class="price' + onSaleClass + '" data-price>';
  if (bcSfFilterConfig.custom.vendor_enable) {
    priceHtml += '<div class="price__vendor">';
    priceHtml += '<dt>';
    priceHtml += '<span class="visually-hidden">' + bcSfFilterConfig.label.vendor + '</span>';
    priceHtml += '</dt>';
    priceHtml += '<dd>';
    priceHtml += data.vendor;
    priceHtml += '</dd>';
    priceHtml += '</div>';
  }
  priceHtml += '<div class="price__regular">';
  priceHtml += '<dt>';
  priceHtml += '<span class="visually-hidden visually-hidden--inline">' + bcSfFilterConfig.label.regular_price + '</span>';
  priceHtml += '</dt>';
  priceHtml += '<dd>';
  priceHtml += '<span class="price-item price-item--regular" data-regular-price>';
  if (data.available) {
    if (onSale) {
      priceHtml += bcsffilter.formatMoney(data.compare_at_price_min, bcsffilter.moneyFormat);
    } else {
      if(data.price_varies){
      	priceHtml +="from " +  bcsffilter.formatMoney(data.price_min, bcsffilter.moneyFormat);
      }else{
      	priceHtml += bcsffilter.formatMoney(data.price_min, bcsffilter.moneyFormat);
      }
    }
  } else {
    priceHtml += bcSfFilterConfig.label.sold_out;
  }
  priceHtml += '</span>';
  priceHtml += '</dd>';
  priceHtml += '</div>';
  priceHtml += '<div class="price__sale">';
  priceHtml += '<dt>';
  priceHtml += '<span class="visually-hidden visually-hidden--inline">' + bcSfFilterConfig.label.sale_price + '</span>';
  priceHtml += '</dt>';
  priceHtml += '<dd>';
  priceHtml += '<span class="price-item price-item--sale" data-sale-price>';
  priceHtml += bcsffilter.formatMoney(data.price_min, bcsffilter.moneyFormat);
  priceHtml += '</span> ';
  priceHtml += '<span class="price-item__label" aria-hidden="true">' + bcSfFilterConfig.label.sale + '</span>';
  priceHtml += '</dd>';
  priceHtml += '</div>';
  priceHtml += '</dl>';

  return priceHtml;
}

// function buildPrice(e, t, i) {
//     var a = "";
//     return a += '<dl class="price' + (t ? " price--on-sale" : "") + '" data-price>', bcSfFilterConfig.custom.vendor_enable && (a += '<div class="price__vendor">', a += "<dt>", a += '<span class="visually-hidden">' + bcSfFilterConfig.label.vendor + "</span>", a += "</dt>", a += "<dd>", a += e.vendor, a += "</dd>", a += "</div>"), a += '<div class="price__regular">', a += "<dt>", a += '<span class="visually-hidden visually-hidden--inline">' + bcSfFilterConfig.label.regular_price + "</span>", a += "</dt>", a += "<dd>", a += '<span class="price-item price-item--regular" data-regular-price>', e.available ? a += t ? ""bcsffilter.formatMoney(e.compare_at_price_min, bcsffilter.moneyFormat) : bcsffilter.formatMoney(e.price_min, bcsffilter.moneyFormat) : a += bcSfFilterConfig.label.sold_out, a += "</span>", a += "</dd>", a += "</div>", a += '<div class="price__sale">', a += "<dt>", a += '<span class="visually-hidden visually-hidden--inline">' + bcSfFilterConfig.label.sale_price + "</span>", a += "</dt>", a += "<dd>", a += '<span class="price-item price-item--sale" data-sale-price>', a += bcsffilter.formatMoney(e.price_min, bcsffilter.moneyFormat), a += "</span> ", a += '<span class="price-item__label" aria-hidden="true">' + bcSfFilterConfig.label.sale + "</span>", a += "</dd>", a += "</div>", a += "</dl>"
// }

function customizeJsonProductData(e) {
    for (var t = 0; t < e.variants.length; t++) {
        var i = e.variants[t],
            a = e.images.filter(function(e) {
                return e.src == i.image
            });
        a.length > 0 ? i.featured_image = {
            id: a[0].id,
            product_id: e.id,
            position: a[0].position,
            created_at: "",
            updated_at: "",
            alt: null,
            width: a[0].width,
            height: a[0].height,
            src: a[0].src,
            variant_ids: [i.id]
        } : i.featured_image = ""
    }
    var r = bcsffilter;
    return {
        id: e.id,
        title: e.title,
        handle: e.handle,
        vendor: e.vendor,
        variants: e.variants,
        url: r.buildProductItemUrl(e),
        options_with_values: e.options_with_values,
        images: e.images,
        images_info: e.images_info,
        available: e.available,
        price_min: e.price_min,
        price_max: e.price_max,
        compare_at_price_min: e.compare_at_price_min,
        compare_at_price_max: e.compare_at_price_max
    }
}
BCSfFilter.prototype.buildProductGridItem = function(e) {
    var t = e.images_info,
        i = !e.available,
        a = e.compare_at_price_min > e.price_min,
        r = e.price_min != e.price_max,
        l = e.variants[0];
    if (null !== getParam("variant") && "" != getParam("variant")) {
        var s = e.variants.filter(function(e) {
            return e.id == getParam("variant")
        });
        void 0 !== s[0] && (l = s[0])
    } else
        for (var n = 0; n < e.variants.length; n++)
            if (e.variants[n].available) {
                l = e.variants[n];
                break
            } var c = bcSfFilterTemplate.productGridItemHtml,
        o = "";
    switch (bcSfFilterConfig.custom.products_per_row) {
        case 2:
            o = "medium-up--one-half", "540x600";
            break;
        case 3:
            o = "small--one-half medium-up--one-third", "345x550";
            break;
        case 4:
            o = "small--one-half medium-up--one-quarter", "250x";
            break;
        case 5:
            o = "small--one-half medium-up--one-fifth", "195x"
    }
    c = c.replace(/{{itemGridWidthClass}}/g, o);
    var p = i ? bcSfFilterTemplate.soldOutClass : "";
    c = c.replace(/{{itemSoldOutClass}}/g, p);
    var f = i ? bcSfFilterTemplate.soldOutLabelGridHtml : "";
    c = c.replace(/{{itemSoldOutLabel}}/g, f);
    e.id, e.id;
    var d = buildImageStyle(e);
    c = c.replace(/{{imageStyle}}/g, d);
    var m = "";
  	var firstImage = "";
  	if(t.length > 1){
		firstImage = "FirstImage"
    }
    m += '<img class="'+ firstImage +' grid-view-item__image lazyload" src="' + this.getFeaturedImage(t, "300x300") + '" data-src="' + this.getFeaturedImage(t, "{width}x") + '" data-widths="[180, 360, 540, 720, 900, 1080, 1296, 1512, 1728, 2048]" data-aspectratio="" data-sizes="auto" alt="{{itemTitle}}">';
    var g = bcSfFilterConfig.custom.max_height + "x" + bcSfFilterConfig.custom.max_height,
        u = t.length > 0 ? "" * bcSfFilterConfig.custom.max_height : 0;
    m += '<noscript><img class="grid-view-item__image" src="' + this.getFeaturedImage(t, g + "@2x") + '" alt="{{itemTitle}}" style="max-width: ' + u + 'px;"></noscript>';
    if(t.length > 1){
		 m += '<img style="display:none;" class="secImage" src="'+ this.optimizeImage(t[1].src , 'large') +'">'
    }
  	c = c.replace(/{{itemImages}}/g, m);
  c = c.replace(/{{AddToCartClass}}/g, bcSfFilterConfig.custom.enable_ajax ? '' : 'Cust_GridCardBtn ');
    var h = bcSfFilterConfig.custom.vendor_enable ? bcSfFilterTemplate.vendorGridHtml : "";
    c = c.replace(/{{itemVendor}}/g, h);
    var v = buildPrice(e, a, r);
    c = (c = c.replace(/{{itemPrice}}/g, v)).replace(/{{itemJson}}/g, JSON.stringify(e.json));
    var b = "\x3c!-- include 'wishlist-button-collection' with '" + e.id + "' --\x3e";
    c = c.replace(/{{itemWishlist}}/g, b);
    var _ = "";
    e.tags && (e.tags.indexOf("limited") > -1 && (_ += '<li class="limtedAdd">Limited Edition</li>'), e.tags.indexOf("onsale") > -1 && (_ += '<li class="gbSale">SALE</li>'), e.tags.indexOf("newarrival") > -1 && (_ += '<li class="gbNewarrive"><img src="' + bcSfFilterConfig.general.asset_url.replace('bc-sf-filter.js', 'icon-new-arrival.svg') + '" alt="img" title="img">New Arrival</li>'), e.tags.indexOf("trending") > -1 && (_ += '<li class="gbtrmding">Trending</li>'), e.tags.indexOf("featuredartist") > -1 && (_ += '<li class="gbFA"><img src="' + bcSfFilterConfig.general.asset_url.replace('bc-sf-filter.js', 'icon-featured-artist.svg') + '" alt="img" title="img">Featured Artist</li>'), e.tags.indexOf("bestseller") > -1 && (_ += '<li class="gbBS"><img src="' + bcSfFilterConfig.general.asset_url.replace('bc-sf-filter.js', 'icon-best-seller.svg') + '" alt="img" title="img">Best Seller</li>')), c = c.replace(/{{itemTags}}/g, _);
    var y = '<div class="loox-rating" data-id="{{itemId}}" data-rating="' + this.getProductMetafield(e, "loox", "avg_rating") + '" data-raters="' + this.getProductMetafield(e, "loox", "num_reviews") + '"></div>';
    return c = (c = (c = (c = (c = (c = c.replace(/{{itemRating}}/g, y)).replace(/{{itemId}}/g, e.id)).replace(/{{itemFirstVariantId}}/g, l.id)).replace(/{{itemTitle}}/g, e.title)).replace(/{{itemVendorLabel}}/g, e.vendor)).replace(/{{itemUrl}}/g, this.buildProductItemUrl(e))
}, BCSfFilter.prototype.buildProductListItem = function(e) {
    var t = e.images_info,
        i = !e.available,
        a = e.compare_at_price_min > e.price_min,
        r = e.price_min != e.price_max;
    e.variants[0];
    if (null !== getParam("variant") && "" != getParam("variant")) {
        var l = e.variants.filter(function(e) {
            return e.id == getParam("variant")
        });
        void 0 !== l[0] && l[0]
    } else
        for (var s = 0; s < e.variants.length; s++)
            if (e.variants[s].available) {
                e.variants[s];
                break
            } var n = bcSfFilterTemplate.productListItemHtml,
        c = a ? bcSfFilterTemplate.saleLabelListHtml : "";
    n = n.replace(/{{itemSaleLabel}}/g, c);
    var o = i ? bcSfFilterTemplate.soldOutLabelListHtml : "";
    n = n.replace(/{{itemSoldOutLabel}}/g, o);
    var p = t.length > 0 ? this.optimizeImage(t[0].src, "600x600") : bcSfFilterConfig.general.no_image_url;
    n = n.replace(/{{itemThumbUrl}}/g, p);
    var f = bcSfFilterConfig.custom.vendor_enable ? bcSfFilterTemplate.vendorSmallListHtml : "";
    n = n.replace(/{{itemSmallVendor}}/g, f);
    var d = bcSfFilterConfig.custom.vendor_enable ? bcSfFilterTemplate.vendorMediumListHtml : "";
    n = n.replace(/{{itemMediumVendor}}/g, d);
    var m = buildPrice(e, a, r);
    return n = (n = (n = (n = n.replace(/{{itemPrice}}/g, m)).replace(/{{itemTitle}}/g, e.title)).replace(/{{itemVendorLabel}}/g, e.vendor)).replace(/{{itemUrl}}/g, this.buildProductItemUrl(e))
}, BCSfFilter.prototype.buildPagination = function(e) {
    var t = parseInt(this.queryParams.page),
        i = Math.ceil(e / this.queryParams.limit);
    if (1 == i) return jQ(this.selector.pagination).html(""), !1;
    if ("default" == this.getSettingValue("general.paginationType")) {
        var a = bcSfFilterTemplate.paginateHtml,
            r = t > 1 ? bcSfFilterTemplate.previousActiveHtml : bcSfFilterTemplate.previousDisabledHtml;
        r = r.replace(/{{itemUrl}}/g, this.buildToolbarLink("page", t, t - 1)), a = a.replace(/{{previous}}/g, r);
        var l = t < i ? bcSfFilterTemplate.nextActiveHtml : bcSfFilterTemplate.nextDisabledHtml;
        l = l.replace(/{{itemUrl}}/g, this.buildToolbarLink("page", t, t + 1)), a = a.replace(/{{next}}/g, l);
        t = bcSfFilterConfig.label.current_page.replace(/{{ current }}/g, t).replace(/{{ total }}/g, i);
        a = a.replace(/{{pageItems}}/g, t), jQ(this.selector.pagination).html(a)
    }
}, BCSfFilter.prototype.buildFilterSorting = function() {
    jQ(this.selector.topSorting).html("");
    var e = this.getSortingList();
    if (e) {
        var t = this.queryParams.sort || "",
            i = "";
        for (var a in e) activeClass = "", t == a && (activeClass = "active"), i += '<li><a href="#" data-sort="' + a + '" class="' + activeClass + '">' + e[a] + "</a></li>";
        var r = bcSfFilterTemplate.sortingHtml.replace(/{{sortingItems}}/g, i);
        jQ(".bc-sf-filter-custom-sorting").html(r), jQ(".bc-sf-filter-custom-sorting").hasClass("bc-sf-filter-sort-active") && jQ(".bc-sf-filter-custom-sorting").toggleClass("bc-sf-filter-sort-active");
        var l = "";
        if (t.length > 0) {
            var s = "sorting_" + t.replace(/\-/g, "_");
            l = bcSfFilterConfig.label[s]
        } else l = bcSfFilterConfig.label.sorting;
        jQ(".bc-sf-filter-custom-sorting label span span").text(l)
    }
}, BCSfFilter.prototype.buildSortingEvent = function() {
    var e = this;
    jQ(".bc-sf-filter-filter-dropdown a").click(function(t) {
        t.preventDefault(), onInteractWithToolbar(t, "sort", e.queryParams.sort, jQ(this).data("sort"))
    }), jQ(".bc-sf-filter-custom-sorting > label").click(function() {
        jQ(".bc-sf-filter-filter-dropdown").is(":animated") || (jQ(".bc-sf-filter-filter-dropdown").toggle().parent().toggleClass("bc-sf-filter-sort-active"), jQ("#bc-sf-filter-tree").hide())
    }), jQ("body").click(function(e) {
        var t = jQ(".bc-sf-filter-custom-sorting");
        t.is(e.target) || 0 !== t.has(e.target).length || jQ(".bc-sf-filter-filter-dropdown").hide().parent().removeClass("bc-sf-filter-sort-active")
    }), jQ(this.getSelector("filterTreeMobileButton")).click(function() {
        jQ("#bc-sf-filter-top-sorting-mobile .bc-sf-filter-filter-dropdown").hide()
    }), jQ("#bc-sf-filter-tree-h .bc-sf-filter-block-title a").click(function() {
        jQ(".bc-sf-filter-filter-dropdown").hide().parent().removeClass("bc-sf-filter-sort-active")
    }), jQ(window).on("scroll", function() {
        jQ(".bc-sf-filter-filter-dropdown").hide().parent().removeClass("bc-sf-filter-sort-active")
    })
}, BCSfFilter.prototype.buildFilterDisplayType = function() {
    var e = "<span>View As </span>";
    e += '<a href="' + this.buildToolbarLink("display", "list", "grid") + '" title="Grid view" class="bc-sf-filter-display-item bc-sf-filter-display-grid" data-view="grid"><span class="icon-fallback-text"><span class="fallback-text">Grid view</span></span></a>', e += '<a href="' + this.buildToolbarLink("display", "grid", "list") + '" title="List view" class="bc-sf-filter-display-item bc-sf-filter-display-list" data-view="list"><span class="icon-fallback-text"><span class="fallback-text">List view</span></span></a>', jQ(this.selector.topDisplayType).html(e), jQ(this.selector.topDisplayType).find(".bc-sf-filter-display-list").removeClass("active"), jQ(this.selector.topDisplayType).find(".bc-sf-filter-display-grid").removeClass("active"), "list" == this.queryParams.display ? jQ(this.selector.topDisplayType).find(".bc-sf-filter-display-list").addClass("active") : "grid" == this.queryParams.display && jQ(this.selector.topDisplayType).find(".bc-sf-filter-display-grid").addClass("active")
}, BCSfFilter.prototype.buildExtrasProductList = function(e, t) {
    if (jQ(window).width() > 749) {/*FS added */
        jQ(".MainGridProducts").mouseenter(function(){
            jQ(this).children(".product-card__image-with-placeholder-wrapper").children(".CustomJs").children(".cstGridImg").children(".FirstImage").hide();
            jQ(this).children(".product-card__image-with-placeholder-wrapper").children(".CustomJs").children(".cstGridImg").children(".secImage").show();
        })
    }
  jQ(".MainGridProducts").mouseleave(function(){
    jQ(this).children(".product-card__image-with-placeholder-wrapper").children(".CustomJs").children(".cstGridImg").children(".FirstImage").show();
    jQ(this).children(".product-card__image-with-placeholder-wrapper").children(".CustomJs").children(".cstGridImg").children(".secImage").hide();
  })
    var i = !0;
    "" == this.getSettingValue("actionlist.qvEnable") && "" == this.getSettingValue("actionlist.atcEnable") || (i = this.getSettingValue("actionlist.qvEnable") || this.getSettingValue("actionlist.atcEnable")), !0 === i && "undefined" != typeof BCActionList && ("undefined" == typeof bcActionList ? bcActionList = new BCActionList : "undefined" != typeof bcAlParams && "undefined" != typeof bcSfFilterParams ? (bcActionList.initFlag = !1, bcActionList.alInit(bcSfFilterParams, bcAlParams)) : bcActionList.alInit());
    var a = jQ(this.selector.products);
    "list" == this.queryParams.display ? (0 == a.children(".list-view-items").length && a.children().wrapAll('<ul class="list-view-items"></ul>'), a.removeClass("grid grid--uniform grid--view-items")) : (a.children(".list-view-items").length > 0 && a.children(".list-view-items").children().unwrap(), a.addClass("grid grid--uniform grid--view-items"))
}, BCSfFilter.prototype.buildAdditionalElements = function(e, t) {
    var i = "";
    i = 1 == e.total_product ? bcSfFilterConfig.label.items_with_count_one.replace(/{{ count }}/g, e.total_product) : bcSfFilterConfig.label.items_with_count_other.replace(/{{ count }}/g, e.total_product), jQ("#bc-sf-filter-total-product").html(i), /*jQ(".GridCartBtn").click(function() {
        var e = $(this).attr("data-id");
        $.ajax({
            type: "POST",
            url: "/cart/add.js",
            data: "quantity=1&id=" + e,
            dataType: "json",
            success: function(e) {
                window.location.href = "/cart"
            }
        })
    }),*/ $("body").on("click", ".GridCartBtnmob", function() {
        var a = $(this).attr("data-id");
        $.ajax({
            type: "POST",
            url: "/cart/add.js",
            data: "quantity=1&id=" + a,
            dataType: "json",
            success: function(a) {
                window.location.href = "/cart"
            }
        })
    }), $("body").on("click", ".InstantCartBtnmob, .InstantCartBtnDesk", function() {
        var t = $(this).attr("data-id");
        $.ajax({
            type: "POST",
            url: "/cart/add.js",
            data: "quantity=1&id=" + t,
            dataType: "json",
            success: function(t) {
                window.location.href = "/checkout"
            }
        })
    });;
}, BCSfFilter.prototype.buildDefaultElements = function() {
    var e = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream,
        t = /Safari/.test(navigator.userAgent),
        i = window.performance && window.performance.navigation && 2 == window.performance.navigation.type;
    if (!(e && t && i)) {
        var a = window.location.href.split("?")[0],
            r = this.isSearchPage() && this.queryParams.hasOwnProperty("q") ? "&q=" + this.queryParams.q : "";
        window.location.replace(a + "?view=bc-original" + r)
    }
}, BCSfFilter.prototype.prepareProductData = function(e) {
    for (var t = e.length, i = 0; i < t; i++) {
        e[i].images = e[i].images_info, e[i].images.length > 0 ? e[i].featured_image = e[i].images[0] : e[i].featured_image = {
            src: bcSfFilterConfig.general.no_image_url,
            width: "",
            height: "",
            aspect_ratio: 0
        }, e[i].url = "/products/" + e[i].handle;
        for (var a = [], r = e[i].options_with_values.length, l = 0; l < r; l++) a.push(e[i].options_with_values[l].name);
        if (e[i].options = a, void 0 !== bcSfFilterConfig.general.currencies && bcSfFilterConfig.general.currencies.length > 1) {
            var s = bcSfFilterConfig.general.current_currency.toLowerCase().trim();

            function n(e, t) {
                return void 0 !== t ? t : e
            }
            e[i].price_min = n(e[i].price_min, e[i]["price_min_" + s]), e[i].price_max = n(e[i].price_max, e[i]["price_max_" + s]), e[i].compare_at_price_min = n(e[i].compare_at_price_min, e[i]["compare_at_price_min_" + s]), e[i].compare_at_price_max = n(e[i].compare_at_price_max, e[i]["compare_at_price_max_" + s])
        }
        e[i].price_min *= 100, e[i].price_max *= 100, e[i].compare_at_price_min *= 100, e[i].compare_at_price_max *= 100, e[i].price = e[i].price_min, e[i].compare_at_price = e[i].compare_at_price_min, e[i].price_varies = e[i].price_min != e[i].price_max;
        var c = e[i].variants[0];
        if (null !== getParam("variant") && "" != getParam("variant")) {
            var o = e[i].variants.filter(function(e) {
                return e.id == getParam("variant")
            });
            void 0 !== o[0] && (c = o[0])
        } else {
            var p = e[i].variants.length;
            for (l = 0; l < p; l++)
                if (e[i].variants[l].available) {
                    c = e[i].variants[l];
                    break
                }
        }
        e[i].selected_or_first_available_variant = c;
        for (p = e[i].variants.length, l = 0; l < p; l++) {
            var f = [],
                d = e[i].variants[l].merged_options;
            if (Array.isArray(d)) {
                for (var m = d.length, g = 0; g < m; g++) {
                    var u = d[g].split(":");
                    e[i].variants[l]["option" + (parseInt(g) + 1)] = u[1], e[i].variants[l]["option_" + u[0]] = u[1], f.push(u[1])
                }
                e[i].variants[l].options = f
            }
            e[i].variants[l].compare_at_price = 100 * parseFloat(e[i].variants[l].compare_at_price), e[i].variants[l].price = 100 * parseFloat(e[i].variants[l].price)
        }
        e[i].description = e[i].content = e[i].body_html, e[i].hasOwnProperty("original_tags") && e[i].original_tags.length > 0 && (e[i].tags = e[i].original_tags.slice(0)), e[i].json = customizeJsonProductData(e[i])
    }
    return e
}, BCSfFilter.prototype.afterBuildFilterTree = function(e) {
    jQ(this.selector.filterTree).children().wrapAll('<div id="bc-sf-filter-options-wrapper"></div>'), this.buildFilterOptionBoxStyle(), this.triggerOpenHorizontalFilterEvent(), this.buildFilterShowMore(), this.checkIsFullWidthMobile() || this.collapseFilterOption();
    jQ('[data-id="pf_t_format"] .bc-sf-filter-block-content ul').append('<li><ul class="horizontal"><li>Horizontal</li></ul></li><li><ul class="vertical"><li>Vertical</li></ul></li>'), jQ('#bc-sf-filter-tree-h [data-id="pf_t_format"] .bc-sf-filter-block-content ul a[data-id="pf_t_format"]').each(function() {
        var e = jQ(this),
            t = e.data("value"),
            i = e.parent("li"),
            a = "<li>" + i.html() + "</li>";
        t.indexOf("vertical") > -1 ? jQ('#bc-sf-filter-tree-h [data-id="pf_t_format"] .bc-sf-filter-block-content ul.vertical').append(a) : jQ('#bc-sf-filter-tree-h [data-id="pf_t_format"] .bc-sf-filter-block-content ul.horizontal').append(a), i.remove()
    }), jQ('#bc-sf-filter-tree [data-id="pf_t_format"] .bc-sf-filter-block-content ul a[data-id="pf_t_format"]').each(function() {
        var e = jQ(this),
            t = e.data("value"),
            i = e.parent("li"),
            a = "<li>" + i.html() + "</li>";
        t.indexOf("vertical") > -1 ? jQ('#bc-sf-filter-tree [data-id="pf_t_format"] .bc-sf-filter-block-content ul.vertical').append(a) : jQ('#bc-sf-filter-tree [data-id="pf_t_format"] .bc-sf-filter-block-content ul.horizontal').append(a), i.remove()
    })
}, BCSfFilter.prototype.buildFilterOptionLabel = function(e, t, i) {
    switch (e = this.customizeFilterOptionLabel(e, i.prefix, i.filterType, i.displayAllValuesInUppercaseForm)) {
        case "Acmehorizontal":
            e = "One piece";
            break;
        case "Acme3horizontal":
            e = "3 pieces";
            break;
        case "Acme5p":
            e = "5 pieces";
            break;
        case "Acmevertical":
            e = "One piece";
            break;
        case "Acme3vertical":
            e = "3 pieces";
            break;
        case "Canvas":
            e = "Gallery Wrap";
            break;
        default:
            e = e
    }
    var a = this.getTemplate("filterOptionLabel").replace(/{{itemValue}}/g, e);
    return this.getSettingValue("general.showFilterOptionCount") && "box" != i.displayType && !0 !== i.keepValuesStatic && null !== t && (t > 0 && 0 == this.getSettingValue("general.showOutOfStockOption") || 1 == this.getSettingValue("general.showOutOfStockOption")) ? a.replace(/{{itemAmount}}/g, "(" + t + ")") : a.replace(/{{itemAmount}}/g, "")
}, BCSfFilter.prototype.buildFilterOptionSwatchData = function(e, t, i, a, r, l, s, n) {
    if (this.checkShowFilterOptionItem(l, s)) {
        var c = l.key,
            o = l.key,
            p = c;
        "collection" == e && (o = l.label, c = l.handle, p = o);
        var f = this.getSettingValue("general.colorOptionsArr"),
            d = t.replace("pf_t_", "").replace("pf_opt_", "");
        if ("" != f) void 0 !== f.filter(function(e) {
            return t.indexOf(e) > -1
        })[0] && (d = "color");
        p = this.customizeSwatchFileName(p, l, s);
        var m = this.getTemplate("filterOptionSwatchItem");
        m = this.buildFilterOptionItem(m, o, c, e, t, i, a, r, l, s, n);
        var g = getFilePath(d + "-" + p, this.swatchExtension, this.getSettingValue("general.swatchImageVersion"));
        "pf_t_format" == t && (g = bcSfFilterMainConfig.general.asset_url.replace("bc-sf-filter.js", d + "-" + p + ".svg")), m = m.replace(/{{itemImageValue}}/g, g);
        var u = s.hasOwnProperty("borderSwatch") && "" != s.borderSwatch ? s.borderSwatch : "none";
        return m = m.replace(/{{itemBorder}}/g, u)
    }
    return ""
}, BCSfFilter.prototype.buildFilterSelectionData = function(e) {
    function t(e, t, i, a) {
        switch (i) {
            case "Acmehorizontal":
                i = "Horizontal: One piece";
                break;
            case "Acme3horizontal":
                i = "Horizontal: 3 pieces";
                break;
            case "Acme5p":
                i = "Horizontal: 5 pieces";
                break;
            case "Acmevertical":
                i = "Vertical: One piece";
                break;
            case "Acme3vertical":
                i = "Vertical: 3 pieces";
                break;
            case "Canvas":
                i = "Gallery Wrap";
                break;
            default:
                i = i
        }
        return e = (e = (e = e.replace(/{{itemType}}/g, t)).replace(/{{itemLabel}}/g, i)).replace(/{{itemLink}}/g, a)
    }
    var i = this,
        a = horizontalContent = "",
        r = this.getTemplate("filterRefineItem"),
        l = this.getTemplate("filterRefineHorizontalItem"),
        s = e.filter.options,
        n = Object.keys(i.queryParams);
    return n = n.filter(function(e) {
        return 0 == e.indexOf("pf_")
    }), jQ.each(n, function(e, n) {
        var c = s.filter(function(e) {
            return e.filterOptionId == n
        })[0];
        if (void 0 !== c && i.queryParams.hasOwnProperty(n) && i.queryParams[n] && i.queryParams[n].length) {
            var o = i.queryParams[n],
                p = c.filterOptionId,
                f = c.prefix,
                d = c.label,
                m = c.filterType,
                g = c.displayType;
            if (f = null != f && !1 !== f ? f.replace(/\\/g, "") : "", Array.isArray(o) || (o = [o]), o = o.map(function(e) {
                    return e.toString().replace(/\+/g, "%20")
                }), "range" == g) {
                var u = "";
                if (-1 == m.indexOf("price") && "weight" !== m && -1 == m.indexOf("range_slider")) {
                    var h = [];
                    c && c.hasOwnProperty("values") && (h = c.values.map(function(e) {
                        return e.key
                    }));
                    var v = h.length ? i.getAdvancedRangeSelectedValues(o, h) : [o[0], o[o.length - 1]];
                    u = v[0].toString().replace(f, ""), o.length > 1 && (u += " - " + v[1].toString().replace(f, ""))
                } else {
                    var b = (w = o[0]).split(":");
                    if ("price" == m) {
                        var _ = i.formatMoney(100 * b[0]),
                            y = i.formatMoney(100 * b[1]);
                        i.getSettingValue("general.removePriceDecimal") && (_ = i.removeDecimal(_), y = i.removeDecimal(y)), u = _ + " - " + y
                    } else u = b[0] + " - " + b[1]
                }
                var S = i.buildClearFilterOptionLink(p, d, o);
                a += t(r, d, u, S), horizontalContent += t(l, d, u, S)
            } else
                for (e = 0; e < o.length; e++) {
                    var w;
                    u = w = o[e];
                    u = i.customizeFilterOptionLabel(u, f, m);
                    S = i.buildClearFilterOptionLink(p, d, w);
                    switch (null != f && !1 !== f && (f = f.replace(/\\/g, ""), w = w.replace(f, "").trim()), m) {
                        case "price":
                            u = i.getPriceLabel(w);
                            break;
                        case "percent_sale":
                            u = i.getPercentSaleLabel(w);
                            break;
                        case "stock":
                            u = "true" === w ? c.values[0].label : c.values[1].label;
                            break;
                        case "review_ratings":
                            var F = !!c.hasOwnProperty("showExactRating") && c.showExactRating;
                            u = i.getReviewRatingsLabel(w, F)
                    }
                    a += t(r, d, u, S), horizontalContent += t(l, d, u, S)
                }
        }
    }), [a, horizontalContent]
};

