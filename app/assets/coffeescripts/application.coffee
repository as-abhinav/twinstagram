App = App || {}

$ ->
  $("button#capture").on("click", ->
    showPage = $($(this).data('page'))
    showPage.parent().find(".page").hide()
    showPage.show()
  )
  
  App.loader = (page)->
    $(".page").hide()
    $("#"+ page).show()


  App.loader("homePage")
