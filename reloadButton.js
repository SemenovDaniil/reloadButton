define([
	"qlik",
	"css!./styles/qsBootstrap.css",
	"css!./styles/styles.css",
	"css!./styles/bootstrap-icons.css"

],
function(qlik) {
	return {
		definition: {
			type: "items",
			component: "accordion",
			items: {
				requestConfiguration: {
					label: "Request configuration",
					type: "items",
					items: {
						host: {
							ref: "host",
							label: "Server host",
							type: "string"
						},
						prefix: {
							ref: "prefix",
							label: "Virtual proxy (header) prefix",
							type: "string"
						},
						headerUserParametres:{
							ref:"headerUserParametres",
							label: "Name of user parametres in request header",
							type:"string"
						},
						userId: {
							ref:"userId",
							label:"User id",
							type:"string"
						},
						taskId: {
							ref: "taskId",
							label:"Task id",
							type:"string"
						}
					}
				},
				buttonStyle: {
					label:"Button style",
					type: "items",
					items:{
						buttonText: {
							ref:"buttonText",
							label:"Button text",
							type:"string",
							defaultValue:"Reload"
						},
						buttonStyle:{
							type:"string",
							label:"Button style",
							component:"dropdown",
							ref:"style",
							options: [
								{
									label:"Primary",
									value:"btn-primary"
								},
								{
									label: "Secondary",
									value:"btn-secondary"
								},
								{
									label: "Success",
									value:"btn-success"
								},
								{
									label: "Danger",
									value:"btn-danger"
								},
								{
									label: "Warning",
									value:"btn-warning"
								},
								{
									label: "Light",
									value:"btn-light"
								},
								{
									label: "Dark",
									value:"btn-dark"
								},

								{
									label:"Outline primary",
									value:"btn-outline-primary"
								},
								{
									label: "Outline secondary",
									value:"btn-outline-secondary"
								},
								{
									label: "Outline success",
									value:"btn-outline-success"
								},
								{
									label: "Outline danger",
									value:"btn-outline-danger"
								},
								{
									label: "Outline warning",
									value:"btn-outline-warning"
								},
								{
									label: "Outline info",
									value:"btn-outline-info"
								},
								{
									label: "Outline dark",
									value:"btn-outline-dark"
								}

							]
						}
					}
				},
				appearance: {
					uses: "settings"
				}
			}
		},
		support: {
			snapshot: false,
			export: false,
			exportData: false
		},
		paint: function($element, layout) {
			const currentElementId = $element[0].parentNode.attributes.id.nodeValue
			const tId = currentElementId.replace('_content', '')
			var _$element = $element
			_$element.html("")
			console.log(layout.style)
			_$element.append('<div  class="qs_bootstrap"><button type="button" class="btn '+layout.style+'" style="margin-right:10px;min-width:100%">'+layout.buttonText+'</button></div>')
			
			$('div[tId="'+tId+'"] .qv-inner-object').css("background-color","rgba(0,0,0,0")
			$('div[tId="'+tId+'"] article.qv-object-reloadButton').css("border-color","rgba(0,0,0,0")
			
			$('#'+currentElementId+' .qs_bootstrap').css("position","absolute").css("width","100%")
			var top = $('#'+currentElementId).height()/2 - 38/2;
			console.log( $('#'+currentElementId).height())
			console.log( $('#'+currentElementId+' .qs_bootstrap .btn').height())
			$('#'+currentElementId+' .qs_bootstrap').css("top",top+"px")

			var url = layout.host+'/'+layout.prefix+'/qrs/task/' + layout.taskId + '/start/synchronous?xrfkey=1234567890ABCDEF'
			var headerUserParametres = layout.headerUserParametres
			console.log(url)
			$('#'+currentElementId+' .qs_bootstrap .btn').on('click',function(){
				console.log('test')
				var settings = {
					"url": url,
					"method": "POST",
					"timeout": 0,
					"headers": {
					  "X-Qlik-xrfkey": "1234567890ABCDEF",
					  "Content-Type": "application/json",
					},
				  };
				  settings['headers'][headerUserParametres] =layout.userId
				  console.log(settings)
				  
				  $.ajax(settings).done(function (response) {
					console.log(response);
				  });
			})
		}
	};

});