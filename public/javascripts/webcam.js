(function() {
  $(function() {
    var applyFilter, brightness, getImage, grayscale, invert, onError, onSuccess, processImage, sepia, threshold;
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
      var canvas, ch, context, cw, v;
      v = $("#video").get(0);
      canvas = $("#canvas").get(0);
      context = canvas.getContext("2d");
      cw = Math.floor(canvas.clientWidth);
      ch = Math.floor(canvas.clientHeight);
      canvas.width = cw;
      canvas.height = ch;
      return context.drawImage(v, 0, 0, cw, ch);
    };
    processImage = function() {
      var canvas, context, filterType, imageData;
      filterType = $(this).data("filter-type");
      canvas = $("#canvas").get(0);
      context = canvas.getContext("2d");
      imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      return context.putImageData(applyFilter(filterType, imageData), 0, 0);
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
    $("#btnClick").on("click", getImage);
    $("#filterBtns button").on("click", processImage);
    return $("#save").on("click", function() {
      return Canvas2Image.saveAsPNG($("#canvas").get(0));
    });
  });

}).call(this);
