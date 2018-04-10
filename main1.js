var casper = require('casper').create({verbose: true,
    logLevel: "debug",pageSettings: {userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'}});
var utils = require('utils');
var fs = require('fs');
var data ;
var linkData = [];
if(fs.exists('./dmcres2.json')){
	data = require('./dmcres2.json');
}else{
	casper.exit();
}
casper.on("remote.message", function(msg){
    this.echo("remote.msg: " + msg);
});

var url = 'https://www.linkedin.com/';
casper.start(url, function() {

casper.wait(2000, function(){
	this.fill('form.login-form', { 
        session_key: '******@gmail.com', 
        session_password:  '******'
   		 }, true);
		casper.wait(3000,function(){
			var counter = 0;
			casper.repeat(data.length, function(){

				
				var row = data[counter];
				var name = row['Full Name'];
				var company = row['Company'];
				var uri = 'https://www.linkedin.com/search/results/index/?keywords='+name+' '+company;
				var url = encodeURI(uri);
				casper.thenOpen(url, function() {
					
						console.log(url);
						casper.wait(2000, function(){
							var linkObj = this.evaluate(function() {
							var link;
							// var page = document;
							// console.log(page);
								try{
									var target = document.querySelector('.search-result__wrapper a');
									if(target == null){
										console.log("Miss"+target);
										link = {
										'link' : null,
										};
									}else{
										console.log("Hit"+target.href);
										console.log("Hit"+ " " +target.href);
										link = {
										'link' : target.href,
										};
									}
									
									
								
								}catch(e){
									console.log("Error"+e);
								}
								return link;
							    

							});
							//console.log("link..."+linkObj);
							linkData.push(linkObj);

						});
						
						

					});
						
			        	
			    counter += 1;
			});
		   			
		});
 	
	});
	
});


//  casper.thenEvaluate(function(){
// 	casper.wait(2000, function(){
// 		casper.capture('record.png');
// 	});
//    console.log("Page Title " + document.title);
//    console.log("Your name is " + document.location ); 
// });


casper.run(function(){
	fs.write('./links32.json',JSON.stringify(linkData,null,'\t'));
	casper.exit();
});

// var counter = 0;
// casper.repeat(data.length, function(){

	
// 	var row = data[counter];
// 	var name = row['Full Name'];
// 	var company = row['Company'];
// 	var url = 'https://www.linkedin.com/search/results/index/?keywords='+name+company;
	
// 	casper.thenOpen(url, function() {
// 		casper.wait(3000, function(){
// 			console.log(url);
// 			this.capture("screen"+counter+".png");
// 		});
        
//     });
	
	
	
	
// 	counter +=1;
	
// });


// casper.run(function(){
// 	casper.exit();
// });







