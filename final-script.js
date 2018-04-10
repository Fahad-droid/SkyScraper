var casper = require('casper').create({/*verbose: true,
    logLevel: "debug",*/pageSettings: {userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'}});
var utils = require('utils');
var fs = require('fs');
var data 
var linkData = [];
var salesLinkData = [];
if(fs.exists('./link-test.json')){
	data = require('./link-test.json');
}else{
	casper.exit();
}
casper.on("remote.message", function(msg){
    this.echo("remote.msg: " + msg);
});

var home = 'https://www.linkedin.com/';
casper.start(home, function() {
	console.log("started");
casper.wait(2000, function(){
	this.fill('form.login-form', { 
        session_key: '******@gmail.com', 
        session_password:  '******'
   		 }, true);
	// this.capture('./scs/login.png');
		casper.wait(3000,function(){
			var counter = 0;
			casper.repeat(data.length, function(){

				
				var row = data[counter];
				// var name = row['Full Name'];
				// var company = row['Company'];
				var url = row['link'];
				console.log("********************** Opening Linkedin URL " + url + "**********************");
				// var uri = 'https://www.linkedin.com/sales/search?keywords='+name+' '+company;
				//  var url = encodeURI(uri);
				casper.thenOpen(url, function() {

                    casper.wait(2000, function(){
                        var linkObj = this.evaluate(function() {
                        console/log("********************** On Contact Profile **********************");   
                        var link;
                        // var page = document;
                        // console.log(page);
                            try{
                                var contactName = document.querySelector('.pv-top-card-section__name');
                                var contactJobTitle = document.querySelector('.pv-top-card-section__headline');
                                var contactCompany = document.querySelector('.pv-top-card-section__company');
                                var contactLocation = document.querySelector('.pv-top-card-section__location');
                                var companyURL = document.querySelector('.background-details .experience-section a');
                                var salesNavURL = document.querySelector('.pv-s-profile-actions--view-profile-in-sales-navigator');

                                if(url == null){
                                    console.log("Invalid URL"+contactName);
                                    link = {
                                    'link' : null,
                                    };
                                }else{
                                    console.log("Scraping Contact Details for:"+ " " +contactName.innerHTML);
                                    link = {
                                    'link' : contactName.innerHTML,
                                    'Company' : contactCompany.innerHTML,
                                    'Title' : contactJobTitle.innerHTML,
                                    'Location' : contactLocation.innerHTML,
                                    'Company URL' : companyURL.href,
                                    'Sales Navigator URL' : salesNavURL.href,
        
                                    };
                                    console.log(link);
                                }
                                
                                
                            
                            }catch(e){
                                console.log("Error"+e);
                            }
                            return link;
                            

                        });
                        //console.log("link..."+linkObj);
                        linkData.push(linkObj);

                    });
					// **********************Sales Nav Code***************************
			// 			casper.wait(2000, function(){
						
			// 				var salesnavlink = this.evaluate(function() {
            //                 console.log("********************** Inside evaluate function **********************");

			// 				var snavlink;
			// 				var slink = document.querySelector('.pv-s-profile-actions--view-profile-in-sales-navigator');
			// 				if(slink != null){
			// 					snavlink = slink.href;
			// 				}else{
			// 					snavlink = slink;
			// 				}
			// 				return snavlink;
			// 				});
			// 				if(salesnavlink!=null){
			// 					var status="not found";
			// 				casper.thenOpen(salesnavlink, function() {
					
			// 				console.log("Opening Sales Navigator-----------------------");

			// 				this.waitForSelector('.openlink-badge',
			// 				function pass () {
			// 					status = "found";
			// 					console.log("Contact has OpenLink Badge ");
			// 					var salesData = {
			// 						'salesLink':salesnavlink,
			// 						'status':status,
			// 					};
		   
			// 					salesLinkData.push(salesData);
		   
		   
							
			// 				},
			// 				function fail () {
			// 					status = "not found";

			// 					console.log("No OpenLink Badge");
			// 					var salesData = {
			// 						'salesLink':salesnavlink,
			// 						'status':status,
			// 					};
		   
			// 					salesLinkData.push(salesData);
		   
		   
			// 				},
			// 				5000 // timeout limit in milliseconds
			// 			);
						
					 

						
			// 				// casper.wait(2000, function(){

			// 				// 	try{
			// 				// 		//casper.capture('./scs/opened.png');

			// 				// 		var openLink = casper.evaluate(function(){
			// 				// 			var openLink = document.querySelector('.openlink-badge');
			// 				// 			console.log("oLink :"+openLink);
			// 				// 			return openLink;
			// 				// 		});
			// 				// 		if (openLink === null) {

    		// 				// 			console.log("Yes!!");
			// 				// 			} else {
    		// 				// 			 console.log("Nooo!!");
			// 				// 			}
			// 				// 		// var target = document.querySelector('.search-results-container .content-wrapper a');
			// 				// 		// if(target == null){
			// 				// 		// 	console.log("Miss"+target);
			// 				// 		// 	link = {
			// 				// 		// 	'link' : null,
			// 				// 		// 	};
			// 				// 		// }else{
			// 				// 		// 	console.log("Hit"+target.href);
			// 				// 		// 	console.log("Hit"+ " " +target.href);
			// 				// 		// 	link = {
			// 				// 		// 	'link' : target.href,
			// 				// 		// 	};
			// 				// 		// }
									
									
								
			// 				// 	}catch(e){
			// 				// 		console.log("Error"+e);
			// 				// 	}
			// 				// 	// return link;
							    

			// 				// });
			// 				//console.log("link..."+linkObj);
			// 				// linkData.push(linkObj);

			// 			});
						
			// 		}

				
						
			        	
			   
			// });
					// **********************Sales Nav Code***************************
		
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
	 fs.write('./link-test-final.json',JSON.stringify(linkData,null,'\t'));
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







