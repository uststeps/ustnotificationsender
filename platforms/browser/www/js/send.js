
var slideout;
var app = {
    initialize: function() {
        this.bindEvents();
		app.initTopbar();
		app.initDrawer();
		
		
	
    },
	
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
	
	onDeviceReady: function() {
        app.receivedEvent('deviceready');
		var config = {
                apiKey: "AIzaSyCS6uR5RRrJKi2V1VFZLp9iMC_Jwbf8vgc ",
                authDomain: "myuste-studentportal.firebaseapp.com",
                databaseURL: "https://myuste-studentportal.firebaseio.com",
                storageBucket: "myuste-studentportal.appspot.com",
                messagingSenderId: "520123709331"
              };
             
		firebase.initializeApp(config);	
		
		app.onLoad();
		
		
    },
	
    receivedEvent: function(id) {
       
    },
	
	
	initDrawer: function() {
		$('#menu').load('nav.html #navigation', function() {
			//$("#nav_nameHolder").html(localStorage.getItem("lastName") + ", " + localStorage.getItem("firstName"));
			//$("#nav_idHolder").html(localStorage.getItem("studentID"));
		});
				

	   slideout = new Slideout({
        'panel': document.getElementById('panel'),
        'menu': document.getElementById('menu'),
        'padding': 256,
        'tolerance': 70
       });

     
	   
	   	localStorage.setItem("menuOpened", "false");
	
	},
	
	initTopbar: function() {

		$('#topbarHolder').load('topbar.html #topbardiv', function() {
			 document.querySelector('.toggle-button').addEventListener('click', function() {
				slideout.toggle();
			});
			
		});
	},
	
	toggleSubs: function(list) {
		$("#sub" + list).toggle();
	},
	
	toggleSubs: function(list) {
		$("#sub" + list).toggle();
	},
	
	
	
	
	gotoPage: function(page) {
		if (page=="index.html") {
			window.location.replace(page);
		}else{
			window.location = page;
		};
	},


	onLoad: function(){
	

	
	},
	
	sendPush: function() {
		
		
		var bodyTxt = $("#txtBody").val();
		var titleTxt = $("#txtTitle").val();
		var toTxt ="";
		
		
        if ($("#chkAll").prop('checked')) {
            toTxt = toTxt + "all,";
        }
        if ($("#chkStudent").prop('checked')) {
            toTxt = toTxt + "student,";
        }

        toTxt = toTxt.substring(0, toTxt.length - 1);
		
        toTxt = "andTeststudent";
        
        alert("TOPICS: " + toTxt);

        if (toTxt == "" || toTxt == null) {
            alert("Recipient cannot be empty.");	
        } else if (titleTxt == "" || titleTxt == null) {
            alert("Title cannot be empty.");
        } else if (bodyTxt == "" || bodyTxt == null) {
            alert("Message body cannot be empty.");
        } else {
			
			  var d = new Date();
    
			 var month = d.getMonth()+1;
			 var day = d.getDate();
				
			var output = d.getFullYear() + '/' +  (month < 10 ? '0' : '') + month + '/' + (day<10 ? '0' : '') + day;
		 
		
		
			$.ajax(
			{	type: "POST",
				url: "https://fcm.googleapis.com/fcm/send",
				headers: { Authorization: "key=AAAAeRnJ95M:APA91bHpZ6CZfV2RchWaGeD9SkSlQdIOM6wrXxUJHQl_ilNQB4KBWrfh3EbOYvOn7ACnmYrziB_JeWRxrk4bXEgafsKIUgmn-cBV9yfHuZitx3x0jDRtMW-qy3xSVA2XOiTTb-c3YlMj" } ,
				contentType: 'application/json',
				data: JSON.stringify( 
										{
										   "to" :  "/topics/" + toTxt,
										   "data":
										   {
											   "title" : titleTxt,
											   "message" : bodyTxt,
												"receivedDate" : output
											   
										   }
										} 
									),
				success: function(data) {
					 var statusC = "";
                    
                                   if (data.message_id != null) {
                                    $("#Prompt").html("Notification Sent! with ID " + data.message_id);
                                        statusC = "sent";
                                   } else {
                                    $("#Prompt").html("Notification Sending Failed");
                                        statusC = "failed";
                                   };
                                   
                                   $("#historyTable").append(
                                    "<tr class=\"globalTableRow\">" + "<td>" + toTxt + "</td>" +
                                    "<td>" + bodyTxt + "</td>" + "<td>" + statusC + "</td>" +
                                    "</tr>"
                                   );
                                   
                                $("#txtBody").val("");
                                $("#txtTitle").val("");
								
								alert("Notification Sent");
				} ,
				error: function(xhr, statusText, errorCode) {
					alert(JSON.stringify(xhr));
				}
			
			}
			);
		};
	
	}
	
	
};
