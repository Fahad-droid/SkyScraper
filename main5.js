var casper = require('casper').create({pageSettings: {userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'}});
var utils = require('utils');
var fs = require('fs');
var data ;
var companyData = [];
if(fs.exists('./input/data2.json')){
	data = require('./input/data2.json');
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
				// var name = row['Full Name'];
				var company = row['Company'];
				var url = 'https://www.linkedin.com/search/results/companies/?keywords='+company;
				
				casper.thenOpen(url, function() {
					
						console.log(url);
						casper.wait(3000, function(){
							var result = this.evaluate(function() {
							var result;
								try{
                                   // var target = document.querySelector('.search-result__image-wrapper a');
                                    var target = document.querySelector('.search-result__wrapper div:nth-child(2) p:nth-child(3)');
                                    
                                    console.log(target);
									if(target == null){
                                        result = null;
                                       
									
									}else{
                                        console.log("Hit"+target.innerText);
                                        result = target.innerText;
                                 
									
                                    }
                                    
								
								}catch(e){
									console.log("Error"+e);
								}
								return result;
							    

                            });
                            var obj = {
                            "company" : company,
                            "employeeCount" : result,
                            };
                            

                            companyData.push(obj);
                            

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
	fs.write('./link-1stcon-empcount.json',JSON.stringify(companyData,null,'\t'));
	casper.exit();
});

// var counter = 0;s
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







