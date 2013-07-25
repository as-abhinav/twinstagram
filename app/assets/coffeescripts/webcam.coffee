$ ->
  onError = (err) ->
    console.log "The following error occured: " + err

  onSuccess = (localMediaStream) ->
    video = $("#video").get(0)
    video.autoplay = true
    url = (if navigator.mozGetUserMedia then window.URL else window.webkitURL)
    video.src = url.createObjectURL(localMediaStream)

  getImage = ->
    v = $("#video").get(0)
    canvas = $("#canvas").get(0)
    context = canvas.getContext("2d")
    cw = Math.floor(canvas.clientWidth)
    ch = Math.floor(canvas.clientHeight)
    canvas.width = cw
    canvas.height = ch
    context.drawImage v, 0, 0, cw, ch

  processImage = ->
    filterType = $(this).data("filter-type")
    canvas = $("#canvas").get(0)
    context = canvas.getContext("2d")
    imageData = context.getImageData(0, 0, canvas.width, canvas.height)
    context.putImageData applyFilter(filterType, imageData), 0, 0

  applyFilter = (filterType, imageData) ->
    switch filterType
      when "bnw"
        grayscale imageData
      when "brightness"
        brightness imageData, 10
      when "darkness"
        brightness imageData, -10
      when "sepia"
        sepia imageData
      when "threshold"
        threshold imageData, 128, 100, 10
      when "invert"
        invert imageData

  grayscale = (pixels, args) ->
    d = pixels.data
    i = 0

    while i < d.length
      r = d[i]
      g = d[i + 1]
      b = d[i + 2]
      d[i] = d[i + 1] = d[i + 2] = (0.2126 * r + 0.7152 * g + 0.0722 * b)
      i += 4
    pixels

  brightness = (pixels, adjustment) ->
    d = pixels.data
    i = 0

    while i < d.length
      d[i] += adjustment
      d[i + 1] += adjustment
      d[i + 2] += adjustment
      i += 4
    pixels

  sepia = (pixels) ->
    d = pixels.data
    i = 0

    while i < d.length
      r = d[i]
      g = d[i + 1]
      b = d[i + 2]
      d[i] = (r * 0.393) + (g * 0.769) + (b * 0.189) # red
      d[i + 1] = (r * 0.349) + (g * 0.686) + (b * 0.168) # green
      d[i + 2] = (r * 0.272) + (g * 0.534) + (b * 0.131) # blue
      i += 4
    pixels

  threshold = (pixels, threshold, high, low) ->
    high = 255  unless high?
    low = 0  unless low?
    d = pixels.data
    dst = pixels.data
    i = 0

    while i < d.length
      r = d[i]
      g = d[i + 1]
      b = d[i + 2]
      v = (if (0.3 * r + 0.59 * g + 0.11 * b >= threshold) then high else low)
      dst[i] = dst[i + 1] = dst[i + 2] = v
      dst[i + 3] = d[i + 3]
      i += 4
    pixels

  invert = (pixels) ->
    d = pixels.data
    dst = pixels.data
    i = 0

    while i < d.length
      dst[i] = 255 - d[i]
      dst[i + 1] = 255 - d[i + 1]
      dst[i + 2] = 255 - d[i + 2]
      dst[i + 3] = d[i + 3]
      i += 4
    pixels

  navigator.getMedia = (navigator.getUserMedia or navigator.webkitGetUserMedia or navigator.mozGetUserMedia or navigator.msGetUserMedia)
  navigator.getMedia
    video: true
    audio: true
  , onSuccess, onError
  $("#btnClick").on "click", getImage
  $("#filterBtns button").on "click", processImage
  $("#save").on "click", ->
    Canvas2Image.saveAsPNG $("#canvas").get(0)

