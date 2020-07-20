$(document).ready(function(){
   /*************************** MAIN IMAGE SLIDER *************************/
$('.MainImageSlider').slick({
   slidesToShow: 1,
   slidesToScroll: 1,
   arrows: true,
  fade: true,
   asNavFor: '.product-single__thumbnails'
 });
  $(".arrownext").click(function(){
  if($(".arrowPrev").hasClass("disablearrow")){
     $(".arrowPrev").removeClass("disablearrow");
     }
    $(".product-single__media-wrapper").each(function(index){
      if($(this).hasClass("hide")){}
      else{
      var Homeget = $(this).next(".product-single__media-wrapper").attr("data-imge");
        if($(this).next(".product-single__media-wrapper").hasClass("LastMainIndex")){
        $(".CustomThumList.slick-slide").each(function(index){
        var Iddget = $(this).attr("data-idd");
          if(Iddget==Homeget){
          $(this).children("a").trigger( "click" );
            
          }
        })
        $(".arrownext").addClass("disablearrow");
        }
        else{
        $(".CustomThumList.slick-slide").each(function(index){
        var Iddget = $(this).attr("data-idd");
          if(Iddget==Homeget){
          $(this).children("a").trigger( "click" );
            
          }
        })
       
        }
        return false;
      }
    })
  })
   $(".arrowPrev").click(function(){
     if($(".arrownext").hasClass("disablearrow")){
     $(".arrownext").removeClass("disablearrow");
     }
    $(".product-single__media-wrapper").each(function(index){
      if($(this).hasClass("hide")){}
      else{
      var Homeget = $(this).prev(".product-single__media-wrapper").attr("data-imge");
        if($(this).prev(".product-single__media-wrapper").hasClass("FirstMainIndex")){
           $(".CustomThumList.slick-slide").each(function(index){
        var Iddget = $(this).attr("data-idd");
          if(Iddget==Homeget){
          $(this).children("a").trigger( "click" );
            
          }
        })
           $(".arrowPrev").addClass("disablearrow");
        }
        else{
        $(".CustomThumList.slick-slide").each(function(index){
        var Iddget = $(this).attr("data-idd");
          if(Iddget==Homeget){
          $(this).children("a").trigger( "click" );
            
          }
        })
        }
        return false;
      }
    })
  })
  /***********************SHIPPING CHANGE ON BASES OF IP ************************/
  $.getJSON('https://ipapi.co/json/', function(data) {
  var codeget = (JSON.stringify(data.country_code));

    if(codeget == '"US"'){
    $(".Unitedworld").show();
    }
    else if(codeget == '"GB"'){
    $(".Unitedworld").show();
    }
    else if(codeget == '"CA"'){
    $(".Unitedworld").show();
    }
    else if(codeget == '"AU"'){
    $(".Unitedworld").show();
    }
    else if(codeget == '"EU"'){
    $(".Europeworld").show();
    }
    else{
    $(".Restworld").show();
    }
});
  
  
  
var height =  $(".cstAddCartBuy").offset();
  var HdHeight = ($("#shopify-section-header").height());
  var CartHeight = ((height).top+HdHeight);
  if ($(window).width() < 749) {
 $(window).scroll(function() {
 if ($(this).scrollTop() >= CartHeight) { // this refers to window
      $("body").addClass("FixedCart");
    }
   else{
   $("body").removeClass("FixedCart");
   }
 })
  }
  $(".FixedBox").change(function(){
  	var selectedVal = $(this).val();
    var option_bits = (selectedVal || '').split(';');
    $('.swatch-element').each(function() {
     var Valueget =  $(this).attr("data-value");
     if(Valueget == option_bits[0] || Valueget == option_bits[1])
     {
      $(this).children("input").trigger("click");
       var PriceHtml = $(".product-single__meta .product__price").html();
       $(".product__price.ScrollPrice").html(PriceHtml);
     }
   })
  })
  /*FS removed*/
  /*
    $(".CustomIndexing_1  .swatch-element label").mouseenter(function(){
  var GetContent = $(this).next(".HoverWrapper").children(".GetHover").html();
    $(".hoverWrapper").addClass("FirstPosition");
    $(".hoverWrapper").html(GetContent);
    $(".hoverWrapper").show();
    
  })
  $(".CustomIndexing_1  .swatch-element label").mouseleave(function(){
   $(".hoverWrapper").hide();
    $(".hoverWrapper").removeClass("FirstPosition");
   $(".hoverWrapper").html("");
  })
  $(".CustomIndexing_2  .swatch-element label").mouseenter(function(){
  var GetContent = $(this).next(".HoverWrapper").children(".GetHover").html();
     $(".hoverWrapper").addClass("SecondPosition");
    $(".hoverWrapper").html(GetContent);
    $(".hoverWrapper").show();
  })
  $(".CustomIndexing_2  .swatch-element label").mouseleave(function(){
   $(".hoverWrapper").hide();
    $(".hoverWrapper").removeClass("SecondPosition");
   $(".hoverWrapper").html("");
  })
  */
  if ($(window).width() > 750) {
  $('.product-single__thumbnails').slick({
  infinite: false,
  slidesToShow: 12,
  asNavFor: '.MainImageSlider',
  focusOnSelect: true,
  slidesToScroll: 12
});
  }
  else{
   $('.product-single__thumbnails').slick({
  infinite: false,
  slidesToShow: 10,
  asNavFor: '.MainImageSlider',
  focusOnSelect: true,
  slidesToScroll:10
});
  }
  jQuery(function() {
  jQuery('.swatch :radio').change(function() {
    var optionIndex = jQuery(this).closest('.swatch').attr('data-option-index');
    var optionValue = jQuery(this).val();
    jQuery(this)
      .closest('form')
      .find('.single-option-selector')
      .eq(optionIndex)
      .val(optionValue)
      .trigger('change');
  });
});
})