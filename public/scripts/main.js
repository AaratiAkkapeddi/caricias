  function showImages(el) {
    var windowHeight = jQuery( window ).height();
    $(el).each(function(){
        var thisPos = $(this).offset().top;

        var topOfWindow = $(window).scrollTop();
        if (topOfWindow + windowHeight - 200 > thisPos ) {
            $(this).addClass("fadeIn");
        }
    });
}
$(window).scroll(function() {
    showImages('img');
});
$(window).on('load',function(){


    showImages('img');


  $('#bigtext').bigtext();
  $('.slideshow').flickity({
    // options
    ImagesLoaded: true,
    cellAlign: 'left',
    contain: true,
    pageDots: false,
    autoPlay: true,
    draggable: false,
    adaptiveHeight:true,
    wrapAround: true
  });

  $(window).stellar();

  /*audiences*/
  var audiences = $('.audience > img')
  for (var i = audiences.length - 1; i >= 0; i--) {
    var randomTop = Math.floor(Math.random() * 50)
    var randomLeft = Math.floor(Math.random() * 50)
    $(audiences[i]).css('margin', randomTop + 'px ' + randomLeft + 'px')
  }
  window.addEventListener('scroll', function(){
    if($(window).scrollTop() > $(window).height() - 200){
      $('#caricias-mini').addClass('open')
      $('.footer').addClass('open')
    }else{
      $('#caricias-mini').removeClass('open')
      $('.footer').removeClass('open')
    }

    var videos = $('video');
    for (var i = videos.length - 1; i >= 0; i--) {
      videoTop = $(videos[i]).offset().top
      if($(window).scrollTop() > videoTop){
        $(videos[i]).addClass('playing')
        $(videos[i])[0].play()
      }
    }
  })

$('.muted').on('click', function(){
  if (!$(this).hasClass('on')) {
    $(this).addClass('on')
    var video = $(this).parent().find('video')
    $(video).prop('muted', false);
  }else{
    $(this).removeClass('on')
    var video = $(this).parent().find('video')
    $(video).prop('muted', true);
  }

})
  $('.gallery img').on('click', function(){
    if(!$('.lightbox').hasClass('open')){
      $('.lightbox').empty()
      var imgsrc = $(this).attr('src');
      var img = $('<img/>');
      img.attr('src', imgsrc);
      $('.lightbox').addClass('open');
      $('.lightbox').append(img)
    }
  })
  
  $('.lightbox').on('click', function(){
    console.log('meow')
    $(this).removeClass('open')
  })



  $('video').on('click',function(){
    if($('video').hasClass('playing')){
     $(this)[0].pause()
     $(this).removeClass('playing') 
    }else{
     $(this)[0].play()
     $(this).addClass('playing') 
    }
    
  })
  // $(window).on('click', function(){
  //   if($('.lightbox').hasClass('open')){
  //     $('.lightbox').removeClass('open')
  //   }
  // })
})

