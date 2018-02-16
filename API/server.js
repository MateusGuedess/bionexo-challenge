const { app } = require('./app/bootstrap');


const PORT = 3000;
app.listen(PORT, () => console.log(`App running at port ${PORT}`));