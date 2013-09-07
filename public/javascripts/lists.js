(function() {
  $(function() {
    var error, show, success;
    show = function(item) {
      return $("#list").append("<li><img src=" + item.image + "></li>");
    };
    success = function(data) {
      var item, _i, _len, _ref, _results;
      _ref = data.data;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        item = _ref[_i];
        _results.push(show(item));
      }
      return _results;
    };
    error = function(xhr, type) {
      return $("#list").append(xhr.response);
    };
    return $.ajax({
      type: "GET",
      url: "/posts",
      dataType: "json",
      success: success,
      error: error
    });
  });

}).call(this);
