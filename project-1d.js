var casper = require('casper').create({
	verbose: true,
	logLevel: "debug", pageSettings: { userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36' }
});
var utils = require('utils');
var fs = require('fs');
var data;
var resultList = 3;
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


// function clickNextPage (params) {
	
// 	  if ( document.querySelector(".next-pagination.page-link.disabled") ) {
// 		console.log("All done;")
// 		return false;
// 	  } 
	
// 	  document.querySelector( document ).ajaxStart(function() {
// 		 console.log( "Triggered ajaxStart handler." );
// 		 document.querySelector( document ).unbind("ajaxStart", arguments.callee.name );
// 	  });
	
// 	  document.querySelector(".pagination-text")[1].click();
	
// 	  document.querySelector( document ).ajaxStop(function() {
// 		console.log( "Triggered ajaxStop handler." );
// 		document.querySelector( document ).unbind("ajaxStop", arguments.callee.name );
	
// 		setTimeout( function() { 
// 		  clickOnePage (params) ;
// 		}, 1000); // end of settimeout function    
	
// 	  });
// 	return true;
// }

var processPage = function() {	
	//Click on the next button
	casper.then(function() {
		if(this.exists('#pagination > a.next-pagination.page-link')){
			console.log('Next button does not exist');
			return false;
		} else {
			console.log('Found Next Button');
			this.click('#pagination > a.next-pagination.page-link');
			casper.wait(5000, this.fetchdata);
			// this.waitForSelector("li.result.loading.member", this.fetchdata());
			// this.fetchdata();
		}
		// this.waitForSelector(".next-pagination.page-link");

	});
};

casper.fetchdata = function(){
	var a = this.evaluate(function () {
		console.log('Evaluating');
		var nodesArray = Array.prototype.slice.call(document.querySelectorAll('li.result.loading.member'));

		// nodesArray = nodesArray.slice(0,1);
		
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
	console.log("A", a);
	salesLinkData.push(a);
	fs.write('./links-ol-test-res.json', JSON.stringify(salesLinkData, null, '\t'));
	processPage();

};





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
						this.fetchdata();
						// processPage();	
					});

				});
				counter += 1;
			});

		}); // closing link repeat func

	});

});




casper.run(function () {
	console.log(salesLinkData, true);
	// fs.write('./links-ol-test-res.json', JSON.stringify(salesLinkData, null, '\t'));
	casper.exit();
});








