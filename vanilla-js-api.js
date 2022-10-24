function getAllUsers(){
	
	var users = [];
	  
	// Setup request to api
    var request = new XMLHttpRequest(),
    method = 'GET',
    url = 'https://jsonplaceholder.typicode.com/posts';

    request.open(method, url, true);
    request.onload = function () {
	  
	  // Parse the returned data
	  var result = JSON.parse(request.response);  	  

	  // Traverse each post
	  for(var post in result) {
		  
		  // Get the user that made the post
		  var user = result[post]['userId'];
		  
		  // If this user is not on our list
		  if(!users.includes(user)) {
			  
			  // Add the user
			  users.push(user);					
		  }
	  }
	  
	  // Create the html
	  var tableHtml = '<table style="border-spacing: 20px;"><th>Users</th>';	
	  for(var i = 0; i < users.length; i++) {
		  tableHtml += '<tr><td><a href="#" onclick="getPostsByUserId(' + users[i] + ')">' + users[i] + '</a></td></tr>';	  
	  }
	  tableHtml += '</table>';
		  
	  // Update the webpage with the html
	  var usersElement = document.getElementById("users");
	  usersElement.style.border = "solid";
	  usersElement.innerHTML = tableHtml;
    };

  request.send();

}
function getPostsByUserId(userId){
	// Send request to api
    var request = new XMLHttpRequest(),
    method = 'GET',
    url = 'https://jsonplaceholder.typicode.com/posts?userId=' + userId;

    request.open(method, url, true);
    request.onload = function () {
	  
	  // Parse the returned data
	  var result = JSON.parse(request.response);  
	  
	  // Create the html
	  var postHtml = '<h2>Posts By User ' + userId + '</h2><br><table style="border-spacing: 30px"><th>Post Id</th><th>Title</th><th>Body</th>';	
		  
		  // Traverse each post
		  for(var post in result) {
			  
			  // If this post was made by the specified user
			  if(result[post]['userId'] == userId) {
				  
				  // Create the post html
				  postHtml += '<tr style="outline: thin solid"><td>' + result[post]['id'] + '</td>';
				  postHtml += '<td>' + result[post]['title'] + '</td>'; 
				  postHtml += '<td>' + result[post]['body'] + '</td>'; 
				  postHtml += '</tr>';					
			  }		 
		  }	  
	  
	  postHtml += '</table>';
	  
	  // Update the webpage with the formatted html
	  var postsElement = document.getElementById("posts");
	  postsElement.style.border = "solid";
	  postsElement.innerHTML = postHtml;
    };

  request.send();

}