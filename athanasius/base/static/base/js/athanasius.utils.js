/*
	A JavaScript wrapper for Athanasius APIs
*/

(function(){

	athanasius.utils = {};
	
	athanasius.utils.datatable = function() {
		
		var datatable = {},
			target,
			data,
			sortOn,
			sortType = 1,
			keys,
			// pagination
			paginate = false,
			currentPage = 0,
			pages,
			perPage = 20,
			// selection
			selection = true,
			selectAllStatus = false,
			labels = {},
			highlight = function(){ return[]; },
			handlers = {},
			render = {},
			event = d3.dispatch(
				"click",
				"selected"
				);
		
		datatable.update = function(){
			
			if (!data || !target)
				return datatable;
			
			pages = paginate ? d3.range(Math.ceil(data.length / perPage)) : 0;

			var keysArray = keys ? keys() : d3.keys(data[0])
			
			d3.select(target)
				.select(".datatable-main").remove();
			
			var main = d3.select(target)
				.append("div")
				.attr("class","datatable-main")			
			
			var table = main
				.append("table")
				.attr("class","datatable-table table table-striped")
			
			var tr_head = table
				.append("thead")
				.append("tr")

			tr_head.selectAll("th")
				.data(keysArray)
				.enter().append("th")
					.attr("class",function(d){ return sortOn == d ? "datatable-sorted" : "" })
					.on("click", function (d) { if (sortOn == d) sortType *= -1; sortOn = d; datatable.update(); })
					.html(function(d){ return labels[d] ? labels[d] : d; }) // dizionario, in caso...
			
			var tbody = table
				.append("tbody")
			
			var tr = tbody
				.selectAll("tr")
				.data(data)
				.enter().append("tr")
					.sort(function (a, b) { return /*a == null || b == null ? 0 : */stringCompare(a[sortOn], b[sortOn]); })
					//.attr("class", function(d,i){ return i % 2 ? "odd" : "even"; })
					.attr("class", function(d,i){ return d.__selected__ ? "datatable-selected" : "" })
					.style("display",function(d,i){
						
						var offset = currentPage * perPage;
						return i >= offset  && i < offset + perPage || !pages ? "table-row" : "none";
					})
					
		    var td = tr.selectAll("td")
				.data(function(d){ return keysArray.map(function(k){ return { key: k, value: d[k] }; }) })
				.enter().append("td")
					.filter(function(d){ return keysArray.indexOf(d.key) != -1 ? true : false; })
					.html(function(d){
						return handlers[d.key] ? handlers[d.key](d3.select(this.parentNode).data()[0]) : d.value;
					})
					.attr("class",function(d){
						 return highlight().indexOf(d.key) != -1 ? "datatable-highlight" : null;
					 })
					/*.on("click",function(d){
						var e = {
							row : d3.select(this.parentNode).data()[0],
							cell : d,
							target : this
						}
						event.click(e);
					});*/
			
			/* Selection */
			
			if (selection){
				
				tr_head.insert("th","th")
					.append("input")
					.attr("type","checkbox")
					.attr("class","datatable-checkall")
					.property("checked", selectAllStatus)
					.on("click", function(){
						
						selectAllStatus = d3.select(".datatable-checkall").property("checked");
						
						tr.each(function(d){
							d3.select(this).data()[0].__selected__ = selectAllStatus;
						})
						
						datatable.update();
					})
					
				tr.insert("td","td")
					.append("input")
					.attr("type","checkbox")
					.attr("class","datatable-check")
					.property("checked",function(d){ return d.__selected__ ? d.__selected__ : selectAllStatus; })
					.on("click",function(d){
						
						d.__selected__ = !d.__selected__;
						console.log()
						d3.select(d3.select(this).node().parentNode.parentNode).selectAll("td").attr("class", function() { return d.__selected__ ? "datatable-selected" : "";})
						
						var e = {
							row : d3.select(this.parentNode).data()[0],
							cell : d,
							target : this
						}
						event.selected(e);
					})
					.each(function(d){ 
						d.__selected__ = d.hasOwnProperty('__selected__') ? d.__selected__ : false;
					})
				
			} 
			
			
			/* Pagination */
			
			if (paginate && pages.length > 1) {
				
				var pagination = main
					.append("div")
					.attr("class","datatable-pagination pagination pagination-centered")
				
				var start = currentPage >= 5 ? currentPage-5 : 0,
					end = pages.length - currentPage >= 6 ? currentPage + 6 : pages.length;
				
				pagination
					.append("ul")
					.selectAll("li")
					.data(pages.slice(start,end))
					.enter().append("li")
						.attr("class", function(d){ return currentPage == d ? "active" : "" })
						.append("a")
						.attr("href","#")
							.html(function(d){return parseInt(d)+1;})
							.on("click",function(){
								currentPage = parseInt(d3.select(d3.event.target).data());
								datatable.update();
							})
				/*			
				pagination.select("ul")
					.append("li")
					.append("a")
						.html("...")
						*/
			}
			
			function stringCompare(a, b) {
				
				var a_val = typeof a == "undefined" ? "" : a,
					b_val = typeof b == "undefined" ? "" : b;
				
				return a_val > b_val ? 1 * sortType : a_val == b_val ? 0 : -1 * sortType;
			}
			
			return datatable;
		}
		
		datatable.data = function(x) {
			if (!arguments.length) return data;
			data = x;
			datatable.update()
			return datatable;
		}
		
		datatable.render = function(key,call) {
			if (!arguments.length) return;
			if (arguments.length == 1) return render[key];
			render[key] = call;
			datatable.update()
			return datatable;
		}

		datatable.target = function(x) {
			if (!arguments.length) return target;
			target = x;
			datatable.update()
			return datatable;
		}
		
		datatable.on = function(type, listener) {
			if (!arguments.length) return;
			event.on(type,listener);
			datatable.update()
			return datatable;
		}
		
		datatable.keys = function(x) {
			if (!arguments.length) return keys;
			keys = x;
			if (!sortOn) sortOn = keys()[0]; // default setting
			datatable.update()
			return datatable;
		}
		
		datatable.highlight = function(x) {
			if (!arguments.length) return highlight;
			highlight = x;
			datatable.update()
			return datatable;
		}
		
		datatable.handle = function(key, handler) {
			if (!arguments.length) return;
			if (!arguments.length == 1) return handlers[key];
			handlers[key] = handler;
			datatable.update()
			return datatable;
		}
		
		datatable.label = function(key, label) {
			if (!arguments.length) return;
			if (!arguments.length == 1) return labels[key];
			labels[key] = label;
			datatable.update()
			return datatable;
		}
				
		datatable.sortOn = function(x) {
			if (!arguments.length) return sortOn;
			sortOn = x;
			datatable.update()
			return datatable;
		}
		
		datatable.paginate = function(x) {
			if (!arguments.length) return paginate;
			paginate = Boolean(x) ? x : paginate;
			datatable.update()
			return datatable;
		}
		
		datatable.selection = function(x) {
			if (!arguments.length) return selection;
			selection = Boolean(x) ? x : selection;
			datatable.update()
			return datatable;
		}
		
		datatable.selected = function() {
			return selected;
		}
		
		
		
		return datatable;
			
	}
	
	athanasius.utils.loading = function(target){
		
		$(target).ajaxStart(function(){
			d3.select(this)
				.style("display","block")
		})

		$(target).ajaxStop(function(){
			d3.select(this)
				.style("display","none")
		})
		
	}
	


})();
