var casper = require('casper').create({pageSettings: {userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'}});

var data;
var fs = require('fs');
if(fs.exists('./link-test.json')){
	console.log("file opened");
	data = require('./link-test.json');
}else{
	casper.exit();
}
casper.on("remote.message", function(msg){
    this.echo("remote.msg: " + msg);
});

var url = 'https://www.linkedin.com/';
casper.start(url, function() {
console.log("start");
casper.wait(2000, function(){
	this.fill('form.login-form', { 
        session_key: '******@gmail.com', 
        session_password:  '******'
   		 }, true);
		casper.wait(3000,function(){
			var counter = 0;
			//console.log("entered");
			casper.repeat(data.length, function(){
				console.log("reading data");
				var row = data[counter];
				var link = row['link'];

				
				casper.thenOpen(link, function() {
					
						console.log(link);
						casper.wait(2000, function(){

							//casper.capture('gfgfgd.png');
							var result = this.evaluate(function() {
								var result;
								var connect_button;
								var send_in_mail;
								var note;
								try{
									connect_button = document.querySelector('.pv-s-profile-actions--connect');
									if(connect_button != null){
										connect_button.click();
										console.log('Connect clicked');
										note = document.querySelector('.send-invite__actions .button-secondary-large').click();
										document.getElementById('custom-message').value="Hi, Please add me to your network. Thanks.";
										if(document.getElementById('custom-message').value !=null){
											result = 'Note added';
											document.querySelector('.ml3').click();
											console.log("Connected with contact");
										}else{
											result = "Note not added"
										}
										console.log("result "+result);
									}else{
										console.log('Connect not clicked');
									}
									
								
								}catch(e){
									console.log("Error"+e);
								}
								return result;
							    

							});

						});
						
						

					});
						
			        	
			    counter += 1;
			});
		   			
		});
 	
	});
	
});
	


// var counter = 0;
// casper.repeat(data.length, function(){
	
// 	var link = data[counter];
// 	casper.open(link,function(){
// 		casper.wait(2000,function(){
// 			casper.evaluate(function(){
// 				var connect_button = document.querySelector('.pv-s-profile-actions--connect').click();
// 				var note = connect_button.querySelector('.send-invite__actions .button-secondary-large').click();
// 				document.getElementById('custom-message').value="Hi, Please add me to your network. Thanks.";

// 			});
// 		});
// 	});
// 	counter +=1;
// 	console.log('counter'+counter);
// });

casper.run(function(){
	casper.exit();
});