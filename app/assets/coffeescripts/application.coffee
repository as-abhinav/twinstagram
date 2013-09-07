# App = App || {}

# App.loader = (page)->
#   toPage = page
#   History.pushState({page: toPage}, null, toPage.replace("#", ""))

# App.pageChanger = ->
#   toPage = $(this).data('page')
#   History.pushState({page: toPage}, null, toPage.replace("#", ""))


# App.stateChange =  (e)->
#   App.getPage(History.getState())

# App.getPage = (state) ->
#   toPage = state.data.page
#   showPage = $(toPage)
#   showPage.parent().find(".page").hide()
#   showPage.show()  

# $ ->
#   $("body").on("click", ".pageChanger", App.pageChanger)

#   History.Adapter.bind(window, 'popstate', App.stateChange)

#   App.loader("#homePage")

