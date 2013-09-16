$ ->
	show = (item) ->
		$("#list").append "<li><a href='/show/" + item.id + "'><img src=" + item.image + "></a></li>";
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