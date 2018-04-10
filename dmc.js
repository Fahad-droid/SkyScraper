var casper = require('casper').create();
var fs = require('fs');
var nameCompArr = [];
var data = [];
var nameArr = [];
var companyArr = [];
var listItems = [];
casper.on("remote.message", function(msg){
    this.echo("remote.msg: " + msg);
});
casper.start('file:///Users/fahadshaikh/Desktop/Scripting/Datamarketing%20Conference%20Toronto%20-%20Attendee%20List.html').then(function() {
this.echo('started');
nameCompArr = this.evaluate(function () {
    console.log("in eval");
    var nodesArray = Array.prototype.slice.call(document.querySelectorAll('.attendee-list .row'));
    
    return [].map.call(nodesArray, function(node) {
         var name = node.querySelector('.name').innerHTML;
         var company = node.querySelector('.col-xs-12:nth-child(5)').innerHTML;
         var str= {
                     'Full Name' : name,
                     'Company' : company,
         };
                                                
         return str;
    });
});

});

casper.run(function(){
    fs.write('./dmcres.json',JSON.stringify(nameCompArr,null,'\t'));
	casper.exit();
});
