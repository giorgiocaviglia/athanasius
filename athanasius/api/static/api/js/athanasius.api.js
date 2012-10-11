/*
	A JavaScript wrapper for Athanasius APIs
*/

(function(){

	athanasius = {};

	//TODO: use a more robust pattern for object creation
	athanasius.api = function(baseUrl){
		
		var api = {},
			baseUrl = baseUrl || ""

		
		
		/* Search */

		var searchManager = $.manageAjax.create('searchManager', {
			queue: true,
			abortOld: true, 
			cacheResponse: false,
		});
		
		api.search = function(data, callback) {   
			var url = baseUrl + "/api/search/";
			
			$.manageAjax.abort('searchManager');
			$.manageAjax.clear('searchManager');
			
			$.manageAjax.add('searchManager', {
				type: 'GET',
		        url: url,
				data : data,
				success: callback,
				dataType: 'json'
			});
		}
		
		
		/* Collections */

		var collectionsManager = $.manageAjax.create('collectionsManager', {
			queue: false,
			abortOld: true, 
			cacheResponse: true,
			maxRequests: 1
		});
		
		api.getCollections = function(id, callback, args) {    
			var url = baseUrl + "/api/collections/" + id;
			$.manageAjax.add('collectionsManager', {
				type: 'GET',
		        url: url,
				data : args,
				success: callback,
				dataType: 'json'
			});
		}
		
		api.addCollections = function(args, callback) {    
			var url = baseUrl + "/api/collections/";
			$.manageAjax.add('collectionsManager', {
				type: 'POST',
		        url: url,
				data : args,
				success: callback,
				dataType: 'json'
			});
		}
		
		
		/* Schemas */

		var schemasManager = $.manageAjax.create('schemasManager', {
			queue: false,
			abortOld: true, 
			cacheResponse: false,
			maxRequests: 1
		});
		
		api.getSchemas = function(id, callback, args) {    
			var url = baseUrl + "/api/schemas/" + id;
			$.manageAjax.add('schemasManager', {
				type: 'GET',
		        url: url,
				data : args,
				success: callback,
				dataType: 'json'
			});
		}
		
		api.addSchemas = function(args, callback) {    
			var url = baseUrl + "/api/schemas/";
			$.manageAjax.add('schemasManager', {
				type: 'POST',
		        url: url,
				data : args,
				success: callback,
				dataType: 'json'
			});
		}
		
		
		/* An helper for having the id formetted */
		api.getObjectId = function(obj){
	
			try {
				id = obj['_id'].split("[OBID]")[1];
			}
			catch(e) {
				try {
					id = obj.split("[OBID]")[1];
				}
				catch(e) {
					id = obj;
				}
			}
	
			return id;	
		}
        
        
        /* Parser */
        
		var parseManager = $.manageAjax.create('parseManager', {
			queue: false,
			abortOld: true, 
			cacheResponse: true,
			maxRequests: 1
		});
        
		api.parse = function(data, callback) {   
			var url = baseUrl + "/api/parse/";
						
			$.manageAjax.add('parseManager', {
				type: 'GET',
		        url: url,
				data : data,
				success: callback,
				dataType: 'json'
			});
		}
        
        
        /* Merging */
        
		var mergeManager = $.manageAjax.create('mergeManager', {
			queue: false,
			abortOld: true, 
			cacheResponse: true,
			maxRequests: 1
		});
        
		api.merge = function(data, callback) {   
			var url = baseUrl + "/api/merge/";
						
			$.manageAjax.add('mergeManager', {
				type: 'GET',
		        url: url,
				data : data,
				success: callback,
				dataType: 'json'
			});
		}
		
		
		
		/* Adding csrf_token to each query */

		$(document).ajaxSend(function(event, xhr, settings) {
		    function getCookie(name) {
		        var cookieValue = null;
		        if (document.cookie && document.cookie != '') {
		            var cookies = document.cookie.split(';');
		            for (var i = 0; i < cookies.length; i++) {
		                var cookie = jQuery.trim(cookies[i]);
		                // Does this cookie string begin with the name we want?
		                if (cookie.substring(0, name.length + 1) == (name + '=')) {
		                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
		                    break;
		                }
		            }
		        }
		        return cookieValue;
		    }
		    function sameOrigin(url) {
		        // url could be relative or scheme relative or absolute
		        var host = document.location.host; // host + port
		        var protocol = document.location.protocol;
		        var sr_origin = '//' + host;
		        var origin = protocol + sr_origin;
		        // Allow absolute or scheme relative URLs to same origin
		        return (url == origin || url.slice(0, origin.length + 1) == origin + '/') ||
		            (url == sr_origin || url.slice(0, sr_origin.length + 1) == sr_origin + '/') ||
		            // or any other URL that isn't scheme relative or absolute i.e relative.
		            !(/^(\/\/|http:|https:).*/.test(url));
		    }
		    function safeMethod(method) {
		        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
		    }

		    if (!safeMethod(settings.type) && sameOrigin(settings.url)) {
		        xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
		    }
		});
				
		return api;
	
	};









})();