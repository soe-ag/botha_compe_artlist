var $window = $(window)
var $body = $("body")

// 画面サイズ
var winWidth = window.innerWidth;
var winHeight = window.innerHeight;
var winAspect = winHeight / winWidth;
var pcFlg = false;
if (winWidth >= 850) {
  pcFlg = true;
}

function updateDOM() {
  // 画面サイズ
  winWidth = window.innerWidth;
  winHeight = window.innerHeight;
  winAspect = winHeight / winWidth;
  if (winWidth >= 850) {
    pcFlg = true;
  } else {
    pcFlg = false;
  }
}

var ScrollEffectModule = new SCROLL_EFFECT_MODULE({
  elem: '.js-scroll',
  displayRatio: 0.8,
  // displayReverse     : true,
  addClassNameActive: 'is-scroll'
});

var TopScrollEffectModule = new SCROLL_EFFECT_MODULE({
  elem: '.js-top-scroll',
  displayRatio: 0.8,
  // displayReverse     : true,
  addClassNameActive: 'is-top-scroll',
  on: {
    In: function(item, pos){
      setTimeout(function(){
        topFire();
      },650)
    },
  }
});

// function getRandomInt(max) {
//   return Math.floor(Math.random() * Math.floor(max));
// }

$window.on("load", function () {
  updateDOM();
  ScrollEffectModule.Update();
  $body.addClass("is-load");
  // shuffle(gridItemList);

})

$(window).on('resize', function () {
  updateDOM();
});


// 画面内スクロール
$("a").on("click", function () {
  var _$this = $(this);
  if (_$this.attr("href").indexOf("#") > -1) {
    var _target = _$this.attr("href").split("#")[1];
    var _contentHeight = document.body.clientHeight;
    var $_target = $("#" + _target);
    if($_target.length){
      var _position = $_target.offset().top;
      if(pcFlg){
        _position-=89
      } else {
        _position-=49
      }
      if (_position + winHeight > _contentHeight) {
        _position = _contentHeight - winHeight;
      } else if(_position < 0) {
        _position = 0
      }
      $("body,html").animate({scrollTop: _position}, 1000, "easeOutQuart", function(){
      })
      $body.removeClass("is-open-nav")
      return false;
    }
  }
});
$('[data-scroll]').on('click', function () {
  var _position = $('.' + $(this).attr('data-scroll')).offset().top;
  var _contentHeight = document.body.clientHeight;
  if(pcFlg){
    _position-=0
  } else {
    _position-=0
  }
  if (_position + winHeight > _contentHeight) {
    _position = _contentHeight - winHeight;
  } else if(_position < 0) {
    _position = 0
  }
  $("body,html").animate({scrollTop: _position}, 1000, "easeOutQuart", function(){
  })
  $body.removeClass("is-open-nav")
  return false;
});

var urlHash = location.hash;
if (urlHash) {
  if (urlHash =="#agreement") {
    // $body.addClass("is-note-open");
  }
}

var $imgWrap = $(".js-img-img");
function changeImg(_img) {
  $imgWrap.html("<img src='"+ _img +"'>")
};
// $(".js-img-open").on('click', function () {
//   changeImg($(this).data("img"));
//   $body.addClass("is-img-open");
// });
$(".js-img-close").on('click', function () {
  $body.removeClass("is-img-open");
  setTimeout(function () {
    $imgWrap.empty();
  }, 500);
});

//------------------------------for image grid list ------------------------------------
//-----------------------------masonry radom--------------------------------
function shuffleContent(container) {
  var content = container.find("> *");
  var total = content.length;
  content.each(function () {
    content.eq(Math.floor(Math.random() * total)).prependTo(container);
  });
}

shuffleContent($(".mItem__wrapper"));


function addImg(_img) {
  $imgWrap.html(`
    <img src='${_img}'>
  `);
}

var $item = $(".mItem>img");

$item.on("click", function () {
  addImg(
    $(this).data("imgl"),
  );
  $body.addClass("is-img-open");
});



