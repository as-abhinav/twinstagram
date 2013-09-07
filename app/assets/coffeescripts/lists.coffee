$ ->
	show = (item) ->
		$("#list").append "<li><img src=" + item.image + "></li>";
	success = (data) ->
		show item for item in data.data 

	error = (xhr, type) ->
		$("#list").append xhr.response

	$.ajax({
			type: "GET",
			url: "/posts",
			dataType: "json",
			success: success,
			error: error
		});