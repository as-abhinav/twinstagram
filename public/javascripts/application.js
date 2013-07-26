(function() {
  var App;

  App = App || {};

  App.loader = function(page) {
    $(".page").hide();
    return $("#" + page).show();
  };

  App.pageChanger = function() {
    var showPage;
    showPage = $($(this).data('page'));
    showPage.parent().find(".page").hide();
    return showPage.show();
  };

  $(function() {
    $("body").on("click", ".pageChanger", App.pageChanger);
    return App.loader("homePage");
  });

}).call(this);
