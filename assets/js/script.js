
/*!--------------------------------*\
   3-Jekyll Theme
   @author Peiwen Lu (P233)
   https://github.com/P233/3-Jekyll
\*---------------------------------*/

$(function(){
  //搜索框文字变化时间
  $("#search-input").keyup(function(){
    //$("#s-box").hide("slow");
    var text = $("#search-input").val().toLowerCase();
    //console.log(text);

    if(text =="" || text==undefined){
      $("#pl__container a").show();
    }else{
      $("#pl__container a").hide();
      $(".pl__title").each(function(){
        var htmlstr = $(this).html().toLowerCase();
        if(htmlstr.indexOf(text) != -1){
          console.log(htmlstr);
          $(this).parent().show();
        }
      })
    }
  })
})

// Variables
var sidebar    = $('#sidebar'),
    container  = $('#post'),
    content    = $('#pjax'),
    button     = $('#icon-arrow');
    scrollTop  = $('#icon-arrow-up');
    tocbar     = $('#post__toc-trigger');

// Detect window size, if less than 1280px add class 'mobile' to sidebar therefore it will be auto hide when trigger the pjax request in small screen devices.
if ($(window).width() < 1280) {
  sidebar.addClass('mobile');
}

// Tags switcher
var clickHandler = function(id) {
  return function() {
    $(this).addClass('active').siblings().removeClass('active');
    $('.pl__all').hide();

    $('.' + id).delay(50).fadeIn(350);
  }
};

var clickHandler2 = function(id) {
  return function() {
    $('.pl__all').removeClass('active');
    $(this).addClass('active');
  }
};

$('#tags__ul li').each(function(index){
  $('#' + $(this).attr('id')).on('click', clickHandler($(this).attr('id')));
});

$('li.tags__li.tags-btn.blogroll').each(function(index){
  $('#' + $(this).attr('id')).on('click', clickHandler2($(this).attr('id')));
});


// If sidebar has class 'mobile', hide it after clicking.
$('.pl__all').on('click', function() {
  $(this).addClass('active').siblings().removeClass('active');
  if (sidebar.hasClass('mobile')) {
    $('#sidebar, #pjax, #icon-arrow').addClass('fullscreen');
  }
});

$('.fill').on('click', function() {
  $(this).addClass('icon_active').siblings().removeClass('icon_active');
});

// Enable fullscreen.
$('#js-fullscreen').on('click', function() {
  if (button.hasClass('fullscreen')) {
    sidebar.removeClass('fullscreen');
    button.removeClass('fullscreen');
    tocbar.removeClass('fullscreen');
    content.delay(300).queue(function(){
      $(this).removeClass('fullscreen').dequeue();
    });
  } else {
    sidebar.addClass('fullscreen');
    button.addClass('fullscreen');
    tocbar.addClass('fullscreen');
    content.delay(200).queue(function(){
      $(this).addClass('fullscreen').dequeue();
    });
  }
});

$('#article').on('click', function () {
  if (button.hasClass('fullscreen')) {
    sidebar.removeClass('fullscreen');
    button.removeClass('fullscreen');
    tocbar.removeClass('fullscreen');
    content.delay(300).queue(function(){
      $(this).removeClass('fullscreen').dequeue();
    });
  } else {
    sidebar.addClass('fullscreen');
    button.addClass('fullscreen');
    tocbar.addClass('fullscreen');
    content.delay(200).queue(function(){
      $(this).addClass('fullscreen').dequeue();
    });
  }
})

$('#scroll-top').on('click', function() {
  container.animate({
    scrollTop: 0
  }, 200);

  $('#pl__container').animate({
    scrollTop: 0
  }, 500);
});

$('#mobile-avatar').on('click', function(){
  $('#sidebar, #pjax, #icon-arrow').addClass('fullscreen');
});

// Pjax
$(document).pjax('#avatar, #mobile-avatar, .pl__all', '#pjax', { fragment: '#pjax', timeout: 10000 });

$(document).on({
  'pjax:click': function() {
    content.removeClass('fadeIn').addClass('fadeOut');
    NProgress.start();
  },
  'pjax:start': function() {
    content.css({'opacity':0});
  },
  'pjax:end': function() {
    NProgress.done();
    container.scrollTop(0);
    content.css({'opacity':1}).removeClass('fadeOut').addClass('fadeIn');
    afterPjax();
  }
});

// Re-run scripts for post content after pjax
function afterPjax() {
  // Open links in new tab
  $('#post__content a').attr('target','_blank');

  // Generate post TOC for h1 and h2
  var toc = $('#post__toc-ul');
  // Empty TOC and generate an entry for post title
  var title = $('#post__title').text()
  toc.empty().append('<li class="post__toc-li post__toc-h1"><a href="#post__title" class="js-anchor-link">' + title + '</a></li>');

  // Generate entries for h1 and h2
  $('#post__content').children('h1,h2,h3').each(function() {
    // Skip post title
    if ($(this).attr('id') == 'post__title') {
      return;
    }

    // Generate random ID for each heading
    $(this).attr('id', function() {
      var ID = "",
          alphabet = "abcdefghijklmnopqrstuvwxyz";

      for(var i=0; i < 5; i++) {
        ID += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
      }
      return ID;
    });

    // Add each chapter to TOC
    if ($(this).prop("tagName") == 'H2') {
      toc.append('<li class="post__toc-li post__toc-h2"><a href="#' + $(this).attr('id') + '" class="js-anchor-link">' + $(this).text() + '</a></li>');
    } else if ($(this).prop("tagName") == 'H3') {
      toc.append('<li class="post__toc-li post__toc-h3"><a href="#' + $(this).attr('id') + '" class="js-anchor-link">' + $(this).text() + '</a></li>');
    }
  });

  // Smooth scrolling
  $('.js-anchor-link').on('click', function() {
    var target = $(this.hash);
    container.animate({scrollTop: target.offset().top + container.scrollTop() - 70}, 500, function() {
      target.addClass('flash').delay(700).queue(function() {
        $(this).removeClass('flash').dequeue();
      });
    });
  });

  if (sidebar.hasClass('mobile')) {
    $('#sidebar, #pjax, #icon-arrow').addClass('fullscreen');
  }

}afterPjax();

