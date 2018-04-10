var casper = require('casper').create({pageSettings: {userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'}});
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
				var url = 'https://www.linkedin.com/search/results/index/?keywords='+name+' '+company;
				
				casper.thenOpen(url, function() {
					
						console.log(url);
						casper.wait(2000, function(){
							var target = this.evaluate(function() {
                                var target;
								try{
                                    target = document.querySelector('.search-result__wrapper a').href;
                                    console.log("target "+target);
                                }catch(e){
									console.log("Error"+e);
								}
								return target;
                            });
                            console.log("outside "+target);
                            if(target == null){
                                console.log("No Contact found");
                            }else{
                                //target.click();

                                casper.thenOpen(target,function(){
                                    console.log("s1");
                                    casper.wait(2000, function(){
                                        console.log("s2"+this.getCurrentUrl());
                                            var companyLogo = casper.evaluate(function(){
                                                var compLink = document.querySelector('.background-details .experience-section a').href;
                                                console.log("company ------- "+compLink);
                                                return compLink;
                                            });
                                            if (companyLogo != null) {
                                               casper.thenOpen(companyLogo,function(){
                                                   casper.evaluate(function(){
                                                     var employeeCount = document.querySelector('.org-company-employees-snackbar see-all-employees-link a').innerHTML;
                                                     console.log("xxxxxx"+employeeCount);
                                                   });
                                                    
                                               });
                                            }
                                        
                                        });
                                        
        
                                       
                                });
                               

                                // this.wait(2000, function(){
                                // document.querySelector('.background-details .experience-section a').click();
                                // });
                                // if (companyLogo != null) {
                                    // companyLogo.click();
                               
                                // }

                                // var employeeCount = document.querySelector('.org-company-employees-snackbar see-all-employees-link a');
                                // console.log(employeeCount);
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







