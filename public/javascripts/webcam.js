(function() {
  $(function() {
    var applyFilter, brightness, canvas, canvasButton, canvasThumbs, context, contextButton, contextThumbs, createButtons, getImage, grayscale, invert, onError, onSuccess, paintCanvas, processImage, sepia, threshold;
    canvas = $("#canvas").get(0);
    context = canvas.getContext("2d");
    canvasThumbs = $("#canvasThumbs").get(0);
    contextThumbs = canvasThumbs.getContext("2d");
    canvasButton = $("#canvasButton").get(0);
    contextButton = canvasButton.getContext("2d");
    createButtons = function() {
      var imageData;
      imageData = null;
      contextButton.drawImage($("#TWISTALogo").get(0), 10, 10);
      $("#filterBtns.btn-box button").each(function() {
        var filterType, url;
        filterType = $(this).data("filter-type");
        imageData = context.getImageData(0, 0, canvasButton.width, canvasButton.height);
        imageData = applyFilter(filterType, imageData);
        contextThumbs.putImageData(imageData, -50, -50);
        url = "url('" + canvasThumbs.toDataURL("image/png") + "')";
        return $(this).css({
          "background": url
        });
      });
      imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      return contextThumbs.putImageData(imageData, 0, 0);
    };
    onError = function(err) {
      return console.log("The following error occured: " + err);
    };
    onSuccess = function(localMediaStream) {
      var url, video;
      video = $("#video").get(0);
      video.autoplay = true;
      url = (navigator.mozGetUserMedia ? window.URL : window.webkitURL);
      return video.src = url.createObjectURL(localMediaStream);
    };
    getImage = function() {
      var ch, cw, v;
      v = $("#video").get(0);
      cw = Math.floor(canvas.clientWidth);
      ch = Math.floor(canvas.clientHeight);
      canvas.width = cw;
      canvas.height = ch;
      context.drawImage(v, 0, 0, cw, ch);
      context.save();
      contextThumbs.drawImage(v, 0, 0, cw, ch);
      return createButtons();
    };
    processImage = function() {
      var filterType, imageData;
      filterType = $(this).data("filter-type");
      imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      return paintCanvas(applyFilter(filterType, imageData));
    };
    paintCanvas = function(imageData) {
      return context.putImageData(imageData, 0, 0);
    };
    applyFilter = function(filterType, imageData) {
      switch (filterType) {
        case "bnw":
          return grayscale(imageData);
        case "brightness":
          return brightness(imageData, 10);
        case "darkness":
          return brightness(imageData, -10);
        case "sepia":
          return sepia(imageData);
        case "threshold":
          return threshold(imageData, 128, 100, 10);
        case "invert":
          return invert(imageData);
      }
    };
    grayscale = function(pixels, args) {
      var b, d, g, i, r;
      d = pixels.data;
      i = 0;
      while (i < d.length) {
        r = d[i];
        g = d[i + 1];
        b = d[i + 2];
        d[i] = d[i + 1] = d[i + 2] = 0.2126 * r + 0.7152 * g + 0.0722 * b;
        i += 4;
      }
      return pixels;
    };
    brightness = function(pixels, adjustment) {
      var d, i;
      d = pixels.data;
      i = 0;
      while (i < d.length) {
        d[i] += adjustment;
        d[i + 1] += adjustment;
        d[i + 2] += adjustment;
        i += 4;
      }
      return pixels;
    };
    sepia = function(pixels) {
      var b, d, g, i, r;
      d = pixels.data;
      i = 0;
      while (i < d.length) {
        r = d[i];
        g = d[i + 1];
        b = d[i + 2];
        d[i] = (r * 0.393) + (g * 0.769) + (b * 0.189);
        d[i + 1] = (r * 0.349) + (g * 0.686) + (b * 0.168);
        d[i + 2] = (r * 0.272) + (g * 0.534) + (b * 0.131);
        i += 4;
      }
      return pixels;
    };
    threshold = function(pixels, threshold, high, low) {
      var b, d, dst, g, i, r, v;
      if (high == null) {
        high = 255;
      }
      if (low == null) {
        low = 0;
      }
      d = pixels.data;
      dst = pixels.data;
      i = 0;
      while (i < d.length) {
        r = d[i];
        g = d[i + 1];
        b = d[i + 2];
        v = (0.3 * r + 0.59 * g + 0.11 * b >= threshold ? high : low);
        dst[i] = dst[i + 1] = dst[i + 2] = v;
        dst[i + 3] = d[i + 3];
        i += 4;
      }
      return pixels;
    };
    invert = function(pixels) {
      var d, dst, i;
      d = pixels.data;
      dst = pixels.data;
      i = 0;
      while (i < d.length) {
        dst[i] = 255 - d[i];
        dst[i + 1] = 255 - d[i + 1];
        dst[i + 2] = 255 - d[i + 2];
        dst[i + 3] = d[i + 3];
        i += 4;
      }
      return pixels;
    };
    navigator.getMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
    navigator.getMedia({
      video: true,
      audio: true
    }, onSuccess, onError);
    $("#restore").on("click", function(e) {
      var imageData;
      imageData = contextThumbs.getImageData(0, 0, canvasThumbs.width, canvasThumbs.height);
      return context.putImageData(imageData, 0, 0);
    });
    $("#btnClick").on("click", function(e) {
      e.preventDefault();
      return getImage();
    });
    $("#filterBtns button").on("click", processImage);
    return $("#save").on("click", function() {
      return Canvas2Image.saveAsPNG($("#canvas").get(0));
    });
  });

}).call(this);
