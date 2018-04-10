var casper = require('casper').create({/*verbose: true,
    logLevel: "debug",*/pageSettings: {userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'}});
var utils = require('utils');
var fs = require('fs');
var data 
var linkData = [];
var salesLinkData = [];
if(fs.exists('./input/links-ol-test.json')){
	data = require('./input/links-ol-test.json');
}else{
	casper.exit();
}
casper.on("remote.message", function(msg){
    this.echo("remote.msg: " + msg);
});

var url = 'https://www.linkedin.com/sales';
casper.start(url, function() {
	console.log("started");
casper.wait(2000, function(){
	this.fill('form.stacked-form', { 
        session_key: '******@gmail.com', 
        session_password:  '******'
   		 }, true);
	this.capture('./scs/login.png');
		casper.wait(3000,function(){
			var counter = 0;
			casper.repeat(data.length, function(){

				
				var row = data[counter];
				var name = row['Full Name'];
				var company = row['Company'];
				var uri = row['link'];
				console.log("uri " + uri);
				// var uri = 'https://www.linkedin.com/sales/search?keywords='+name+' '+company;
				//  var url = encodeURI(uri);
				casper.thenOpen(uri, function() {
					
						console.log(uri);
						casper.wait(2000, function(){
							console.log("in eval");
							//this.capture('./scs/search.png');
							//console.log("Performed screen capture to search.png");
							var salesnavlink = this.evaluate(function() {
								// console.log("Enter evaluate function");
							var snavlink;
							var slink = document.querySelector('.pv-s-profile-actions--view-profile-in-sales-navigator');
							console.log("sales navigation link:	 " + slink);
							if(slink != null){
								snavlink = slink.href;
							}else{
								snavlink = slink;
							}
							return snavlink;
							});
							if(salesnavlink!=null){
								var status="not found";
							casper.thenOpen(salesnavlink, function() {
					
							console.log("Opening Sales Navigator-----------------------");

							this.waitForSelector('.openlink-badge',
							function pass () {
								status = "found";
								console.log("Contact has OpenLink Badge ");
								var salesData = {
									'salesLink':salesnavlink,
									'status':status,
								};
		   
								salesLinkData.push(salesData);
		   
		   
							
							},
							function fail () {
								status = "not found";

								console.log("No OpenLink Badge");
								var salesData = {
									'salesLink':salesnavlink,
									'status':status,
								};
		   
								salesLinkData.push(salesData);
		   
		   
							},
							5000 // timeout limit in milliseconds
						);
						
					 

						
							// casper.wait(2000, function(){

							// 	try{
							// 		//casper.capture('./scs/opened.png');

							// 		var openLink = casper.evaluate(function(){
							// 			var openLink = document.querySelector('.openlink-badge');
							// 			console.log("oLink :"+openLink);
							// 			return openLink;
							// 		});
							// 		if (openLink === null) {

    						// 			console.log("Yes!!");
							// 			} else {
    						// 			 console.log("Nooo!!");
							// 			}
							// 		// var target = document.querySelector('.search-results-container .content-wrapper a');
							// 		// if(target == null){
							// 		// 	console.log("Miss"+target);
							// 		// 	link = {
							// 		// 	'link' : null,
							// 		// 	};
							// 		// }else{
							// 		// 	console.log("Hit"+target.href);
							// 		// 	console.log("Hit"+ " " +target.href);
							// 		// 	link = {
							// 		// 	'link' : target.href,
							// 		// 	};
							// 		// }
									
									
								
							// 	}catch(e){
							// 		console.log("Error"+e);
							// 	}
							// 	// return link;
							    

							// });
							//console.log("link..."+linkObj);
							// linkData.push(linkObj);

						});
						
					}

				
						
			        	
			   
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
	 fs.write('./links-ol-test-res.json',JSON.stringify(salesLinkData,null,'\t'));
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







---------------------------



var casper = require('casper').create({
	/*verbose: true,
	logLevel: "debug", */pageSettings: { userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36' }
});
var utils = require('utils');
var fs = require('fs');
var data
var linkData = [];
var salesLinkData = [];
if (fs.exists('./input/links-ol-test.json')) {
	data = require('./input/links-ol-test.json');
} else {
	casper.exit();
}
casper.on("remote.message", function (msg) {
	this.echo("remote.msg: " + msg);
});



var url = 'https://www.linkedin.com/sales';
casper.start(url, function () {
	console.log("started");
	casper.wait(1000, function () {
		this.fill('form.stacked-form', {
			session_key: 'muneernawab@gmail.com',
			session_password: 'munlink420'
		}, true);
		// this.capture('./scs/login.png');
		casper.wait(1000, function () {
			var counter = 0;
			casper.repeat(data.length, function () {


				var row = data[counter]
				var uri = row['link'];
				console.log("Opening the link...... ");
				// var uri = 'https://www.linkedin.com/sales/search?keywords='+name+' '+company;
				//  var url = encodeURI(uri);
				casper.thenOpen(uri, function () {			
					console.log(uri);
					casper.wait(5000, function () {

						this.capture('./scs/ol.png');
						//document.write();
						// var button = casper.evaluate(function(){
						// 	document.click(".select-spotlight .TR");

						var name = casper.evaluate(function(){
							var name = document.querySelector(".name-link");
							return name;
						});
							
						var position = casper.evaluate(function(){
							var position = document.querySelector(".info-value");
							return position;
						});
						
						var company = casper.evaluate(function(){
							var company = document.querySelector(".company-name");
							return company;
						});
						
						var degreeOfConnection = casper.evaluate(function(){
							var degreeOfConnection = document.querySelector(".degree-icon");
							return degreeOfConnection;
						});

						var region = casper.evaluate(function(){
							var region = document.querySelector(".info p:nth-child(3)");
							return region;
						});
							
						var salesNavLink = casper.evaluate(function(){
							var salesNavLink = document.querySelector(".profile-link");
							return salesNavLink;
						});
							
						var openLink = casper.evaluate(function(){
							var openLink = document.querySelector(".details-container .badges ");
							return openLink;
						});
						console.log("openLink check----------"+openLink.textContent);
						if(openLink.textContent.trim()  == "Open link")
						{
							openLinkBadge = "Yes";
							console.log("has open link");
						}
						else{
							openLinkBadge = "No";
							console.log("has no open link");
						}
						// var openLinkBadge = casper.evaluate(function(){
						// 	var openLinkBadge = document.querySelector(".openlink-badge");
						// 	return openLinkBadge;
						// });


						// var position = document.querySelector(".info-value");
							// var company = document.querySelector(".company-name");
							// var region = document.querySelector(".info p:nth-child(3)");
							// var salesNavLink = document.querySelector(".profile-link");
							// var olBadge = document.querySelector(".openlink-badge");
							

						// 	casper.waitForSelector('.details-container .badges',
						// 	function pass() {
								
						// 		console.log("Contact has  Badge ");

						// 	},
						// 	function fail() {
						// 		//openLinkBadge = "No";
						// 		console.log("No OpenLink Badge");


						// 	},
						// 	3000 // timeout limit in milliseconds

						// );

						var salesData = {
							'name': name.textContent,
							'position': position.textContent,
							'company': company.textContent,
							'degreeOfConnection': degreeOfConnection.textContent,
							'region': region.textContent,
							'salesLink': salesNavLink.href,
							'openlink': openLinkBadge,
						};

						salesLinkData.push(salesData);

							
							// });

							 
							
					
									
						

			
						


					});

				});
				counter += 1;
			});

		});

	});

});




casper.run(function () {
	fs.write('./links-ol-test-res.json', JSON.stringify(salesLinkData, null, '\t'));
	casper.exit();
});








