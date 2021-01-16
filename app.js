const express =require("express");
const https= require("https");
const bodyParser=require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
res.sendFile(__dirname+"/index.html");

});
app.post("/",function(req,res){
  var b=Number(req.body.num2);
  const url="https://samples.openweathermap.org/data/2.5/weather?q="+b+"&appid=01a2f898b1d322846bff0f0a2e1ed5cc";
  https.get(url,function(response){
    console.log(response);
 response.on("data",function(data){
   const h=(JSON.parse(data));
   const s= h.visibility;
   console.log(s);
   const j=h.weather[0].icon;
   res.write("<h1>Visibility is</h1>"+ s);
   res.send();
 })
})

});

app.listen(3000,function(){
  console.log("server");
})
