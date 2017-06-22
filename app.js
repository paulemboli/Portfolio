var express = require('express');
var pg = require('pg'); //mysql
var parser = require('body-parser');

const app = express();

app.use (express.static( "public"))// to have access to pictures
app.use(parser.json());

var connectionString = "postgres://postgres:1234567890@localhost:5432/portfolio";
var pgClient = new pg.Client(connectionString);// new instant of Client
pgClient.connect();

//Tested it out if it is connected by creating a table
// pgClient.query("CREATE TABLE IF NOT EXISTS blog(id SERIAL UNIQUE PRIMARY KEY, title varchar(255) NOT NULL, body text NOT NULL)")
app.set('view engine', 'ejs')
app.get('/',(req ,res)=> {
  res.render('index');
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

app.listen(8000)
