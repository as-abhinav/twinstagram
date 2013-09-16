$ ->
	
	$item = $("#item")
	itemId = $item.data("id")

	success = (data) ->
		$item.append "<img src='" + data.data.image + "'>"
		$item.append "<h5 class='title'> " + data.data.title + "</h5>"
		$item.append "<span class='published_on'> on <strong>" + data.data.published_on + "<strong></span>"
		$item.append "<span class='postedBy'> by " + data.data.postedBy + "</span>"
		
	error = (xhr, type) ->
		console.log xhr
	
	$.ajax({
		type: "GET",
		url: "/posts/"+itemId,
		dataType: "json",
		success: success,
		error: error
		})