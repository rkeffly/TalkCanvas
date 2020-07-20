$(document).ready(function(){
  /************************MOBILE SEARCH ICON CLICK *****************/
  $(".cstSrchMob").click(function(){
  $("body").addClass("MobileSearch");
  })
  $(".MobCustomSearch .search-bar__submit").click(function(){
  $("body").removeClass("MobileSearch");
  })
  $(window).scroll(function() {
    if ($(this).scrollTop() > 1) { 
  $("body").removeClass("MobileSearch");
    }
    else{
    $("body").addClass("MobileSearch");
    }
  })
  /***************** Instant Button Click on Wishlist *********************/
  $('body').on('click', '.WishInstant', function() {
    var varintId = $(this).attr("data-wish");
    varintId = varintId.split("=");
    varintId = varintId[1];
    varintId = parseInt(varintId);
    $.ajax({
      type: 'POST',
      url: '/cart/add.js',
      data: 'quantity=1&id=' + varintId,
      dataType: 'json',
      success: function(line_item) { 
        window.location.href = "/checkout";
      }
    })
  })
  /***************************** MOBILE CART SCROLL************/
  $(".csCrtDtlz a").click(function(){
    var GetClass = $(this).attr("class");
    $('html, body').animate({
      scrollTop: $(".Cartryt").offset().top-100
    }, 1000);
  })

 
  /**************************** Register Button Click ******************/

  $("#RegisterForm .text-center input.btn").click(function(e){
    var password =  $(".PasswordFiled").val();
    var confirmPassword =  $(".RepeatwordFiled").val();
    if (password != confirmPassword) {
      e.preventDefault();
      $("#RegisterForm-password-error-custom").show();
    }
    else{
      $("#RegisterForm-password-error-custom").hide();
    }
  })

  /*********************** Page Scroll On click (Help Center)***************/
  $(".cstFaqMob li").click(function(){
    var GetClass = $(this).attr("class");
    $('html, body').animate({
      scrollTop: $("#"+GetClass).offset().top-50
    }, 1000);
  })
  /************************* 	Chat Option Trigger *******************/
  $(".ConstctNow").click(function(){

    $("#launcher").trigger( "click" );
  })
  /********************** Accordion Page **************************/
  $( ".hCRyt" ).accordion({ header: "h3", collapsible: true, active: false });

  $('.FixedCartBtn').click(function(){

    $(".product-form__cart-submit").trigger("click");
  })

  $('body').on('click', '.qtyplus', function() {

    var valuepluss = $(this).attr("max");

    var val_qty = parseInt($(this).prev(".cart__qty-input").val());

    if(val_qty >= 0 &&  val_qty < valuepluss)
    {
      val_qty = val_qty + 1 ;
    }

    $(this).prev(".cart__qty-input").val(val_qty);
    var getline = $(this).parents(".cart__qty").attr("data-line");

    $.ajax({
      type: 'POST',
      url: '/cart/change.js',
      data:  'quantity=' + val_qty + '&line=' + getline,
      dataType: 'json',

      success: function(data) 
      {
        if(data.item_count > 0){
          $('.ttlitems').html(data.item_count) ;    
          $('#CartCount> span').html(data.item_count) ;  

        } else {
          $('.ttlitems').html(data.item_count) ;    
          $('#CartCount> span').html(data.item_count) ;  
        }

        $.ajax({
          type: "GET",
          url: "/cart",
          dataType: 'html',

          success: function(data) 
          {

            // console.log(data);
            var minicartdata=$(data).find('.CustomCartTemp').html();

            $('.CustomCartTemp').html(minicartdata);
          }
        })
      }
    })
  });
  $('body').on('click', '.qtyminus', function() {

    var valuepluss = $(this).attr("min");

    var val_qty = parseInt($(this).next(".cart__qty-input").val());

    if(val_qty > 0)
    {
      val_qty = val_qty - 1 ;
    }

    $(this).next(".cart__qty-input").val(val_qty);
    var getline = $(this).parents(".cart__qty").attr("data-line");

    $.ajax({
      type: 'POST',
      url: '/cart/change.js',
      data:  'quantity=' + val_qty + '&line=' + getline,
      dataType: 'json',

      success: function(data) 
    
      {
        if(data.item_count > 0){
          $('.ttlitems').html(data.item_count) ;    
          $('#CartCount> span').html(data.item_count) ;  

        } else {
          $('.ttlitems').html(data.item_count) ;    
          $('#CartCount> span').html(data.item_count) ;  
        }

        $.ajax({
          type: "GET",
          url: "/cart",
          dataType: 'html',

          success: function(data) 
          {

            // console.log(data);
            var minicartdata=$(data).find('.CustomCartTemp').html();

            $('.CustomCartTemp').html(minicartdata);
          }
        })
      }
    })
  });
  
  
    $(document).on('click', '.Cust_GridCardBtn', function() {
    console.log("click");
    var GetId = $(this).attr("data-id");
    $.ajax({
      type: 'POST',
      url: '/cart/add.js',
      data: 'quantity=1&id=' + GetId,
      dataType: 'json',
      success: function(line_item) {
        window.location.href = "/cart";
      }
    })
  })
  
  /*Home page minicart */
 $(document).on('click', '.GridCartBtn', function(){
   console.log("CLICK");
   var GetId = $(this).attr("data-id");
    
   $.ajax({
   type: 'POST',
     url: '/cart/add.js',
     data: 'quantity=1&id=' + GetId,
     dataType: 'json',
    success: function(response){
   console.log(response);
     
       $.ajax({
            type: "GET",
            url: "/cart",
            dataType: 'html',
            success: function(data) 
            {
             console.log("data" +data);
             var countvalue =  $(data).find(".cust_CartPOPUP_Count").text();
             console.log("countvalue"+countvalue);
            //  if(countvalue >= 3 ){$('.mini_cart').addClass('custm_forupitem');};
              var minicart =  $(data).find(".mini_cart").html();
              console.log("mimicart"+minicart);
              $(".mini_cart").html(minicart);
              $("#CartCount span[data-cart-count]").html(countvalue);
              
              $(".mini_cart").addClass("cust_minicart_popup");
               $(".site-header__cart-count").removeClass("hide");
            }
          })
       }
    
    })  
    
});
  

 $('body').on('click', '.cart-popup__close', function() {
//  $(".cart-popup__close").click(function(){
    console.log("testing");
    $(".cart-popup-wrapper").addClass('cart-popup-wrapper--hidden');
    $(".mini_cart").removeClass("cust_minicart_popup");
    $("#CartCount").removeClass("hide");
  })
 /*FS added*/
 $('body').on('click', '.cart-popup__dismiss-button', function() {
//  $(".cart-popup__dismiss-button").click(function(){
    console.log("testing");
    $(".cart-popup-wrapper").addClass('cart-popup-wrapper--hidden');
    $(".mini_cart").removeClass("cust_minicart_popup");
    $("#CartCount").removeClass("hide");
  })

 /* endhome page minicart */
 
 /*mobile */
 
 
 
   $('body').on('click', '.Cust_GridMobileBtn', function() {
    console.log("click");
    var GetId = $(this).attr("data-id");
    $.ajax({
      type: 'POST',
      url: '/cart/add.js',
      data: 'quantity=1&id=' + GetId,
      dataType: 'json',
      success: function(line_item) {
        window.location.href = "/cart";
      }
    })
  })
 
 $('.GridCartBtnmob ').click(function(){
   console.log("CLICK");
   var GetId = $(this).attr("data-id");
    
   $.ajax({
   type: 'POST',
     url: '/cart/add.js',
     data: 'quantity=1&id=' + GetId,
     dataType: 'json',
    success: function(response){
   console.log(response);
     
       $.ajax({
            type: "GET",
            url: "/cart",
            dataType: 'html',
            success: function(data) 
            {
             console.log("data" +data);
             var countvalue =  $(data).find(".cust_CartPOPUP_Count").text();
             console.log("countvalue"+countvalue);
            //  if(countvalue >= 3 ){$('.mini_cart').addClass('custm_forupitem');};
              var minicart =  $(data).find(".mini_cart").html();
              console.log("mimicart"+minicart);
              $(".mini_cart").html(minicart);
              $(".cust_home_popupCart").html(countvalue);
              
              $(".mini_cart").addClass("cust_minicart_popup");
            }
          })
       }
    
    })  
    
});
  

 $('body').on('click', '.cart-popup__close', function() {
//  $(".cart-popup__close").click(function(){
    console.log("testing");
    $(".cart-popup-wrapper").addClass('cart-popup-wrapper--hidden');
    $(".mini_cart").removeClass("cust_minicart_popup");
  })
  /*FS added*/
   $('body').on('click', '.cart-popup__dismiss-button', function() {
//  $(".cart-popup__dismiss-button").click(function(){
    console.log("testing");
    $(".cart-popup-wrapper").addClass('cart-popup-wrapper--hidden');
    $(".mini_cart").removeClass("cust_minicart_popup");
  })
 
 /* endmobile */
 
 
 
 
/* End home page minicart */

  $(".parentHding").click(function(e){
    e.preventDefault();
    $(this).parents(".mobile-menu-parent").toggleClass("ChildOpen");
  })
  $(".tliconX").click(function(){
    $("body").removeClass("MenuOppned");
  })
  $(".CustomMMenu").click(function(){
    $("body").toggleClass("MenuOppned");
  })

  $( "#Customaccordion" ).accordion({ header: "h3", collapsible: false, active: false, animate: 0 });
  $( "#accordionFooter" ).accordion({ header: "h3", collapsible: true, active: false });
  $('.Customsingle').slick(
    {dots: true}
  );
  if ($(window).width() > 749) {
    var getValue = $( "#AccessibleNav" ).offset();
    getValue = (getValue.top-50);
    $(window).scroll(function() {
      if ($(this).scrollTop() >= getValue) { // this refers to window
        $("#shopify-section-header").addClass("FixedHeader");

        //FS add for responsive bar
        var height_str = $(".announcement-bar").height();
        height_str = height_str + "px";
        $(".FixedHeaderWrapper").css( "top", height_str);
        if($(".announcement-bar").css("display")=="none")
          $(".FixedHeaderWrapper").css( "top", 0);
      }
      else{
        $("#shopify-section-header").removeClass("FixedHeader");

        $(".FixedHeaderWrapper").css( "top", "auto" );//FS add for responsive bar
      }
    });
  }

  $('body').on('click', '.InstantCartBtnmob, .InstantCartBtnDesk', function() {
    console.log("click");
    var GetId = $(this).attr("data-id");
    $.ajax({
      type: 'POST',
      url: '/cart/add.js',
      data: 'quantity=1&id=' + GetId,
      dataType: 'json',
      success: function(line_item) {
        window.location.href = "/checkout";
      }
    })
  })

  

  
  
})