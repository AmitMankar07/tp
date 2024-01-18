
const http=require('http');
const fs=require('fs');

let userMessage=[];
const server=http.createServer((req,res)=>{
   console.log(req.url,req.method,req.headers);

   const method=req.method;
   const url=req.url;
   if(url==='/'){
    res.write('<html>');
    res.write('<head><title>Enter Message</title></head>');
    res.write('<body>');
        res.write('<h1>' + userMessage + '</h1>');
    res.write('<form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send Message</button></form>');
    res.write('</body>');
    res.write('</html>');
    return res.end();
   }
   else if(url==='/home'){
    res.write('<html>');
    res.write('<head><title> My first PAge</title></head>');
    res.write('<body><h1>Welcome Home</h1></body>');
    res.write('</html>')
    return res.end();
   }
    else if(url==='/about'){
    res.write('<html>');
    res.write('<head><title> My first PAge</title></head>');
    res.write('<body><h1>Welcome to About Us</h1></body>');
    res.write('</html>')
    return res.end();
   }
   else if(url==='/node'){
    res.write('<html>');
    res.write('<head><title> My first PAge</title></head>');
    res.write('<body><h1>Welcome to my NodeJs Project</h1></body>');
    res.write('</html>')
    return res.end();
   }

   if(url==='/message' && method==='POST'){
    const body=[];
    req.on('data',(chunk)=>{
        console.log(chunk);
        body.push(chunk);
    });
    return req.on('end',()=>{
        const parsedBody=Buffer.concat(body).toString();
        const message=parsedBody.split('=')[1];
        userMessage.unshift(message);
        fs.writeFile('message.txt',userMessage.join('\n'),err=>{
            res.statusCode=302;
            res.setHeader('Location','/');
            return res.end();
        });
       
    });
    
    
   }
    res.setHeader('Content-Type','text/html');
    res.write('<html>');
    res.write('<head><title> My first PAge</title></head>');
    res.write('<body><h1>Hello</h1></body>');
    res.write('</html>')
    res.end();
    
});


server.listen(4000);
