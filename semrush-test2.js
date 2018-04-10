    var inputFileName = "./input/MLIC-test-temp-copy.json";
    var outputFileName = "./output/1st-deg-con-output-7feb.json";


    var casper = require('casper').create({/*verbose: true,
        logLevel: "debug",*/pageSettings: {userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'}});
    var utils = require('utils');
    var fs = require('fs');
    var data ;
    var linkData = [];


    console.log("Initializing...");


    if(fs.exists(inputFileName)){
    	data = require(inputFileName);
    }else{
    	casper.exit();
    }
    casper.on("remote.message", function(msg){
        this.echo("remote.msg: " + msg);
    });

    var url = 'https://www.semrush.com/';
    casper.start(url, function() {
        console.log("Opening Semrush.com.............")

    		casper.wait(100,function(){
    			var counter = 0;
    			casper.repeat(data.length, function(){

    				
    				var row = data[counter];
                    var domain = row['domain'];
                    var index = counter;                
    				var uri = 'https://www.semrush.com/info/'+domain;
                    var url = encodeURI(uri);
                    console.log(domain);
                if (domain === "not found") {
                linkObj = {
                    'index' : index,
                    'domain' : null,
                    'org_cost' : null,
                    'sem_cost': null
                    };
                linkData.push(linkObj);    

                } else{

               
                    casper.thenOpen(url, function() {
                        
    	               try{
                            var linkObj = casper.evaluate(function () {
                           console.log(" SCRAPING DATA !! /\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/")
                            var nodesArray = Array.prototype.slice.call(document.querySelector('.sem-report-block-row.sem-report-block-row-top-summary'));
                  
                            return Array.prototype.map.call(nodesArray, function(node) {
                                var company = document.querySelector('link:nth-child(1)').href.split('/').pop();
                                var org_cost = document.querySelector('#organicSummary tr:nth-child(3) td:nth-child(2) a');
                                var sem_cost = document.querySelector('#adwordsSummary tr:nth-child(2) td:nth-child(2)'); 
                                info = {
                                        'index' : indexNum,                                        
                                        'domain' : company, 
                                        'org_cost' : org_cost.innerText,
                                        'sem_cost': sem_cost.innerText,
                                };
                                return info;
                            });
                        });
    									
    									
        								
        				} catch(e) {
        		      		console.log("Error"+e);
    					}

                        // return link;
        							    

    							// },{indexNum: index, domain: domain});
    					linkData.push(linkObj);

    						// });
    						
    						

    					});
    						
                    }    
                    
    			    counter += 1;
    			});
    		   			
    		});
     	
    	// }); //closing of intial url func
    	
    });


    casper.run(function(){
    	fs.write(outputFileName,JSON.stringify(linkData,null,'\t'));
    	casper.exit();
    });








