const {
    json
} = require("body-parser");
const {
    response
} = require("express");
const express = require("express");
const app = express();
const https = require('https');

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
    extended: true
}));



app.get("/", function (res, req) {


    req.sendFile(__dirname + "/index.html");

});

app.post("/", function (res, req) {

    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + res.body.cityName + "&appid=5120a85076fd775c9d551fa0f97c12a0"
    https.get(url, function (response) {
        console.log(response.statusCode);
        response.on("data", function (data) {
            var wetherdata = JSON.parse(data);
            var temp = wetherdata.main.temp;
            console.log(wetherdata.main.temp);
        

        });


    });
    
    req.send(res.body.cityName);

})

app.listen(9000, function () {
    console.log("server 9000 running ");
})