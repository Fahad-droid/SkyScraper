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
			session_key: '******@gmail.com',
			session_password: '******'
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
						// this.fetchdata();
						processPage();	
					});

				});
				counter += 1;
			});

		}); // closing link repeat func

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
		
		return [].map.call(nodesArray, function(node) {
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
	});
	salesLinkData.push(salesLinkDataObj);
	// processPage();	
    return;
    
};

var processPage = function() {
    getPageData();//getPageData is your function which will do data scraping from the page. If you need to extract data from tables, from divs write your logic in this function
    
    //If there is no nextButton on the page, then exit a script because we hit the last page
    if (casper.exists(".next-pagination.page-link.disabled")) {
        console.log(" -- ALL DONE !! \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/");
        stopScript();
    }
 
	//Click on the next button
    casper.thenClick(".next-pagination.page-link").then(function() {
        console.log(" -- NEXT BUTTON CLICKED !! \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/");
        casper.waitForSelector("li.result.loading.member",processPage, stopScript);
    });
};

var stopScript = function() {
    console.log(" -- STOPPING SCRIPT !! /\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/");
    fs.write('./links-ol-test-res.json', JSON.stringify(salesLinkData, null, '\t'));
    casper.echo("STOPPING SCRIPT").exit();
};


casper.run(function () {
	//fs.write('./links-ol-test-res.json', JSON.stringify(salesLinkData, null, '\t'));
	casper.exit();
});