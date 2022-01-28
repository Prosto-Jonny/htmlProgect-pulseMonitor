$(document).ready(function(){
    $('.caruseil__items').slick({
      adaptiveHeight: true,
      prevArrow: '<button type="button" class="slick-prev"><img src="../icons/chevron_left.png"></button>',
      nextArrow: '<button type="button" class="slick-next"><img src="../icons/chevron_right.png"></button>',
      responsive: [
        {
          breakpoint: 768,
          settings: {
            arrows: false,
            // centerMode: true,
            // centerPadding: '40px',
            slidesToShow: 1,
            dots: true
          }
        },
        {
          breakpoint: 480,
          settings: {
            arrows: false,
            // centerMode: true,
            // centerPadding: '40px',
            slidesToShow: 1,
            dots: true
          }
        }
      ]
    });
    
  });