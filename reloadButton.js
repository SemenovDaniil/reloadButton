requirejs.config({
    paths: {
        'dagre': '/extensions/DagreDagGraph/lib/dagre-d3',
        'd3': '/extensions/DagreDagGraph/lib/d3.v5.min'
    }
});

define([
		"jquery",
        "qlik",
        "dagre",
		"d3",
        "css!./styles/qsBootstrap.css",
        "css!./styles/styles.css",
        "css!./styles/bootstrap-icons.css",
        "css!./styles/DagreDagGraph.css"

    ],
    function($, qlik, dagreD3, d3) {
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
                            headerUserParametres: {
                                ref: "headerUserParametres",
                                label: "Name of user parametres in request header",
                                type: "string"
                            },
                            userId: {
                                ref: "userId",
                                label: "User id",
                                type: "string"
                            },
                            taskId: {
                                ref: "taskId",
                                label: "Task id",
                                type: "string"
                            },
                            timeoutRequest: {
                                ref: "timeoutRequest",
                                label: "Dag update frequency (in seconds)",
                                type: "integer",
								defaultValue: 10
                            }
                        }
                    },
                    buttonStyle: {
                        label: "Button style",
                        type: "items",
                        items: {
                            buttonText: {
                                ref: "buttonText",
                                label: "Button text",
                                type: "string",
                                defaultValue: "Reload"
                            },
                            buttonStyle: {
                                type: "string",
                                label: "Button style",
                                component: "dropdown",
                                ref: "style",
                                options: [{
                                        label: "Primary",
                                        value: "btn-primary"
                                    },
                                    {
                                        label: "Secondary",
                                        value: "btn-secondary"
                                    },
                                    {
                                        label: "Success",
                                        value: "btn-success"
                                    },
                                    {
                                        label: "Danger",
                                        value: "btn-danger"
                                    },
                                    {
                                        label: "Warning",
                                        value: "btn-warning"
                                    },
                                    {
                                        label: "Light",
                                        value: "btn-light"
                                    },
                                    {
                                        label: "Dark",
                                        value: "btn-dark"
                                    },

                                    {
                                        label: "Outline primary",
                                        value: "btn-outline-primary"
                                    },
                                    {
                                        label: "Outline secondary",
                                        value: "btn-outline-secondary"
                                    },
                                    {
                                        label: "Outline success",
                                        value: "btn-outline-success"
                                    },
                                    {
                                        label: "Outline danger",
                                        value: "btn-outline-danger"
                                    },
                                    {
                                        label: "Outline warning",
                                        value: "btn-outline-warning"
                                    },
                                    {
                                        label: "Outline info",
                                        value: "btn-outline-info"
                                    },
                                    {
                                        label: "Outline dark",
                                        value: "btn-outline-dark"
                                    }

                                ]
                            }
                        }
                    },
                    addons: {
                        uses: "addons",
                        items: {
                            dataHandling: {
                                uses: "dataHandling"
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
                var dagIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bezier" viewBox="0 0 16 16">'
                dagIcon += '<path fill-rule="evenodd" d="M0 10.5A1.5 1.5 0 0 1 1.5 9h1A1.5 1.5 0 0 1 4 10.5v1A1.5 1.5 0 0 1 2.5 13h-1A1.5 1.5 0 0 1 0 11.5v-1zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zm10.5.5A1.5 1.5 0 0 1 13.5 9h1a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1-1.5 1.5h-1a1.5 1.5 0 0 1-1.5-1.5v-1zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zM6 4.5A1.5 1.5 0 0 1 7.5 3h1A1.5 1.5 0 0 1 10 4.5v1A1.5 1.5 0 0 1 8.5 7h-1A1.5 1.5 0 0 1 6 5.5v-1zM7.5 4a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1z"/>'
                dagIcon += '<path d="M6 4.5H1.866a1 1 0 1 0 0 1h2.668A6.517 6.517 0 0 0 1.814 9H2.5c.123 0 .244.015.358.043a5.517 5.517 0 0 1 3.185-3.185A1.503 1.503 0 0 1 6 5.5v-1zm3.957 1.358A1.5 1.5 0 0 0 10 5.5v-1h4.134a1 1 0 1 1 0 1h-2.668a6.517 6.517 0 0 1 2.72 3.5H13.5c-.123 0-.243.015-.358.043a5.517 5.517 0 0 0-3.185-3.185z"/>'
                dagIcon += '</svg>'



                _$element.html("")
                _$element.append('<div  class="qs_bootstrap"><button type="button" class="btn reload ' + layout.style + '" style="margin-right:10px;min-width:calc(100% - 80px);">' + layout.buttonText + '</button><button type="button" class="btn dag ' + layout.style + '" style="margin-right:10px;width:60px;height:38px;">' + dagIcon + ' DAG info</button></div>')

                $('div[tId="' + tId + '"] .qv-inner-object').css("background-color", "rgba(0,0,0,0")
                $('div[tId="' + tId + '"] article.qv-object-reloadButton').css("border-color", "rgba(0,0,0,0")

                $('#' + currentElementId + ' .qs_bootstrap').css("position", "absolute").css("width", "100%")
                var top = $('#' + currentElementId).height() / 2 - 38 / 2;

                $('#' + currentElementId + ' .qs_bootstrap').css("top", top + "px")

                var url = layout.host + '/' + layout.prefix + '/qrs/task/' + layout.taskId + '/start/synchronous?xrfkey=1234567890ABCDEF'
                var headerUserParametres = layout.headerUserParametres


				var intervalForTasksBlink = new Object()
                function updateStatuses() {

                    chain.forEach((task) => {
                        var endpoint = task.taskType == 'reload' ? 'reloadtask' : 'externalprogramtask'
                        var settings = {
                            "url": layout.host + '/' + layout.prefix + "/qrs/" + endpoint + "/" + task.taskId + "?xrfkey=1234567890ABCDEF",
                            "method": "GET",
                            "timeout": 0,
                            "headers": {
                                "X-Qlik-xrfkey": "1234567890ABCDEF",
                                "Content-Type": "application/json",
                            }
                        };
                        settings['headers'][headerUserParametres] = layout.userId
                        $.ajax(settings).done(function(response) {
							if(task.status != response.operational.lastExecutionResult.status) {
								if(task.status == 2 && response.operational.lastExecutionResult.status !==2){
									clearInterval(intervalForTasksBlink[task.taskId])
								}

								task.status = response.operational.lastExecutionResult.status
								task.lastExecution = response.operational.lastExecutionResult.startTime
								task.duration = response.operational.lastExecutionResult.duration
								var className
                                switch (task.status) {
                                    case 0:
                                        className = "neverStarted" //#e2e2e2
                                        break
                                    case 1:
                                        className = "triggered" //#503f3f
                                        break
                                    case 2:
                                        className = "started" //#a6d75b
                                        break
                                    case 3:
                                        className = "queued" //#22a7f0
                                        break
                                    case 4:
                                        className = "abortInitiated" //#991f17
                                        break
                                    case 5:
                                        className = "aborting" //#991f17
                                        break
                                    case 6:
                                        className = "aborted" //#991f17
                                        break
                                    case 7:
                                        className = "success" //#599e94
                                        break
                                    case 8:
                                        className = "failed" //#991f17
                                        break
                                    case 9:
                                        className = "skipped" //#b3bfd1
                                        break
                                    case 10:
                                        className = "retry" //#48b5c4
                                        break
                                    case 11:
                                        className = "error" //#b04238
                                        break
                                    case 12:
                                        className = "reset" //#0020ff
                                        break
                                    default:
                                        var className = "unknown"
                                        break

                                }
								
								if(className == 'started' && intervalForTasksBlink[task.taskId]==null) {
									function fnBlink() {
										$('#blocked.' + currentElementId+' span[taskid="'+task.taskId+'"]').fadeTo(100, 0.3, function() { $(this).fadeTo(500, 1.0); });
									  }
									  intervalForTasksBlink[task.taskId] = setInterval(fnBlink, 2000);
								}
								
								$('#blocked.' + currentElementId+' span[taskid="'+task.taskId+'"]').parent().parent().parent().parent().parent().parent().attr('class','node '+className)
								$('#blocked.' + currentElementId+' span[taskid="'+task.taskId+'"]').attr('startTime',task.lastExecution).attr('duration',task.duration)
							}
                        });


                    })
                }


                /*show dag*/
                $('#' + currentElementId + ' .qs_bootstrap .btn.dag').on('click', function() {
                    $('body .qvt-sheet-container .qvt-sheet').append('<div id="blocked" class="' + currentElementId + '"></div>')
                    $('#blocked.' + currentElementId).append('<i class="bi bi-x-square-fill float-end"></i>')
                    $('body .qvt-sheet-container .qvt-sheet #blocked.' + currentElementId).append("<div class='live map'><svg><g/></svg></div>")

                    $('#blocked.' + currentElementId + ' .live.map').css('z-index', 103)
                    renderDag('#blocked.' + currentElementId + ' .live.map svg ')

                    var updateTaskStatus = setInterval(() => updateStatuses(), layout.timeoutRequest*1000)

                    $('#blocked.' + currentElementId + ' i.bi.bi-x-square-fill').on('click', function() {
                        $('body .qvt-sheet-container .qvt-sheet #blocked.' + currentElementId).remove()
                        $('#blocked.' + currentElementId + ' i.bi.bi-x-square-fill').off('click');
						clearInterval(updateTaskStatus);
                    })


                })

                /*run rask*/
                $('#' + currentElementId + ' .qs_bootstrap .btn.reload').on('click', function() {
                    var settings = {
                        "url": url,
                        "method": "POST",
                        "timeout": 0,
                        "headers": {
                            "X-Qlik-xrfkey": "1234567890ABCDEF",
                            "Content-Type": "application/json",
                        },
                    };
                    settings['headers'][headerUserParametres] = layout.userId

                    $.ajax(settings).done(function(response) {
                        console.log(response);
                    });
                })

                var chain = []
                function renderDag(selector) {
                    /*----*/
                    var thePromises = []
                    var taskIndex = -1

                    var currentPromiseTask = new Object()
                    const taskChain = (taskId, parentTaskId, deleteIndex, taskType) => {
                        return new Promise((resolve) => {
                            var url = layout.host + '/' + layout.prefix + "/qrs/CompositeEvent/full?filter=compositeRules.reloadTask ne null and compositeRules.reloadTask.id eq {" + taskId + "}&xrfkey=1234567890ABCDEF"
                            var settings = {
                                "url": url,
                                "method": "GET",
                                "timeout": 0,
                                "headers": {
                                    "X-Qlik-xrfkey": "1234567890ABCDEF",
                                    "Content-Type": "application/json"
                                }
                            };
                            settings['headers'][headerUserParametres] = layout.userId

                            $.ajax(settings).done(function(response) {
                                taskIndex++
                                chain[taskIndex] = {
                                    "taskId": taskId,
                                    "parentId": parentTaskId,
                                    "taskType": taskType
                                }

                                delete currentPromiseTask[taskId + '|' + deleteIndex]
                                if (response.length > 0) {
                                    response.forEach(function(triggers) {
                                        reloadTaskiId = triggers.reloadTask == null ? triggers.externalProgramTask.id : triggers.reloadTask.id
                                        taskType = triggers.reloadTask == null ? 'external' : 'reload'
                                        currentPromiseTask[reloadTaskiId + '|' + taskIndex] = 1;
                                        taskChain(reloadTaskiId, taskId, taskIndex, taskType).then(() => {
                                            return resolve()
                                        });
                                    })
                                } else if (Object.keys(currentPromiseTask).length == 0) {
                                    return resolve()
                                }
                            })

                        })
                    }

                    function getTaskName() {
                        return new Promise((resolve) => {
                            var countEnded = 0
                            chain.forEach((task, index) => {
                                var endpoint = task.taskType == 'reload' ? 'reloadtask' : 'externalprogramtask'
                                var settings = {
                                    "url": layout.host + '/' + layout.prefix + "/qrs/" + endpoint + "/" + task.taskId + "?xrfkey=1234567890ABCDEF",
                                    "method": "GET",
                                    "timeout": 0,
                                    "headers": {
                                        "X-Qlik-xrfkey": "1234567890ABCDEF",
                                        "Content-Type": "application/json",
                                    }
                                };
                                settings['headers'][headerUserParametres] = layout.userId
                                $.ajax(settings).done(function(response) {
                                    task['name'] = response.name
                                    task['status'] = response.operational.lastExecutionResult.status
									task['lastExecution'] = response.operational.lastExecutionResult.startTime
									task['duration'] = response.operational.lastExecutionResult.duration
                                    countEnded++
                                    if (countEnded == chain.length) {
                                        return resolve()
                                    }
                                });

                            });

                        })
                    }


                    taskChain(layout.taskId, null, 0, 'reload').then(() => {
                        getTaskName().then(() => {
                            var svg = d3.select(selector)
                            inner = svg.select("g"),
                                zoom = d3.zoom().on("zoom", function() {
                                    inner.attr("transform", d3.event.transform);
                                });
                            svg.call(zoom);

                            var render = new dagreD3.render();
                            // Left-to-right layout
                            var g = new dagreD3.graphlib.Graph({
                                compound: true
                            });
                            g.setGraph({
                                nodesep: 70,
                                ranksep: 50,
                                rankdir: "LR",
                                marginx: 40,
                                marginy: 80
                            });

                            chain.forEach((task) => {
                                var className
                                switch (task.status) {
                                    case 0:
                                        className = "neverStarted" //#e2e2e2
                                        break
                                    case 1:
                                        className = "triggered" //#503f3f
                                        break
                                    case 2:
                                        className = "started" //#a6d75b
                                        break
                                    case 3:
                                        className = "queued" //#22a7f0
                                        break
                                    case 4:
                                        className = "abortInitiated" //#991f17
                                        break
                                    case 5:
                                        className = "aborting" //#991f17
                                        break
                                    case 6:
                                        className = "aborted" //#991f17
                                        break
                                    case 7:
                                        className = "success" //#599e94
                                        break
                                    case 8:
                                        className = "failed" //#991f17
                                        break
                                    case 9:
                                        className = "skipped" //#b3bfd1
                                        break
                                    case 10:
                                        className = "retry" //#48b5c4
                                        break
                                    case 11:
                                        className = "error" //#b04238
                                        break
                                    case 12:
                                        className = "reset" //#0020ff
                                        break
                                    default:
                                        var className = "unknown"
                                        break

                                }

                                var html = "<div>";
                                html += "<span class='status' taskId='" + task.taskId + "' startTime='"+task.lastExecution+"' duration='"+task.duration+"' name='"+task.name+"'></span>";
                                html += "<span class=name >" + task.name + "</span>";
                                html += "</div>";

                                g.setNode(task.taskId, {
                                    labelType: "html",
                                    label: html,
                                    rx: 5,
                                    ry: 5,
                                    padding: 0,
                                    class: className
                                });

                            })

                            chain.forEach((task) => {
                                if (task.parentId !== null && task.taskId !== null) {
                                    g.setEdge(task.parentId, task.taskId, {
                                        label: ""
                                    });
                                }
                            })

							

                            inner.call(render, g);
                            var graphWidth = g.graph().width + 80;
                            var graphHeight = g.graph().height + 40;
                            var width = parseInt(svg.style("width").replace(/px/, ""));
                            var height = parseInt(svg.style("height").replace(/px/, ""));
                            var zoomScale = Math.min(width / graphWidth, height / graphHeight);
                            var translateX = (width / 2) - ((graphWidth * zoomScale) / 2)
                            var translateY = (height / 2) - ((graphHeight * zoomScale) / 2);
                            var svgZoom = svg.transition().duration(500);
                            svgZoom.call(zoom.transform, d3.zoomIdentity.translate(translateX, translateY).scale(zoomScale));

							chain.forEach((task) => {
								if(task.status == 2) {
									function fnBlink() {
										$('#blocked.' + currentElementId+' span[taskid="'+task.taskId+'"]').fadeTo(100, 0.3, function() { $(this).fadeTo(500, 1.0); });//.fadeTo("slow",0).delay(1000).fadeTo("slow",1);
										
									  }
									  fnBlink()
									  intervalForTasksBlink[task.taskId] = setInterval(fnBlink, 2000);
								}
							})

							var tooltip = d3.select("body")
								.append("div")
								.attr('id', 'tooltip_card')
								.style("position", "absolute")
								.style("background-color", "white")
								.style("padding", "5px")
								.style("z-index", "10")
								.style("visibility", "hidden")
								.html("Simple Tooltip...");

								function millisToMinutesAndSeconds(millis) {
									var minutes = Math.floor(millis / 60000);
									var seconds = ((millis % 60000) / 1000).toFixed(0);
									return minutes + " minutes " + (seconds < 10 ? '0' : '') + seconds +' seconds';
								  }
								  
								  function localDate(date){
									var date =  new Date(date)
									var day = date.getDate();
									day = day < 10 ? "0" + day : day;
									var month = date.getMonth() + 1;
									month = month < 10 ? "0" + month : month;
									var year = date.getFullYear();
									var hour = date.getHours()
									hour = hour < 10 ? "0" + hour : hour;
									var minutes = date.getMinutes()
									minutes = minutes < 10 ? "0" + minutes : minutes;
									var seconds = date.getSeconds()
									seconds = seconds < 10 ? "0" + seconds : seconds;

									return day + "." + month + "." + year +' ' + hour +':'+minutes+':'+seconds;
								  }
								  
								inner.selectAll('g.node')
									.attr("data-hovertext", function(v) { 
										return g.node(v).hovertext
									})
									.on("mouseover", function(){return tooltip.style("visibility", "visible");})
									.on("mousemove", function(){ 
										html = '<div class="container">'
										html += '<h3>'+ $(this).attr('class').replace('node','')+'</h3>'
										html += '<p>task name: <b>'+$(this).find('.status').attr('name')+'</b></p>'
										html += '<p>task id: <b>'+$(this).find('.status').attr('taskId')+'</b></p>'
										html += '<p>last execution: <b>'+localDate($(this).find('.status').attr('startTime'))+'</b></p>'
										html += '<p>duration: <b>'+millisToMinutesAndSeconds($(this).find('.status').attr('duration'))+'</b></p>'
										tooltip.html(html)
									
										tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");
									})
									.on("mouseout", function(){return tooltip.style("visibility", "hidden");});
								

                        })



                    });
                }


            }
        };

    });