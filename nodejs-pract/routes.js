const fs=require('fs');

const requestHandler=(req,res)=>{
    const method=req.method;
   const url=req.url;
   const body=[];
    if(url==='/'){
        // const filePath=path.join(__dirname,"message.txt");
        fs.readFile("message.txt",{encoding:"utf-8"},(err,data)=>{
        if(err){
            console.log(err);
        }

        console.log('data from file'+data);
        res.setHeader('Content-Type','text/html');
        res.write('<html>');
        res.write('<head><title>Enter Message</title></head>');
        res.write('<body>');
        res.write(`<h2>${data}</h2>`);
        res.write('<form id="messageForm" action="/message" method="POST">');
        res.write('<input type="text" name="message" id="messageInput" oninput="updateMessage()">');
        res.write('<button type="submit">Send Message</button>');
        res.write('</form>');
        res.write('<script>');
        res.write('function updateMessage() {');
        res.write('const messageInput = document.getElementById("messageInput");');
        res.write('const messageDisplay = document.querySelector("h2");');
        res.write('messageDisplay.innerText = messageInput.value;');
        res.write('}');
        res.write('</script>');
        res.write('</body>');
        res.write('</html>');
        return res.end();
        });
       }

       else if(url==='/message' && method==='POST'){
        req.on('data',(chunk)=>{
            console.log(chunk);
            body.push(chunk);
        });
        return req.on('end',()=>{
            const parsedBody=Buffer.concat(body).toString();
            const message=parsedBody.split('=')[1];
            // userMessage.unshift(message);
            fs.writeFile('message.txt',message,(err)=>{
                console.log("inside fs.writefile");
                res.statusCode=302;
                res.setHeader('Location','/');
                return res.end();
            });   
        });
       }
       else
       {
        res.setHeader('Content-Type','text/html');
        res.write('<html>');
        res.write('<head><title> My first PAge</title></head>');
        res.write('<body><h1>Hello</h1></body>');
        res.write('</html>')
        res.end();
       }
    
};

module.exports=requestHandler;