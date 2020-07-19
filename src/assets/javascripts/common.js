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
  /*****diagram*****/
  // var diagramArr = [];
  // $('.diagram-list .diagram-item').each(function(i, value){
  //   var item = $(this);
  //   var offset_item = $(this).position().top;

  //   diagramArr.push(offset_item);
  //   console.log(diagramArr[i]);
  //   $('.milestones-diagram .diagram-col:nth-child(2) .diagram-item').css({'top': +diagramArr[i]});
  //   $('.milestones-diagram .diagram-col:nth-child(3) .diagram-item').css({'top': +diagramArr[i-1]});
  //   $('.milestones-diagram .diagram-col:nth-child(4) .diagram-item').css({'top': +diagramArr[i-2]});
  //   $('.milestones-diagram .diagram-col:nth-child(5) .diagram-item').css({'top': +diagramArr[i-3]});
  //   $('.milestones-diagram .diagram-col:nth-child(6) .diagram-item').css({'top': +diagramArr[i-4]});
  //   $('.milestones-diagram .diagram-col:nth-child(7) .diagram-item').css({'top': +diagramArr[i-5]});
  //   $('.milestones-diagram .diagram-col:nth-child(8) .diagram-item').css({'top': +diagramArr[i-6]});
  //   $('.milestones-diagram .diagram-col:nth-child(9) .diagram-item').css({'top': +diagramArr[i-7]});
  // });
  function diagram_position() {
    $('.milestones-diagram .diagram-col .diagram-item').each(function (
      i,
      value,
    ) {
      var ofs_appointment = $(this).find('.diagram-unit').offset();
      var data_type = $(this).find('.diagram-unit').attr('data-type');
      console.log(ofs_appointment);
      $(this)
        .find('.diagram-unit')
        .hover(
          function () {
            $('.diagram-popup').fadeIn(350);
            $('.diagram-popup p').text(data_type);
            $('.diagram-popup').css({
              left: ofs_appointment.left - 133,
              top: ofs_appointment.top + 88,
            });
          },
          function () {
            $('.diagram-popup').hide();
          },
        );
    });
  }
  diagram_position();
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
    //   console.log("Dao");
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
    timer = setTimeout(function () {
      diagram_position();
    }, 0);
  });
})(jQuery);
