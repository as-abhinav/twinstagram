(function() {
  var App;

  App = App || {};

  App.loader = function(page) {
    var toPage;
    toPage = page;
    return History.pushState({
      page: toPage
    }, null, toPage.replace("#", ""));
  };

  App.pageChanger = function() {
    var toPage;
    toPage = $(this).data('page');
    return History.pushState({
      page: toPage
    }, null, toPage.replace("#", ""));
  };

  App.stateChange = function(e) {
    return App.getPage(History.getState());
  };

  App.getPage = function(state) {
    var showPage, toPage;
    toPage = state.data.page;
    showPage = $(toPage);
    showPage.parent().find(".page").hide();
    return showPage.show();
  };

  $(function() {
    $("body").on("click", ".pageChanger", App.pageChanger);
    History.Adapter.bind(window, 'popstate', App.stateChange);
    return App.loader("#homePage");
  });

}).call(this);
