
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require('https');

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function (req, res){

    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;
    console.log(firstName);
    console.log(lastName);
    console.log(email);

    //mathi ko user bata web ma leko data api ma post garna ko lagi tala ko const data bana ko jun lae chai api ko coloumn 
    //--coloumn ko discription match garcha 

    const data = {  //const data is an object method of object in js = var object {}
        members: [
            {
                
            email_address: email,
            status:"subscribed",
            merge_fields: {
                FNAME:firstName,
                LNAME:lastName
            }
            }
        ]
        //members is an array of objects. i.e member array ho jasko vitra object cha
    }

    const jsonData = JSON.stringify(data);
    
    //above const data is in javascript form so inorder to change that we use json.
    const url = "https://us12.api.mailchimp.com/3.0/lists/a8e11d3aa5";
    const options ={
        method:"POST",
        auth:"ujwal1:81db07f7368a58d7be345e85f3a5f465-us12"
    }

    const request = https.request(url, options, function(response){
        
        //response ma error cha ki haerney. Response virtra dherai huncha DOM model bata statusCode access garya ho tala
        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        }
        else{
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    })
    //request.write(jsonData);
    request.end();

});


app.post("/failure" , function(req, res){
    res.redirect("/");
});



app.listen (process.env.PORT || 3000, function(){
    console.log("The server is running on port 3000");
})





//api key = 81db07f7368a58d7be345e85f3a5f465-us12

//adiance id
//a8e11d3aa5





