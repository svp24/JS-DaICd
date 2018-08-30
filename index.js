const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const JSONfn = require('./node_modules/json-fn/jsonfn');

function main() {
	//private function whose contents are not to be seen by client
	let privateSomething = function(param) {
  	var a = 10 + param;
    var b = a * 20 + 50 * a + 200;
    return b;
  }
  
  //public function
  function publicSomething(param) {
  	 return privateSomething(param);
  }
	
	class Rectangle {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
				
		maker() {
			alert("Hi!");
		}
}
	var rect = new Rectangle(22, 24);
  return {"publicSomething": publicSomething, "something": 1, "rect" : rect}
}

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
	.get('/myFunction', function (req, res) {
   console.log("Got a GET request for /list_user");
			var mainObj = main();
	res.header("Access-Control-Allow-Origin", '*');
	res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type');
   res.send(JSONfn.stringify(mainObj));
	})
	.get('/myTest', function (req, res) {
   console.log("Got a GET request for /list_user");
	res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
   res.send("mainObj");
	})
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
