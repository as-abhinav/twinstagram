(function() {
  var App;

  App = App || {};

  $(function() {
    $("button#capture").on("click", function() {
      var showPage;
      showPage = $($(this).data('page'));
      showPage.parent().find(".page").hide();
      return showPage.show();
    });
    App.loader = function(page) {
      $(".page").hide();
      return $("#" + page).show();
    };
    return App.loader("homePage");
  });

}).call(this);
