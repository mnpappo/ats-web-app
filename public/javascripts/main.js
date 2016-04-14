$(document).ready(function() {
  //Initialize tooltips
  $('.nav-tabs > li a[title]').tooltip();

  //Wizard
  $('a[data-toggle="tab"]').on('show.bs.tab', function(e) {

    var $target = $(e.target);

    if ($target.parent().hasClass('disabled')) {
      return false;
    }
  });

  //$(".next-step").click(function(e) {
  //
  //  var $active = $('.wizard .nav-tabs li.active');
  //  $active.next().removeClass('disabled');
  //  nextTab($active);
  //
  //});
  //$(".prev-step").click(function(e) {
  //
  //  var $active = $('.wizard .nav-tabs li.active');
  //  prevTab($active);
  //
  //});

  $('.navbar-toggle').click(function() {
    $('.navbar-nav').toggleClass('slide-in');
    $('.side-body').toggleClass('body-slide-in');
    $('#search').removeClass('in').addClass('collapse').slideUp(200);

    /// uncomment code for absolute positioning tweek see top comment in css
    //$('.absolute-wrapper').toggleClass('slide-in');

  });

  // Remove menu for searching
  $('#search-trigger').click(function() {
    $('.navbar-nav').removeClass('slide-in');
    $('.side-body').removeClass('body-slide-in');

    /// uncomment code for absolute positioning tweek see top comment in css
    //$('.absolute-wrapper').removeClass('slide-in');

  });
});

function nextTab(elem) {
  $(elem).next().find('a[data-toggle="tab"]').click();
}

function prevTab(elem) {
  $(elem).prev().find('a[data-toggle="tab"]').click();
}
