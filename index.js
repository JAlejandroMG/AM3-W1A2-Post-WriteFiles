const http = require('http');
const fs = require('fs');
const mime = require('mime');


http.createServer((request, response) => {

   if(request.method === "GET"){
      switch (request.url) {
         case "/":
            readFile("/index.html", response);
            break;
         case "/nosotros":
            readFile("/about.html", response);
            break;
         case "/contacto":
            readFile("/contact.html", response);
            break;
         case "/proyectos":
            readFile("/projects.html", response);
            break;
         case "/favicon.ico":
            readFile("/favicon.ico", response)
         default:
            readFile(request.url, response);
            break;
      }
   }
   
   else if(request.method === "POST"){
      switch(request.url) {
         case "/usuarios":
            agregarUsuario(request);
            break;
         default:
            readFile(request.url, response);
            break;
      };
      
   }

}).listen(8080);



const readFile = (url, response) => {
   const urlF = __dirname + url;

   fs.readFile(urlF, (error, content) => {
      if(!error){
         response.setHeader("Content-Type", mime.getType(urlF));
         response.end(content);
      }else{
         response.writeHead(404);
         response.end("<h2>404 Not Found</h2>");
      }
   });
};


const agregarUsuario = (request) =>{
   let data = "";

   request.on('data', chunk => {
      data += chunk;
   });

   request.on('end', () => {
      const datos = data.toString();

      const user = `Nombre: ${datos.split("&")[0].split("=")[1]}\nApellidos: ${datos.split("&")[1].split("=")[1]}\nEmail: ${datos.split("&")[2].split("=")[1]}\nContraseña: ${datos.split("&")[3].split("=")[1]}`;
      
      fs.writeFile("db_usuarios.txt", user, (error) => {
         if(error) {
            console.log(error);
         }
      });
      console.log("Fin del stream");
   });


   request.on('error', error => {
         console.log(error);
   });
};
