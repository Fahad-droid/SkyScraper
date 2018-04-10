var links = [];
var title = [];
var casper = require("casper").create();
 
function getLinks() {
    var links = document.querySelectorAll('.name');
    return Array.prototype.map.call(links, function(e) {
        return e.getAttribute('href');
    });
};
function getTitle() {
    var title = document.querySelectorAll('.location');
    return Array.prototype.map.call(title, function(a) {
        return a.getAttribute('title');
    });
};
casper.start('file:///Users/fahadshaikh/Desktop/Scripting/Datamarketing%20Conference%20Toronto%20-%20Attendee%20List.html', function() {
     this.echo('Current location is =' + this.getCurrentUrl(), 'COMMENT');
 
});
 
// save values in arrays
casper.then(function() {
    links = this.evaluate(getLinks);
});
casper.then(function() {
    title = this.evaluate(getTitle);
});
 
casper.run(function() {
    // echo results in a desired pattern
    this.echo(links.length + ' links found:', 'GREEN_BAR');
    this.echo(' - ' + links.join('\n - '));
    this.echo(title.length + ' title found:', 'GREEN_BAR');
    this.echo(' - ' + title.join('\n - ')).exit();
});


// var names = [];
// var title = [];
// var casper = require("casper").create();
 
// function getLinks() {
//     var name = elem.querySelector('.name').innerHTML;
//     return Array.prototype.map.call(names, function(e) {
//         return name;
//     });
// };
// function getTitle() {
//     var title = elem.querySelector('.col-xs-12:nth-child(5)').innerHTML;
//     return Array.prototype.map.call(title, function(a) {
//         return title;
//     });
// };
// casper.start('file:///Users/fahadshaikh/Desktop/Scripting/Datamarketing%20Conference%20Toronto%20-%20Attendee%20List.html', function() {
//      this.echo('Current location is =' + this.getCurrentUrl(), 'COMMENT');
 
// });
 
// // save values in arrays
// casper.then(function() {
//     names = this.evaluate(getLinks);
// });
// casper.then(function() {
//     title = this.evaluate(getTitle);
// });
 
// casper.run(function() {
//     // echo results in a desired pattern
//     this.echo(names.length + ' links found:', 'GREEN_BAR');
//     this.echo(' - ' + names.join('\n - '));
//     this.echo(title.length + ' title found:', 'GREEN_BAR');
//     this.echo(' - ' + title.join('\n - ')).exit();
// });