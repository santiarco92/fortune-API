import express from "express";
import axios from "axios";


const app = express();
const port = 3000;




app.use(express.static("public"));


app.get("/",  (req, res) => {
    res.render("index.ejs");
});

app.get("/submit", async (req,res) => {
    try {
        const response = await axios.get(" https://aphorismcookie.herokuapp.com");
        const result = response.data;
    

        console.log( "this is the first result: " + result.data["message"]); 

        res.render("index.ejs", {
            message: result.data["message"],
        });
        
    }catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener el mensaje');
    }
   
});

app.get("/refresh", (req, res) => {
    res.render("index.ejs", {
        message: undefined,
    });
});



app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });