(function ($) {
  /*****No javascript*****/
  $('body').removeClass('no-javascript').addClass('used-javascript');
  /*****Tab*****/
  $('.supplier-tabs li a').click(function (e) {
    e.preventDefault();
    $('.supplier-tabs li').removeClass('active');
    $(this).parent().addClass('active');
    $(this).tab('show');
  });
  /*****Accordion*****/
  var accordion = new $.DEVFUNC.accordion();
  accordion.handleAccordion();
  /*****Smartphone menu settings*****/
  $.DEVFUNC.spMenu({
    menuBtn: [
      {
        oBtn: '#btn-nav-sp a',
        target: '#sub-menu-sp',
      },
    ],
    closeBtn: '.close_btn', //閉じるボタン
    addClass: 'spmenu_open', //bodyに付与するクラス(不要の場合空にする)
    // callBack: function(){
    //   $('#btn-nav-sp a').on('click', function(e){
    //     if ($('#btn-nav-sp a.sma_menu_open').hasClass('active')){
    //       $('#btn-nav-sp a.sma_menu_open .menu_text').html('Close');
    //     }else{
    //       $('#btn-nav-sp a.sma_menu_open .menu_text').html('Menu');
    //     }
    //   });
    // }
  });
  // Processing for each breakpoint
  $.HANDLEBREAKPOINT = function (model) {
    $.DEVFUNC.elemMove($.GSET.MOVE_ELEM, model); //Move element
    // Mainvisual
    if ($('.partner-wrap .partner-slides').length) {
      partner_slides.resize(model);
    }
  };
  $.DEVFUNC.MATCHMEDIA();
  //Processing for each screen resize

  //==================================================
  //▼ Only processed once when loading the screen end
  //==================================================
  var timer = false;
  $(window).resize(function () {
    if (timer !== false) {
      clearTimeout(timer);
    }
    timer = setTimeout(function () {}, 0);
  });
})(jQuery);
