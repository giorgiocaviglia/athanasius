var api = athanasius.api();

api.getCollections("",function(response){
		
	if (response.status != '200')
		return;
	
    collections = response.result.objects
    
	var dataTable = athanasius.utils.datatable()
		.data(collections)
		.target("#collections")
		.paginate(true)
        //.selection(false)
		.keys(function(d){ return ['_id','name','description','curator', 'items_count']; })
		.label("_id","Id")
		.label("name","Name")
		.label("items_count","Items")
        .label("description","Description")
		.handle("name", function(d){ return "<a href='/collections/"+ d._id +"'>" + d.name + "</a>" })
		//.on("selected",function(d){console.log(d);})
	
})