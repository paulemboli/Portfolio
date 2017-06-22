function sendPost(){
  var title = document.getElementById('title');
  var body = document.getElementById('content');

$.ajax({

  type: "Post",
  url:"/posts",
  processData:false,
  contentType:'application/json',
  data:JSON.stringify({"title":title.value,"body":content.value})


})

}


function searchGoogle(){
  window.location = 'https://www.google.com/#safe=off&q=' + document.getElementById("search").value;
}
