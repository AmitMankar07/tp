
const http=require('http');

const routes=require('./routes');

const server=http.createServer(routes);

server.listen(4000);


// else if(url==='/home'){
//     res.write('<html>');
//     res.write('<head><title> My first PAge</title></head>');
//     res.write('<body><h1>Welcome Home</h1></body>');
//     res.write('</html>')
//     return res.end();
//    }
//     else if(url==='/about'){
//     res.write('<html>');
//     res.write('<head><title> My first PAge</title></head>');
//     res.write('<body><h1>Welcome to About Us</h1></body>');
//     res.write('</html>')
//     return res.end();
//    }
//    else if(url==='/node'){
//     res.write('<html>');
//     res.write('<head><title> My first PAge</title></head>');
//     res.write('<body><h1>Welcome to my NodeJs Project</h1></body>');
//     res.write('</html>')
//     return res.end();
//    }