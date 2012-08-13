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
			queue: false,
			abortOld: true, 
			cacheResponse: false
		});
		
		api.search = function(query, callback) {    
			var url = baseUrl + "/api/search/";
			
			$.manageAjax.abort('searchManager');
			$.manageAjax.clear('searchManager');
			
			$.manageAjax.add('searchManager', {
				type: 'GET',
		        url: url,
				data : query,
				success: callback,
				dataType: 'json'
			});
		}
		
		/* Suggest */
		var suggestManager = $.manageAjax.create('suggestManager', {
			queue: false,
			abortOld: true, 
			cacheResponse: true,
			maxRequests: 1
		});
		
		api.suggest = function(query, callback) {    
			var url = baseUrl + "/api/suggest/";
			
			$.manageAjax.abort('suggestManager');
			$.manageAjax.clear('suggestManager');
			
			$.manageAjax.add('suggestManager', {
				type: 'GET',
		        url: url,
				data : query,
				success: callback,
				dataType: 'json'
			});
		}
		
		
		/* Persons */
		
		api.getPerson = function(id, callback, args) {    
			var url = baseUrl + "/api/persons/" + id;
			$.manageAjax.add('searchManager', {
				type: 'GET',
		        url: url,
				data : args,
				success: callback,
				dataType: 'json'
			});
		}
		
		/* Persons/Correspondents */
		
		api.getPersonCorrespondents = function(id, callback, args) {    
			var url = baseUrl + "/api/persons/" + id + "/correspondents";
			$.ajax({
				type: 'GET',
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