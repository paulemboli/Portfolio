var express = require('express');
var pg = require('pg'); //mysql
var parser = require('body-parser');

const app = express();

app.use (express.static( "public"))// to have access to pictures
app.use(parser.json());

var connectionString = "postgres://wybkmycmhctnpn:42cdab1d0e895ea72b11bafbff840004d8c75f053608e0940b9c01eeec95a07c@ec2-23-23-111-171.compute-1.amazonaws.com:5432/d7nsq7k0pfaa3";
var pgClient = new pg.Client(connectionString);// new instant of Client
pgClient.connect();

//Tested it out if it is connected by creating a table
pgClient.query("CREATE TABLE IF NOT EXISTS blog(id SERIAL UNIQUE PRIMARY KEY, title varchar(255) NOT NULL, body text NOT NULL)")
app.set('view engine', 'ejs')
app.get('/',(req ,res)=> {
  res.render('index.ejs');
})
app.get('/paule',(req ,res)=>{
  res.render('website.ejs');
})
app.get('/blog',(req ,res)=>{
// It won't run if table don't exist
var query = pgClient.query("SELECT title, body  FROM blog");
query.on("row", function (row, result) {
  result.addRow(row);
});
query.on("end",function (result){
  // return data to ejs Or page
    res.render('blog',{data: result.rows,})
});

})

app.get('/jukebox',(req ,res)=>{
  res.render('jukebox');
})

app.get('/Mygalleries',(req ,res)=>{
  res.render('Mygalleries.ejs');
})
app.get('/MyInterests',(req ,res)=>{
  res.render('MyInterests.ejs');
})
app.get('/Home',(req ,res)=>{
  res.render('index.ejs');
})
app.get('/Photos',(req ,res)=>{
  res.render('Mygalleries.ejs');
})
app.post('/posts', function (req,res) {
  //console.log(req.body)
  //console.log(req.body.title);
  pgClient.query("INSERT INTO blog( id,title,body) values (DEFAULT, $1, $2) ", [req.body.title, req.body.body]);

res.redirect(200,'/blog');
})

app.listen(process.env.PORT)
