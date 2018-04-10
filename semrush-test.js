var d = new Date();
var h = d.getHours();
var m = d.getMinutes();
var inputFileName = "./input/MLIC-test-temp-copy.json";
var outputFileName = "./output/em-1st-deg-con-res.json";


var casper = require('casper').create({/*verbose: true,
    logLevel: "debug",*/pageSettings: {userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'}});
var utils = require('utils');
var fs = require('fs');
var data ;
var linkData = [];


console.log("Initializing...");


function testFun () {
    console.log("Test Fun");
};

/* Usage:
    unformatNum ( "$2.5K", "$")
    unformatNum ( "2.5K", "")    
*/
function unformatNumHelp( inputStr, prefix  ) {
    if (inputStr.slice(0,1).toLowerCase() == "$")
        var str = inputStr.slice(1);
    else
        var str = inputStr;
    if (str.slice(-1).toLowerCase() == "k")
      return ( prefix + str.slice (0,-1) * 1000 );
    else if (str.slice(-1).toLowerCase() == "m")
      return ( prefix + str.slice (0,-1) * 1000 * 1000 );
    else if (str.slice(-1).toLowerCase() == "b")
      return ( prefix + str.slice (0,-1) * 1000 * 1000 * 1000 );      
    else
      return ( prefix + str * 1);    
}

//Helper Functions & consts
// Unformats strings. usage: string.myNumUnformat("") or string.myNumUnformat("$") to keep as currency.  
String.prototype = function (prefix) {
  var inputStr = this.toLowerCase().valueOf().trim() ;
  return unformatNumHelp( inputStr, prefix  );
};

// var testNum = "2.5k";
// //var testNumUnformat = unformatNumHelp(  testNum, "" );
// var testNumUnformat = testNum.myNumUnformat("");
// console.log( testNumUnformat );








// casper.exit();


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

// casper.wait(2000, function(){
// 	this.fill('form.login-form', { 
//         session_key: '******@gmail.com', 
//         session_password:  '******'
//    		 }, true);
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

        }       
        else{

           
        casper.thenOpen(url, function() {
                    
						console.log(url);
						casper.wait(2000, function(){
                            // var domain = row['Website'];
							var linkObj = this.evaluate(function(indexNum, domain) {
                            var link;
                            

                            
							// var page = document;
							// console.log(page);
								try{
                                    //org
                                    // var multipliers = {k: 1000, m: 1000000, b: 10000000};                                    
                                    var target = document.querySelector('.sem-report-block-row.sem-report-block-row-top-summary');
                                    var company = document.querySelector('link:nth-child(1)').href.split('/').pop();                                    
                                    // var org_num = document.querySelector('#organicSummary .s-report__counter').innerText;
                                    // var org_num2 = org_num.myNumUnformat();
                                    // var org_num_conv = parseFloat(org_num)*multipliers[org_num.charAt(org_num.length-1).toLowerCase()];
                                    // var org_rank = document.querySelector('#organicSummary tr:nth-child(1) td:nth-child(2)').innerText;        
                                    // var org_kw = document.querySelector('#organicSummary tr:nth-child(2) td:nth-child(2)').innerText;                                                                        
                                    var org_cost = document.querySelector('#organicSummary tr:nth-child(3) td:nth-child(2) a');
                                    
                                    //sem
                                    // var sem_num = document.querySelector('#adwordsSummary .s-report__counter').innerText;
                                    // var sem_kw = document.querySelector('#adwordsSummary tr:nth-child(1) td:nth-child(2)').innerText;        
                                    var sem_cost = document.querySelector('#adwordsSummary tr:nth-child(2) td:nth-child(2)');  
                                    
                                    //blink
                                    // var blinks_num = document.querySelector('#backlinksSummary .s-report__counter').innerText;
                                    // var blinks_domains = document.querySelector('#backlinksSummary tr:nth-child(1) td:nth-child(2)').innerText;        
                                    // var blinks_ips = document.querySelector('#backlinksSummary tr:nth-child(2) td:nth-child(2)').innerText;
                                    
                                    //ad
                                    // var ad_num = document.querySelector('#adsenseSummary .s-report__counter').innerText;
                                    // var ad_publishers = document.querySelector('#adsenseSummary tr:nth-child(1) td:nth-child(2)').innerText;        
                                    // var ad_advertisers = document.querySelector('#adsenseSummary tr:nth-child(2) td:nth-child(2)').innerText;
                                    
									if(target == null || (org_cost == null || sem_cost == null)){
                                        console.log("Page did not load properly "+target);
                                        console.log(indexNum);
										link = {
                                        'index' : indexNum,
                                        'domain' : domain,    
                                        'org_cost' : null,
                                        'sem_cost': null,
										};
									}else{
										console.log("Page loaded successfully"+ JSON.stringify(indexNum));
										link = {
                                        'index' : indexNum,                                        
                                        'domain' : company, 
                                        // 'org_num' : org_num.myNumUnformat(""),
                                        // 'org_rank' : org_rank,
                                        // 'org_kw' : org_kw,
                                        'org_cost' : org_cost.innerText,
                                        //
                                        // 'sem_num': sem_num,
                                        // 'sem_kw': sem_kw,
                                        'sem_cost': sem_cost.innerText,
                                        //
                                        // 'blinks_num': blinks_num,
                                        // 'blinks_domains': blinks_domains,
                                        // 'blinks_ips': blinks_ips,
                                        //
                                        // 'ad_num': ad_num,
                                        // 'ad_publishers': ad_publishers,
                                        // 'ad_advertisers': ad_advertisers,

										};
									}
									
									
								
								}catch(e){
									console.log("Error"+e);
								}
								return link;
							    

							},{indexNum: index, domain: domain});
							linkData.push(linkObj);

						});
						
						

					});
						
                }    
                // if(counter === 1000){
                //     fs.write(outputFileName+"-1.json",JSON.stringify(linkData,null,'\t'));
    
                // }
                // if(counter === 2000){
                //     fs.write(outputFileName+"-2.json",JSON.stringify(linkData,null,'\t'));
    
                // }
                // if(counter === 3000){
                //     fs.write(outputFileName+"-3.json",JSON.stringify(linkData,null,'\t'));
    
                // }if(counter === 4000){
                //     fs.write(outputFileName+"-4.json",JSON.stringify(linkData,null,'\t'));
    
                // }
                // if(counter === 5000){
                //     fs.write(outputFileName+"-5.json",JSON.stringify(linkData,null,'\t'));
    
                // }
                // if(counter === 6000){
                //     fs.write(outputFileName+"-6.json",JSON.stringify(linkData,null,'\t'));
    
                // }if(counter === 7000){
                //     fs.write(outputFileName+"-7.json",JSON.stringify(linkData,null,'\t'));

                // if (counter % 1000 = 1 && counter >1000)
    
                // }
                // if(counter === 8000){
                //     fs.write(outputFileName+"-8.json",JSON.stringify(linkData,null,'\t'));
    
                // }if(counter === 9000){
                //     fs.write(outputFileName+"-9.json",JSON.stringify(linkData,null,'\t'));
    
                // }
                // if(counter === 9976){
                //     fs.write(outputFileName+"-final.json",JSON.stringify(linkData,null,'\t'));
    
                // }	
                counter += 1;
                fs.write(outputFileName,JSON.stringify(linkData,null,'\t'));

			});
		   			
		});
 	
	// }); //closing of intial url func
	
});


casper.run(function(){
	fs.write(outputFileName,JSON.stringify(linkData,null,'\t'));
	casper.exit();
});








