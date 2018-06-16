const express = require('express'),
    fs = require('fs'),
    {exec} = require('child_process'),
    path = require('path'),
    bodyParser = require('body-parser'),
    assert = require('assert');

var router = express.Router();


router.get('/',(req,res,next)=>{
    console.log("sdf")
    res.statusCode = 200;
    res.setHeader("Content-Type","text/html");
    res.sendFile(path.join(__dirname,'../frontEnd/index.html'));
});


router.post('/',(req,res,next)=>{
    console.log(req.body);
    var type = req.body.type;
    if(type === "c"){
        fs.writeFile('test.c', req.body.code,(err)=>{
            if(err){
                console.log("Error" + err);
                assert.strictEqual(err,null);
                next(err);
                return;
            }
        });
        fs.writeFile('inp.txt', req.body.input,(err)=>{
            if(err){
                console.log("Error" + err);
                assert.strictEqual(err,null);
                next(err);
                return;
            }
        });
        exec('gcc test.c', (err,stdout,stderr)=>{
            if(err){
                console.log(err);
                var error = new Error("Compilation Error: " + err);
                next(error);
                return;
            }
            else if(stderr){
                res.statusCode=200;
                res.setHeader("Content-Type",'text/plain');
                res.send("Compilation Error:" + stderr);
                
            }else{
                exec('./a.out < inp.txt > out.txt',{"timeout":2000},(err,stdout,stderr)=>{
                    if(err){
                        var error = new Error("TimeOut");
                        console.log("err");
                        next(error);
                        return;
                    }
                    else if(stderr){
                        res.statusCode=200;
                        res.setHeader("Content-Type",'text/plain');
                        console.log("stderr")
                        res.send("RunTime Error:" + stderr);
                    }else{
                        //clearTimeout(a);
                        console.log("stdout");
                        res.statusCode=200;
                        res.setHeader("Content-Type",'text/plain');
                        fs.createReadStream("./out.txt").pipe(res);
                        
                    }
                });
            }

        });
        setTimeout(()=>{
            fs.unlink('test.c',(err)=>{
                if(err) next(err);
            });
            fs.unlink('a.out',(err)=>{
                if(err) next(err);
            });
            fs.unlink('inp.txt',(err)=>{
                if(err) next(err);
            })
            fs.unlink('out.txt',(err)=>{
                if(err) next(err);
            })

        },5000);
    }else if(type === "cpp"){
        fs.writeFile('test.cpp', req.body.code,(err)=>{
            if(err){
                console.log("Error" + err);
                next(err);
                return;
            }
        });
        fs.writeFile('inp.txt', req.body.input,(err)=>{
            if(err){
                console.log("Error" + err);
                next(err);
                return;
            }
        });
        exec('g++ test.cpp', (err,stdout,stderr)=>{
            if(err){
                console.log(err);
                var error = new Error("Compilation Error: " + err);
                next(error);
                return;
            }
            else if(stderr){
                res.statusCode=200;
                res.setHeader("Content-Type",'text/plain');
                res.send("Compilation Error:" + stderr);
                
            }else{
                exec('./a.out < inp.txt > out.txt',{"timeout":2000},(err,stdout,stderr)=>{
                    if(err){
                        var error = new Error("TimeOut. The execution of the program took more than 2 seconds.");
                        console.log("err");
                        next(error);
                        return;
                    }
                    else if(stderr){
                        res.statusCode=200;
                        res.setHeader("Content-Type",'text/plain');
                        console.log("stderr")
                        res.send("RunTime Error:" + stderr);
                    }else{
                        //clearTimeout(a);
                        console.log("stdout");
                        res.statusCode=200;
                        res.setHeader("Content-Type",'text/plain');
                        fs.createReadStream("./out.txt").pipe(res);
                        
                    }
                });
            }

        });
        setTimeout(()=>{
            fs.unlink('test.cpp',(err)=>{
                if(err) next(err);
            });
            fs.unlink('a.out',(err)=>{
                if(err) next(err);
            });
            fs.unlink('inp.txt',(err)=>{
                if(err) next(err);
            })
            fs.unlink('out.txt',(err)=>{
                if(err) next(err);
            })

        },5000);
    }else if(type === "cpp11"){
        fs.writeFile('test.cpp', req.body.code,(err)=>{
            if(err){
                console.log("Error" + err);
                assert.strictEqual(err,null);
                next(err);
                return;
            }
        });
        fs.writeFile('inp.txt', req.body.input,(err)=>{
            if(err){
                console.log("Error" + err);
                assert.strictEqual(err,null);
                next(err);
                return;
            }
        });
        exec('g++ -stdc++=11 test.cpp', (err,stdout,stderr)=>{
            if(err){
                console.log(err);
                var error = new Error("Compilation Error: " + err);
                next(error);
                return;
            }
            else if(stderr){
                res.statusCode=200;
                res.setHeader("Content-Type",'text/plain');
                res.send("Compilation Error:" + stderr);
                
            }else{
                exec('./a.out < inp.txt > out.txt',{"timeout":2000},(err,stdout,stderr)=>{
                    if(err){
                        var error = new Error("TimeOut");
                        console.log("err");
                        next(error);
                        return;
                    }
                    else if(stderr){
                        res.statusCode=200;
                        res.setHeader("Content-Type",'text/plain');
                        console.log("stderr")
                        res.send("RunTime Error:" + stderr);
                    }else{
                        //clearTimeout(a);
                        console.log("stdout");
                        res.statusCode=200;
                        res.setHeader("Content-Type",'text/plain');
                        fs.createReadStream("./out.txt").pipe(res);
                        
                    }
                });
            }

        });
        setTimeout(()=>{
            fs.unlink('test.cpp',(err)=>{
                if(err) next(err);
            });
            fs.unlink('a.out',(err)=>{
                if(err) next(err);
            });
            fs.unlink('inp.txt',(err)=>{
                if(err) next(err);
            })
            fs.unlink('out.txt',(err)=>{
                if(err) next(err);
            })

        },5000);
    }else if(type === "java"){
        fs.writeFile('test.java', req.body.code,(err)=>{
            if(err){
                console.log("Error" + err);
                assert.strictEqual(err,null);
                next(err);
                return;
            }
        });
        fs.writeFile('inp.txt', req.body.input,(err)=>{
            if(err){
                console.log("Error" + err);
                assert.strictEqual(err,null);
                next(err);
                return;
            }
        });
        exec('javac test.java', (err,stdout,stderr)=>{
            if(err){
                console.log(err);
                var error = new Error("Compilation Error: " + err);
                next(error);
                return;
            }
            else if(stderr){
                res.statusCode=200;
                res.setHeader("Content-Type",'text/plain');
                res.send("Compilation Error:" + stderr);
                
            }else{
                exec('java main < inp.txt > out.txt',{"timeout":2000},(err,stdout,stderr)=>{
                    if(err){
                        var error = new Error("TimeOut");
                        console.log("err");
                        next(error);
                        return;
                    }
                    else if(stderr){
                        res.statusCode=200;
                        res.setHeader("Content-Type",'text/plain');
                        console.log("stderr")
                        res.send("RunTime Error:" + stderr);
                    }else{
                        //clearTimeout(a);
                        console.log("stdout");
                        res.statusCode=200;
                        res.setHeader("Content-Type",'text/plain');
                        fs.createReadStream("./out.txt").pipe(res);
                        
                    }
                });``
            }

        });
        setTimeout(()=>{
            fs.unlink('test.java',(err)=>{
                if(err) next(err);
            });
            fs.unlink('main.class',(err)=>{
                if(err) next(err);
            });
            fs.unlink('inp.txt',(err)=>{
                if(err) next(err);
            })
            fs.unlink('out.txt',(err)=>{
                if(err) next(err);
            })

        },5000);
    }else if(type === "python2"){
        fs.writeFile('test.py', req.body.code,(err)=>{
            if(err){
                console.log("Error" + err);
                assert.strictEqual(err,null);
                next(err);
                return;
            }
        });
        fs.writeFile('inp.txt', req.body.input,(err)=>{
            if(err){
                console.log("Error" + err);
                assert.strictEqual(err,null);
                next(err);
                return;
            }
        });
        exec('python2 test.py', (err,stdout,stderr)=>{
            if(err){
                console.log(err);
                var error = new Error("Compilation Error: " + err);
                next(error);
                return;
            }
            else if(stderr){
                res.statusCode=200;
                res.setHeader("Content-Type",'text/plain');
                res.send("STD Error:" + stderr);
                
            }else{
                console.log("stdout");
                res.statusCode=200;
                res.setHeader("Content-Type",'text/plain');
                fs.createReadStream("./out.txt").pipe(res);
            }

        });
        setTimeout(()=>{
            fs.unlink('test.py',(err)=>{
                if(err) next(err);
            });
            fs.unlink('inp.txt',(err)=>{
                if(err) next(err);
            })
            fs.unlink('out.txt',(err)=>{
                if(err) next(err);
            })

        },5000);
    }else if(type === "python3"){
        fs.writeFile('test.py', req.body.code,(err)=>{
            if(err){
                console.log("Error" + err);
                assert.strictEqual(err,null);
                next(err);
                return;
            }
        });
        fs.writeFile('inp.txt', req.body.input,(err)=>{
            if(err){
                console.log("Error" + err);
                assert.strictEqual(err,null);
                next(err);
                return;
            }
        });
        exec('python3 test.py', (err,stdout,stderr)=>{
            if(err){
                console.log(err);
                var error = new Error("Compilation Error: " + err);
                next(error);
                return;
            }
            else if(stderr){
                res.statusCode=200;
                res.setHeader("Content-Type",'text/plain');
                res.send("STD Error:" + stderr);
                
            }else{
                console.log("stdout");
                res.statusCode=200;
                res.setHeader("Content-Type",'text/plain');
                fs.createReadStream("./out.txt").pipe(res);
            }

        });
        setTimeout(()=>{
            fs.unlink('test.py',(err)=>{
                if(err) next(err);
            });
            fs.unlink('inp.txt',(err)=>{
                if(err) next(err);
            })
            fs.unlink('out.txt',(err)=>{
                if(err) next(err);
            })

        },5000);
    }
});


module.exports = router;