$(document).ready(function(){
  /****************MENU CLOSE FOR MOBILE ON OVERLAY*******************/
  $(".mobileOverlay").click(function(){
    $("body").removeClass("MenuOppned");
  })
   /****************ANNOUCEMENT BAR HIDE ON CROSS CLIECK*******************/
  $("span.CrossAnnouc").click(function(){
    $("body").addClass("closeBar");
  })
  /*******************************HOVER FUNCTIONALITY ON MENU **********************/
  $(".hoverworking").mouseenter(function(){
  var getImagepath = $(this).attr("data-images");
    $(this).parents("li").parents("ul").parents(".site-nav__childlist-item").parents(".site-nav__childlist").parents(".mLeftMenu").next(".mRightImg").children(".InnerImage").children("img").attr("src",getImagepath);
  })
//   $(".hoverworking").mouseleave(function(){
//   var getImagepath = $(this).parents("li").parents("ul").parents(".site-nav__childlist-item").parents(".site-nav__childlist").parents(".mLeftMenu").next(".mRightImg").children(".InnerImage").children("img").attr("data-srcing");
//     $(this).parents("li").parents("ul").parents(".site-nav__childlist-item").parents(".site-nav__childlist").parents(".mLeftMenu").next(".mRightImg").children(".InnerImage").children("img").attr("src",getImagepath);
//   })
  /*******************************HOVER FUNCTIONALITY ON PRODUCTS***********************/
  if ($(window).width() > 749) {
  $(".MainGridProducts").mouseenter(function(){
  $(this).children(".product-card__image-with-placeholder-wrapper").children(".CustomJs").children(".cstGridImg").children(".FirstImage").hide();
    $(this).children(".product-card__image-with-placeholder-wrapper").children(".CustomJs").children(".cstGridImg").children(".secImage").show();
  })
  $(".MainGridProducts").mouseleave(function(){
  $(this).children(".product-card__image-with-placeholder-wrapper").children(".CustomJs").children(".cstGridImg").children(".FirstImage").show();
    $(this).children(".product-card__image-with-placeholder-wrapper").children(".CustomJs").children(".cstGridImg").children(".secImage").hide();
  })
  }
 /******************************* CART PAGE UPDATE VARIANT **********************/
  $('body').on('change', '.FixedSize', function() {
    $("body").addClass("loaderprocess");
    var ListingVar ;
    var valueLast=$(this).val();
    var valueFirst=$(this).parents("li").prev("li").attr("data-type");
    if(valueFirst==undefined ){
      var fullName = valueLast;
    }
    else{
      var fullName = valueFirst+" / "+ valueLast;
    }
    console.log(fullName);
    $(this).parents("ul.product-details").siblings(".GetVariantDetail").each(function(){
      var ListingName = $(this).attr("data-name");
      if(ListingName==fullName){
        ListingVar = $(this).attr("data-iddd");
        ListingVar = parseInt(ListingVar);
        return false;
      }
    })

    var getquantity = $(this).parents("li").parents(".product-details").attr("data-quat");
    var getline = $(this).parents("li").parents(".product-details").attr("data-line");

    $.ajax({
      type: 'POST',
      url: '/cart/change.js',
      data:  'quantity=0&line=' + getline,
      dataType: 'json',
      success: function(data) {
        $.ajax({
          type: 'POST',
          url: '/cart/add.js',
          data: 'quantity=' + getquantity + '&id=' + ListingVar,
          dataType: 'json',
          success: function(line_item) { 
            $.ajax({
              type: "GET",
              url: "/cart",
              dataType: 'html',
              success: function(data) 
              {
                var minicartdata=$(data).find('.CustomCartTemp').html();
                $('.CustomCartTemp').html(minicartdata);
                $("body").removeClass("loaderprocess");
              }
            })
          }
        })
      }
    })
  })

  $('body').on('change', '.FixedType', function() {
    $("body").addClass("loaderprocess");
    var ListingVar ;
    var valueLast=$(this).val();
    var valueFirst=$(this).parents("li").next("li").attr("data-size");
    if(valueFirst==undefined ){
      var fullName = valueLast;
    }
    else{
      var fullName = valueLast+" / "+ valueFirst;
    }
    console.log(fullName);
    $(this).parents("ul.product-details").siblings(".GetVariantDetail").each(function(){
      var ListingName = $(this).attr("data-name");
      if(ListingName==fullName){
        ListingVar = $(this).attr("data-iddd");
        ListingVar = parseInt(ListingVar);
        return false;
      }
    })

    var getquantity = $(this).parents("li").parents(".product-details").attr("data-quat");
    var getline = $(this).parents("li").parents(".product-details").attr("data-line");

    $.ajax({
      type: 'POST',
      url: '/cart/change.js',
      data:  'quantity=0&line=' + getline,
      dataType: 'json',
      success: function(data) {
        $.ajax({
          type: 'POST',
          url: '/cart/add.js',
          data: 'quantity=' + getquantity + '&id=' + ListingVar,
          dataType: 'json',
          success: function(line_item) { 
            $.ajax({
              type: "GET",
              url: "/cart",
              dataType: 'html',
              success: function(data) 
              {
                var minicartdata=$(data).find('.CustomCartTemp').html();
                $('.CustomCartTemp').html(minicartdata);
                $("body").removeClass("loaderprocess");
              }
            })
          }
        })
      }
    })
  })
})