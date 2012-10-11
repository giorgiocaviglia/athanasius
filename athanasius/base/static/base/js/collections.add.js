var api = athanasius.api();

var collectionIsValid = false;


$("#collectionId").keyup(function(e){

	var collectionId = $("#collectionId").val()
	
	if (collectionId.length < 2) {
		setNotValid("At least 2 chars!");
		return;
	}
	
	var alphaOnly = /[a-z1234567890]/g;
		
	restrictionType = alphaOnly;
	
	for (var i=0; i < collectionId.length; i++) {
		var character = collectionId[i];
		var code = collectionId.charCodeAt(i);	
		// if they pressed esc... remove focus from field...
			if (code==27) { this.blur(); return false; }
			// ignore if they are press other keys
			// strange because code: 39 is the down key AND ' key...
			// and DEL also equals .
			if (!e.ctrlKey && code!=9 && code!=8 && code!=36 && code!=37 && code!=38 && (code!=39 || (code==39 && character=="'")) && code!=40) {
				if (!character.match(restrictionType)) {
					setNotValid();
					return;
				} 
			}
	}
	
	var query = { '_id' : collectionId }
	var data = {}
	data['query'] = JSON.stringify(query)
	data['collection'] = "collections"
	
	api.search(data,function(response){
		
		if (/*response.status && */response.results.length == 0)
			setValid();
		
		else
			setNotValid("Collection already exists!");
	})
	
})


function setValid(msg){
	var msg = msg || "VALID"
	d3.select("#collectionIdCheck")
		.style("display","inline-block")
		.attr("class","label label-success")
		.text(msg)
	collectionIsValid = true;
}

function setNotValid(msg){
	var msg = msg || "INVALID"
	d3.select("#collectionIdCheck")
		.style("display","inline-block")
		.attr("class","label label-important")
		.text(msg)
	collectionIsValid = false;
}


$("#createCollection").click(function(){
	
	if (!collectionIsValid)
		return;
	
	if ($("#collectionName").val().length == 0)
		return;
	
	collectionData = {
		"_id" : $("#collectionId").val(),
		"name" : $("#collectionName").val(),
		"descripton" : $("#collectionDescription").val(),
		"author" : $("#collectionCurator").val(),
	}
	
	var data = {}
	data['items'] = JSON.stringify(collectionData)
	api.addCollections(data,function(response){
		
		console.log(response)
		
	})
})