import express from "express"
import cors from "cors"
const app = express();

app.use(express.json())
app.use(express.urlencoded())
app.use(cors())
app.use(express.urlencoded({ extended: true }))

app.get("/", (req,res)=> {
   res.send('fdfsdf');
})
 
try{
   app.listen(8080, () => {
      console.log("server is up and running on port 8080");
      
   })
}catch(e) {
   console.log(e);
   
}
