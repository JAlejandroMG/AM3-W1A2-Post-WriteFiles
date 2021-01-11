const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

const PORT = 8080;
app.listen(PORT, () => {
   console.log(`Servidor iniciado en puerto ${PORT}`);
});

app.use(express.static('public'));

app.use(express.urlencoded({extended: false}));


app.get('/', (request, response) => {
   response.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/nosotros', (request, response) => {
   response.sendFile(path.join(__dirname, 'about.html'));
});

app.get('/contacto', (request, response) => {
   response.sendFile(path.join(__dirname, 'contact.html'));
});

app.get('/proyectos', (request, response) => {
   response.sendFile(path.join(__dirname, 'projects.html'));
});

app.post('/usuarios', (request, response) => {
   const data = request.body;

   const user = `Nombre: ${data.name}\nApellidos: ${data.lastname}\nEmail: ${data.email}\nContraseña: ${data.password}`

   fs.writeFile('usuarios_db_express.txt', user, (error) => {
      if(error) {
         console.log(error);
      }

      response.redirect('/');
   });
});

app.use((request, response) => {
   response.sendFile(path.join(__dirname, '404.html'));
});
