const app = require('./app');
require('./config/db');
const PORT = process.env.port || 5001;



app.listen(PORT,()=>{
    console.log(`server is running at http://localhost/${PORT}`);
});

