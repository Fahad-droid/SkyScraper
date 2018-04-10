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
casper.start('https://events.bizzabo.com/global2017').then(function() {
this.echo('started');
nameCompArr = this.evaluate(function () {
    console.log("in eval");
    var nodesArray = Array.prototype.slice.call(document.querySelectorAll('.attendees-faces-holder .row .col-xs-12'));
    console.log("array length"+nodesArray.length);
    return [].map.call(nodesArray, function(node) {
         var name = node.querySelector('.atom-fullname').innerText;
         var title = node.querySelector('.atom-text1').innerHTML;
         var company = node.querySelector('.atom-text2').innerHTML;
         var linkedinUrl = node.querySelector('.scol-sm-3 col-xs-12 entity-photo-holder..nth-child(3) a').hasAttribute(href);
         var str= {
                     'Full Name' : name,
                     'Title' : title,
                     'Company' : company,
         };
                                                
         return str;
    });
});

});

casper.run(function(){
    fs.write('./bizzabo-res.json',JSON.stringify(nameCompArr,null,'\t'));
	casper.exit();
});
