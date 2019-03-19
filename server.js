const http = require("http");
var mysql = require('mysql');
const port = 4000;
const ren = require("./te")

const server = http.createServer((req, res)=>{
  var {method, url, headers} = req
  console.log('method ', method)
  console.log('url ', url)
  console.log('headers ', headers)

  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "clients"
  });
  con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT name,age,place FROM details", function (err, result, fields) {
      if (err) throw err;
      console.log(result)
    });
  });

  const users =[
    {name : 'aabb',age: 20,place: 'bbaa'},
    {name : 'ccdd',age: 30,place: 'ddcc'},
    {name : 'eeff',age: 40,place: 'ffee'},
  ]




if(method === "GET"){
  ren('./views/index.html', { title: 'Home', message: '................DEMO..............', users}, function(err, data){
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data)
    res.end();
})
}

})

server.listen(port, () => console.log(`app listening on port ${port}!`))