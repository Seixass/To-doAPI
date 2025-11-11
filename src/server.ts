import  express from "express";
import { router } from "./routes/tasksRoutes";

const app = express();

app.use(express.json());
app.use('/', router);

app.listen(3000, () =>{
    console.log('Server on PORT 3000');
})