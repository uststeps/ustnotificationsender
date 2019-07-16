var app = {
    initialize: function() {
        this.bindEvents();

		//Close Instead of history back
		document.addEventListener("backbutton", function(e){
			//alert("TEST");
			navigator.app.exitApp();
		}, true);

    },
	
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
	

	onDeviceReady: function() {
	
    },

	onDevicePreDisplay: function() {
		
	},

	gotoPage: function(page){

		
	},
	
	onLogin: function() {
		window.location = "Send.html"; 
	},
	
	onLoad: function() {
		
	}
	
 
	
};
