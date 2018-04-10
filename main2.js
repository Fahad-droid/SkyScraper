var node_xj = require("xls-to-json");
  node_xj({
    input: "data2.xls",  // input xls 
    output: "data2.json", // output json 
    sheet: "Sheet1"  // specific sheetname 
  }, function(err, result) {
    if(err) {
      console.error(err);
    } else {
      console.log("ok");
    }
  });