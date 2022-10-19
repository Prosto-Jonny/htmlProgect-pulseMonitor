$(document).ready(function(){

  // Slider
    $('.caruseil__items').slick({
      adaptiveHeight: true,
      prevArrow: '<button type="button" class="slick-prev"><img src="./icons/chevron_left.png"></button>',
      nextArrow: '<button type="button" class="slick-next"><img src="./icons/chevron_right.png"></button>',
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


    //Tabs
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
      $(this)
        .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
        .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });
    //Не получается сделать на точке останова табы со слайдером
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
      $(this)
        .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
        .closest('div.container').find('div.catalog__media').removeClass('catalog__media_active').eq($(this).index()).addClass('catalog__media_active');
      $('.catalog__media').slick('setPosition');
      });

      $('.catalog__media').slick({
        adaptiveHeight: true,
        // autoplay: true,
        arrows: false,
        // prevArrow: '<button type="button" class="slick-prev"><img src="../icons/chevron_left.png"></button>',
        // nextArrow: '<button type="button" class="slick-next"><img src="../icons/chevron_right.png"></button>',
        responsive: [
          {
            breakpoint: 670,
            settings: {
              arrows: false,
              centerMode: true,
              centerPadding: '40px',
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

    // Внутри карточки табы
function toggleSlide(item) {
  $(item).each(function(i) {
    $(this).on('click', function(e) {
      e.preventDefault();
      $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
      $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
    })
  });
};

toggleSlide('.catalog-item__link');
toggleSlide('.catalog-item__back');

//Modal

$('[data-modal=consultation]').on('click', function() {
 $('.overlay, #consultation').fadeIn('slow');
});

$('.modal__close').on('click', function() {
  $('.overlay, #consultation, #order, #thanks').fadeOut('slow');
});



//Подставляем в модельное окно название товара, на карточку которого нажали "Купить"
$('.button_mini').each(function(i) {
  $(this).on('click', function() {
    $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
    $('.overlay, #order').fadeIn('slow');
  });
});

//Валидация

function validateForms(form) {
  $(form).validate({
    rules: {
      name: "required",
      phone: "required",
      email: {
        required: true,
        email: true
      }
    },
    messages: {
      name: "Пожалуйста, введите ваше имя.",
      phone: "Пожалуйста, введите номер телефона.",
      email: {
        required: "Пожалуйста, введите свою почту.",
        email: "Адрес почты должен иметь вид - name@domain.com"
      }
    }
  });
};

validateForms('#consultation-form');
validateForms('#consultation form');
validateForms('#order form');


// Маски номеров

$('input[name=phone]').mask("+7 (999) 999-9999");


//Отправка писем с сайта на почту

$('form').submit(function(e) {
  e.preventDefault();

  if(!$(this).valid()) {
    return;
  }

  $.ajax({
    type: "POST",
    url: "mailer/smart.php",
    data: $(this).serialize()
  }).done(function() {
    $(this).find("input").val("");
    $('#consultation, #order').fadeOut();
    $('.overlay, #thanks').fadeIn('slow');


    $('form').trigger('reset');
  });
  return false;
});

// Кнопка скролла

$(window).scroll(function() {
  if($(this).scrollTop() > 1600) {
    $('.pageup').fadeIn();
  } else {
    $('.pageup').fadeOut();
  }
});

//Плавность скролла

// $("a").on('click', function(event) {

//   // Make sure this.hash has a value before overriding default behavior
//   if (this.hash !== "") {
//     // Prevent default anchor click behavior
//     event.preventDefault();

//     // Store hash
//     var hash = this.hash;

//     // Using jQuery's animate() method to add smooth page scroll
//     // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
//     $('html, body').animate({
//       scrollTop: $(hash).offset().top
//     }, 800, function(){
 
//       // Add hash (#) to URL when done scrolling (default click behavior)
//       window.location.hash = hash;
//     });
//   } // End if
// });

new WOW().init();

});