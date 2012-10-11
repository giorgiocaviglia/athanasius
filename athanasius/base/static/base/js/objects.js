var api = athanasius.api();

var mapper = athanasius.mapper();

var collection;

/*
api.getTypes("", function(result){

	athanasius.utils.searchlist()
		.data(result.results)
		.target("#objects-result")
		.label(function(d){
			return "<span>" + d.label + "</span> <small> " + d.description + "</small>";
		})
		.value(function(d){
			return d.label;
		})
		.filter(function(d, s){ 
			return d.label.toLowerCase().search(s.toLowerCase()) != -1;
		})
		.on("click",function(d){ console.log(d); })
})
*/
	
api.getCollections("",function(response){
		
	if (!response.status)
		return;
		
	var collections = response.results;
		
	d3.select(".dropdown-menu")
		.selectAll("li")
		.data(collections)
		.enter().append("li")
		.append("a")
		.attr("tabindex","-1")
		.attr("href","#")
		.text(function(d){
			return d.name + " (" +  d._id + ")";
		})
		.on("click",function(d){
			d3.select(".btn-label")
				.text(d.name)
			collection = d.id;
		})
})

var request;

$("#fileUpload").fileupload({
	url : "../api/upload",
	dataType : 'json',
	done: function(e, data){
				
		if (data.result.status) {
			d3.select("#objects-alert")
				.attr("class","alert alert-success")
				.html("<b>Yeah! Success!</b>")
				d3.select("#objects-upload-file")
					.transition()
					.style("display","none")
		}
		else {
			d3.select("#objects-alert")
				.attr("class","alert alert-error")
				.html("<b>Sorry, something went wrong:</b><br/>" + data.result.errors)
				return;
		}	
		
		console.log(e, data.result);
		
		var results = data.result.results
		
		mapper.keys(d3.keys(results[0]))
			.target("#objects-result")
			
		
	},
	add: function(e,data){
		data.url = "../api/upload/"
		request = data;
	},
	fail: function( e, data ){
		
		d3.select("#objects-alert")
			.attr("class","alert alert-error")
			.html("Sorry, something went wrong.")
		
		console.log("failed!", data.error);
	},
	progress: function(e, data){
		var progress = parseInt(data.loaded / data.total * 100, 10);
		console.log("progress:",progress)
	}

})

$("#uploadFile").click(function(){
	request.submit()
})

/*		

$("#startMatch").click(function(){
	request.submit()
})	
	

function createFields(){
	
	
	
}

	
function chooseType(){
	
	api.getTypes("",function(response){
		
		if (!response.status)
			return;
		
		var types = response.results; 
		
		types = types.filter(function(d){
			return d.attributes.length > 0;
		})
		
		var dataTable = athanasius.utils.datatable()
			.data(types)
			.target("#objects-result")
			//.paginate(true)
			.keys(function(d){ return ['label','description','_id','select']; })
			.label("_id","Id")
			.selection(false)
			//.label("PrimaryName","Name (Primary)")
			.handle("_id", function(d){
				return "<a href='#' class='id-popover' rel='popover' data-content='" + d.description + "' data-original-title='" + d.label + "'>" + d._id  + "</a>"
			})
			.handle("select", function(d){
				return "<a class='btn btn-small'>Use this!</a>";
			})
			
			$(".id-popover").popover({
				trigger : 'hover'
			})
			//.handle("PrimaryName", function(d){ return "<a href='/explore/persons/"+ api.getObjectId(d['_id']) +"'>" + d['PrimaryName'] + "</a>" })
			//.on("selected",function(d){console.log(d);})
		
	})
	
	
}
*/
	
	