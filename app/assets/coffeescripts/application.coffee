App = App || {}

App.loader = (page)->
  $(".page").hide()
  $("#"+ page).show()

App.pageChanger = ->
  showPage = $($(this).data('page'))
  showPage.parent().find(".page").hide()
  showPage.show()

$ ->
  $("body").on("click", ".pageChanger", App.pageChanger)
  
  App.loader("homePage")
