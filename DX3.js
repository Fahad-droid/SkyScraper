var casper = require('casper').create({
	/*verbose: true,
	logLevel: "debug", */pageSettings: { userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36' }
});
var utils = require('utils');
var fs = require('fs');
var data;
var repCount;
var linkData = [];
var salesLinkData = [];
if (fs.exists('./input/dx3-input.json')) {
	data = require('./input/dx3-input.json');
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
		
		this.capture('./scs/ol1.png');
			var counter = 0;
			casper.repeat(data.length, function () {


				var row = data[counter];
				var name = row['Name'];
                var position = row['Position'];
                var company = row['Company'];


                var uri = "";
                if(name != "" ){
                    if(company != ""){
                        if(position != ""){
                            uri = 'https://www.linkedin.com/sales/search/?keywords='+name+' '+company+' '+position;
                        }else{
                            uri = 'https://www.linkedin.com/sales/search/?keywords='+name+' '+company;
                        }

                    }else{
                        uri = 'https://www.linkedin.com/sales/search/?keywords='+name;
                    }
                   
                }else{
                     if(company != ""){
                        if(position != ""){
                            uri = 'https://www.linkedin.com/sales/search/?keywords='+position+' '+company;
                        }else{
                            uri = 'https://www.linkedin.com/sales/search/?keywords='+company;
                        }
                    }


                }              
                var url = encodeURI(uri);
                console.log(url);
				console.log("Opening the link...... ");
				// var uri = 'https://www.linkedin.com/sales/search?keywords='+name+' '+company;
				//  var url = encodeURI(uri);
				casper.thenOpen(url, function () {			
					console.log(url);
					casper.wait(5000, function () {
						this.capture('./scs/ol.png');
						var salesDataObj = casper.evaluate(function(){

						 	 var name = document.querySelector('.name-link');
							 var position = document.querySelector(".info-value");
							 var company = document.querySelector(".company-name");
							 var degreeOfConnection = document.querySelector(".degree-icon");
							 var region = document.querySelector(".info p:nth-child(3)");
							 var salesNavLink = document.querySelector(".profile-link");
							 var openLink = document.querySelector(".details-container .badges ");
							 var salesData = {
								'name': name.textContent,
								'position': position.textContent,
								'company': company.textContent,
								'degreeOfConnection': degreeOfConnection.textContent,
								'region': region.textContent,
								'salesLink': salesNavLink.href,
								'openlink': openLink.textContent.trim(),
							};
							
							return salesData;

						});
						
						salesLinkData.push(salesDataObj);
					});


				});
				counter += 1;
			});// closing link repeat func

		}); 

	});

});




// var stopScript = function() {
//     casper.echo("STOPPING SCRIPT").exit();
// };
// var processPage = function() {
//     pageData = this.evaluate(getPageData);//getPageData is your function which will do data scraping from the page. If you need to extract data from tables, from divs write your logic in this function
    
//     //If there is no nextButton on the page, then exit a script because we hit the last page
//     if (this.exists("#nextButton") == false) {
//         stopScript();
//     }
 
// 	//Click on the next button
//     this.thenClick("#nextButton").then(function() {
//         this.waitForSelector("#content",processPage, stopScript);
//     });
// };
function getPageData(){
	/*
	In this function you can put anything you want in order to extract your data from the website.
	*/
	var salesLinkDataObj = casper.evaluate(function () {
        console.log(" SCRAPING DATA !! /\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/")
		var nodesArray = Array.prototype.slice.call(document.querySelectorAll('li.result.loading.member'));
		
		return Array.prototype.map.call(nodesArray, function(node) {
			 var name = node.querySelector('.name-link');
			 var position = node.querySelector(".info-value");
			 var company = node.querySelector(".company-name");
			 var degreeOfConnection = node.querySelector(".degree-icon");
			 var region = node.querySelector(".info p:nth-child(3)");
			 var salesNavLink = node.querySelector(".profile-link");
			 var openLink = node.querySelector(".details-container .badges ");
			 var salesData = {
				'name': name.textContent,
				'position': position.textContent,
				'company': company.textContent,
				'degreeOfConnection': degreeOfConnection.textContent,
				'region': region.textContent,
				'salesLink': salesNavLink.href,
				'openlink': openLink.textContent.trim(),
			};
			return salesData;
		});
		console.log('Currently on Page no.: ' + document.querySelector('.active.pagination-link-item').textContent);
	});
	if (salesLinkDataObj) {
	salesLinkDataObj.forEach(function(element) {
		salesLinkData.push(element);
		console.log('Adding JSON object');

	});
	} else {
		console.log('Empty object');
	}

	// processPage();	
    // return;
    
};

var processPage = function() {
    getPageData();//getPageData is your function which will do data scraping from the page. If you need to extract data from tables, from divs write your logic in this function
    
    //If there is no nextButton on the page, then exit a script because we hit the last page
    if (casper.exists(".next-pagination.page-link.disabled")) {
        console.log(" -- ALL DONE !! \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/");
        stopScript();
    }else{
 
    //Click on the next button
    

    casper.thenClick(".next-pagination.page-link").then(function() {
        console.log(" -- NEXT BUTTON CLICKED !! \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/");
        casper.waitForSelector("li.result.loading.member",processPage, stopScript);
    });
    }
};

var stopScript = function() {
	console.log(" -- STOPPING SCRIPT !! /\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/");
	
    //salesLinkData = uniqueArr(salesLinkData);    
   // fs.write('./links-ol-test-res-12.json', JSON.stringify(salesLinkData, null, '\t'));
	casper.echo("STOPPING SCRIPT");
    return true;
};

// var uniqueArr = function arrUnique(arr) {
//     var cleaned = [];
//     arr.forEach(function(itm) {
//         var unique = true;
//         cleaned.forEach(function(itm2) {
//             if (_.isEqual(itm, itm2)) unique = false;
//         });
//         if (unique)  cleaned.push(itm);
//     });
//     return cleaned;
// }


casper.run(function () {
	// salesLinkDatafil = salesLinkData.filter(function (el, i, arr) {
	// 	return arr.indexOf(el) === i;
	// });
	function dedup(arr) {
		var hashTable = {};
	
		return arr.filter(function (el) {
			var key = JSON.stringify(el);
			var match = Boolean(hashTable[key]);
	
			return (match ? false : hashTable[key] = true);
		});
	}
	
	//var deduped = dedup(salesLinkData);
	fs.write('./output/d3x-output.json', JSON.stringify(salesLinkData, null, '\t'));
	casper.exit();
});