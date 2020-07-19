jQuery.noConflict();
(function($){

  $.GSET = {};

  //Breakpoint (MediaQuery) settings
  $.GSET.MODEL = {
    //Breakpoint name (used to move elements, etc.): MediaQuery value
    pc: '(min-width: 1241px)',
    tb: 'only screen and (min-width : 640px) and (max-width : 1240px)',
    sp: 'only screen and (max-width : 640px)'
  };

  //Element movement settings
  $.GSET.MOVE_ELEM = [{
    elem: '.navigation',
    pc: ['.logo','after'],
    tb: ['#sma-cnavi','append'],
    sp: ['#sma-cnavi','append']
  }];

  //PC / smartphone switching settings
  $.GSET.MODEL_CHANGE_BASE_MODEL = 'pc'; // Breakpoint name on PC display
  $.GSET.MODEL_CHANGE_SP_MODEL = 'sp'; // Breakpoint name on smartphone display

})(jQuery);

window.matchMedia || (window.matchMedia = function() {
    "use strict";

    // For browsers that support matchMedium api such as IE 9 and webkit
    var styleMedia = (window.styleMedia || window.media);

    // For those that don't support matchMedium
    if (!styleMedia) {
        var style       = document.createElement('style'),
            script      = document.getElementsByTagName('script')[0],
            info        = null;

        style.type  = 'text/css';
        style.id    = 'matchmediajs-test';

        if (!script) {
          document.head.appendChild(style);
        } else {
          script.parentNode.insertBefore(style, script);
        }

        // 'style.currentStyle' is used by IE <= 8 and 'window.getComputedStyle' for all other browsers
        info = ('getComputedStyle' in window) && window.getComputedStyle(style, null) || style.currentStyle;

        styleMedia = {
            matchMedium: function(media) {
                var text = '@media ' + media + '{ #matchmediajs-test { width: 1px; } }';

                // 'style.styleSheet' is used by IE <= 8 and 'style.textContent' for all other browsers
                if (style.styleSheet) {
                    style.styleSheet.cssText = text;
                } else {
                    style.textContent = text;
                }

                // Test if media query is true or false
                return info.width === '1px';
            }
        };
    }

    return function(media) {
        return {
            matches: styleMedia.matchMedium(media || 'all'),
            media: media || 'all'
        };
    };
}());
(function(){
    // Bail out for browsers that have addListener support
    if (window.matchMedia && window.matchMedia('all').addListener) {
        return false;
    }

    var localMatchMedia = window.matchMedia,
        hasMediaQueries = localMatchMedia('only all').matches,
        isListening     = false,
        timeoutID       = 0,    // setTimeout for debouncing 'handleChange'
        queries         = [],   // Contains each 'mql' and associated 'listeners' if 'addListener' is used
        handleChange    = function(evt) {
            // Debounce
            clearTimeout(timeoutID);

            timeoutID = setTimeout(function() {
                for (var i = 0, il = queries.length; i < il; i++) {
                    var mql         = queries[i].mql,
                        listeners   = queries[i].listeners || [],
                        matches     = localMatchMedia(mql.media).matches;

                    // Update mql.matches value and call listeners
                    // Fire listeners only if transitioning to or from matched state
                    if (matches !== mql.matches) {
                        mql.matches = matches;

                        for (var j = 0, jl = listeners.length; j < jl; j++) {
                            listeners[j].call(window, mql);
                        }
                    }
                }
            }, 30);
        };

    window.matchMedia = function(media) {
        var mql         = localMatchMedia(media),
            listeners   = [],
            index       = 0;

        mql.addListener = function(listener) {
            // Changes would not occur to css media type so return now (Affects IE <= 8)
            if (!hasMediaQueries) {
                return;
            }

            // Set up 'resize' listener for browsers that support CSS3 media queries (Not for IE <= 8)
            // There should only ever be 1 resize listener running for performance
            if (!isListening) {
                isListening = true;
                window.addEventListener('resize', handleChange, true);
            }

            // Push object only if it has not been pushed already
            if (index === 0) {
                index = queries.push({
                    mql         : mql,
                    listeners   : listeners
                });
            }

            listeners.push(listener);
        };

        mql.removeListener = function(listener) {
            for (var i = 0, il = listeners.length; i < il; i++){
                if (listeners[i] === listener){
                    listeners.splice(i, 1);
                }
            }
        };

        return mql;
    };
}());
//関数定義 ※実行する処理をこのファイルに記述しない
(function($) {
  $.DEVFUNC = {};
  //========================================
  //▼Accordion
  //========================================
  $.DEVFUNC.accordion = function(options) {
    var defaults = {
        wrap: $('.accordion'),
        item: $('.accordion-item'),
        target: '.accordion-title',
        contents: $('.accordion-content'),
        contentStr: '.accordion-content',
        hasClassSub: 'accordion-content'
      },
      s = $.extend(defaults, options);
    //Private Function
    function toggleSlide() {
      s.wrap.each(function() {
        $(this).children('.active').children(s.contentStr).slideDown(450);
        $(this).children('.active').addClass('active');
      });
      s.wrap.on('click', s.target, function(e) {
        if ($(this).next().hasClass(s.hasClassSub) == false) {
          return;
        }
        var parent = $(this).parent().parent();
        var subAccordion = $(this).next();
        parent.children('.active').children(s.contentStr).slideUp(450);
        parent.children('.active').removeClass('active');

        if (subAccordion.is(":visible")) {
          $(this).parent().removeClass("active");
          subAccordion.slideUp(450);
        } else {
          $(this).parent().addClass("active");
          subAccordion.slideDown(450);
        }

        e.preventDefault();
      });
    }
    //Public Fuction
    return {
      handleAccordion: function() {
        toggleSlide();
      }
    }
  }
  //========================================
  //▼ Smartphone menu
  //========================================
  $.DEVFUNC.spMenu = function(options) {
    var o = $.extend({
      menuBtn: [{
          oBtn:'#btn-nav-sp a', //menu button
          target:'#smartphone-menu' //Menu to expand
        }],
      closeBtn: '.close_btn', //Close button
      addClass: 'spmenu_open', //Class to be given to body
      //callBack: function() {}
    },options);
    var l = o.menuBtn.length;
    if(l >= 0){
      for(i=0;i<l;i++) {
        $(o.menuBtn[i].oBtn).on('click', {elem:o.menuBtn[i].target}, function(e) {
          var self = $(this);
          if(self.hasClass('active')){
            self.removeClass('active');
            $(e.data.elem).hide();
            $('body').removeClass(o.addClass);
          } else {
            for(var i=0;i<o.menuBtn.length;i++){
              if($(o.menuBtn[i].oBtn).hasClass('active')) $(o.menuBtn[i].oBtn).removeClass('active');
              $(o.menuBtn[i].target).hide();
            }
            self.addClass('active');
            $(e.data.elem).show();
            if(o.addClass) $('body').addClass(o.addClass);
          }
        });
        $(o.menuBtn[i].target).on('click', o.closeBtn, {elem:o.menuBtn[i]}, function(ev) {
          $(ev.data.elem.oBtn).removeClass('active');
          $(ev.data.elem.target).hide();
          $('body').removeClass(o.addClass);
        });

        // Processing to close the menu when tapping outside the screen
        $(document).on('click touchstart', {elem:o.menuBtn[i]}, function(e) {
            //Close if tapped element's parent is html element
            if(($(e.target).parent().is($('html')))){
            $(o.menuBtn).each(function(){
              if($(this.oBtn).hasClass('active')){
                $(this.oBtn).removeClass('active');
              }
            });
            $('body').removeClass(o.addClass);
            $(e.data.elem.target).hide();
            }
          });
      }
    }
  };
  //========================================
  //▼ Move element
  //========================================
  $.DEVFUNC.elemMove = function(option, model) {
    var option = $.GSET.MOVE_ELEM;
    if(!option || option.length <= 0) return false; //要素移動の設定が無い、もしくは移動の要素が無い場合に中断
    var eLength = option.length;
    for(i=0;i<eLength;i++){
      if(typeof option[i].flg === "undefined" || option[i].flg || option[i][model] || $(option[i].elem).length){
        switch(option[i][model][1]){
          case("append"): $(option[i][model][0]).append($(option[i].elem)); break;
          case("prepend"): $(option[i][model][0]).prepend($(option[i].elem)); break;
          case("after"): $(option[i][model][0]).after($(option[i].elem)); break;
          case("before"): $(option[i][model][0]).before($(option[i].elem)); break;
        }
      }
    }
  };
  //========================================
  //▼ MatchMedia
  //========================================
  var mql = Array();
  $.DEVFUNC.MATCHMEDIA = function() {
    for (model in $.GSET.MODEL) {
      var mediaQuery = matchMedia($.GSET.MODEL[model]);
      var mc = localStorage.getItem('pc');

      // ページが読み込まれた時に実行
      handle(mediaQuery);

      // ウィンドウサイズが変更されても実行されるように
      mediaQuery.addListener(handle);

      function handle(mq) {
        if (!mc) {
          for (model in $.GSET.MODEL) {
            if (mql[model].matches && !$('body').hasClass('model_' + model)) {
              $('body').addClass('model_' + model);
              $.HANDLEBREAKPOINT(model);
            }
            if (!mql[model].matches && $('body').hasClass('model_' + model)) {
              $('body').removeClass('model_' + model);
            }
          }
        } else if (mc) {
          for (model in $.GSET.MODEL) {
            $('body').removeClass('model_' + model);
          }
          model = 'pc';
          $('body').addClass('model_' + $.GSET.MODEL_CHANGE_SP_MODEL);
          $.HANDLEBREAKPOINT($.GSET.MODEL_CHANGE_BASE_MODEL);
        }
      }
    }
  };
  for (model in $.GSET.MODEL) {
    var mc = localStorage.getItem('pc');
    if (mc) {
      mql[model] = 'pc';
    } else {
      mql[model] = matchMedia($.GSET.MODEL[model]);
    }
  }
})(jQuery);