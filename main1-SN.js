var casper = require('casper').create({
	verbose: true,
	logLevel: "debug", pageSettings: { userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36' }
});
var utils = require('utils');
var fs = require('fs');
var data;
var linkData = [];


if (fs.exists('./input/Leadgibbon-task.json')) {
	data = require('./input/Leadgibbon-task.json');
} else {
	casper.exit();
}
casper.on("remote.message", function (msg) {
	this.echo("remote.msg: " + msg);
});

var url = 'https://www.linkedin.com/';
casper.start(url, function () {
	casper.wait(2000, function () {
		this.fill('form.login-form', {
			session_key: '******@gmail.com',
			session_password: '******'
		}, true);
		casper.wait(3000, function () {
			var counter = 0;
			casper.repeat(data.length, function () {
				var row = data[counter];
				var name = row['name'];
				var company = row['company'];
				var uri = 'https://www.linkedin.com/sales/search?keywords=' + name + ' ' + company;
				var url = encodeURI(uri);
				casper.thenOpen(url, function () {
					console.log(url);
					casper.wait(2000, function () {
						var linkObj = this.evaluate(function () {
							var link;
							try {
								console.log("in eval");
								var mainNode = document.querySelector('li.result.loading.member');

								var name = mainNode.querySelector('.name-link');
								var position = mainNode.querySelector(".info-value");
								var company = mainNode.querySelector(".company-name");
								var degreeOfConnection = mainNode.querySelector(".degree-icon");
								var region = mainNode.querySelector(".info p:nth-child(3)");
								var salesNavLink = mainNode.querySelector(".profile-link");
								var openLink = mainNode.querySelector(".details-container .badges ");

								return {
									'name': name.textContent,
									'position': position.textContent,
									'company': company.textContent,
									'degreeOfConnection': degreeOfConnection.textContent,
									'region': region.textContent,
									'salesLink': salesNavLink.href,
									'openlink': openLink.textContent.trim(),
								};
							} catch (e) {
								console.log("Error" + e);
							}
							return str;
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


casper.run(function () {
	fs.write('./output/LGT1.json', JSON.stringify(linkData, null, '\t'));
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







