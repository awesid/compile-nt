var codeFile = {
    dom: document.getElementById("codeFile"),
    content:null
};

var data={};
codeFileLabel = document.getElementById('codeFileLabel');
codeFile.dom.addEventListener('change',(event)=>{
    event.preventDefault();
    console.log(codeFile.dom.value)
    codeFileLabel.innerHTML = codeFile.dom.value;
})

var submitbtn = document.getElementById('submit');
var codeType = document.getElementById('code-type');
var sourceCode = document.getElementById('sourcecode');
var stdin = document.getElementById('stdin');
var stdout = document.getElementById('stdout');

submitbtn.addEventListener('click',(event)=>{
    event.preventDefault();
    sessionStorage.type = codeType.value;
    sessionStorage.code = sourceCode.value; 
    sessionStorage.input = stdin.value;
    var reader = new FileReader();
    if(codeFile.dom.files[0]){
        reader.readAsText(codeFile.dom.files[0]);
        reader.addEventListener('load',(event)=>{
            codeFile.content = reader.result;
            console.log(codeFile.content);
            data.type = codeType.value;
            data.code = codeFile.content;
            data.input = stdin.value;
            var req = new XMLHttpRequest();
            req.open('POST',"http://localhost:3000/code",true);
            req.setRequestHeader("Content-Type", "application/json");
            req.responseType = 'text/plain';
            req.onreadystatechange = function(){
                if(req.status===200 || req.readyState === 4){
                    stdout.value = req.response;
                }
            }
            req.send(JSON.stringify(data));
        });
    
    }else{
        data.type = codeType.value;
        data.code = sourceCode.value; 
        data.input = stdin.value;
        var req = new XMLHttpRequest();
        req.open('POST',"http://localhost:3000/code",true);
        req.responseType = 'text/plain';
        req.setRequestHeader("Content-Type", "application/json");
        req.onreadystatechange = function(){
            if(req.status===200 || req.readyState === 4){
                stdout.value = req.responseText;
            }
        }
        console.log(JSON.stringify(data));
        req.send(JSON.stringify(data));
    }
});

window.addEventListener('load',(event)=>{
    if(sessionStorage.type) codeType.value = sessionStorage.type;
    if(sessionStorage.code) sourceCode.value = sessionStorage.code; 
    if(sessionStorage.input) stdin.value = sessionStorage.input;
});

codeType.addEventListener('change',(event)=>{
    console.log("sdfg");
    if(codeType.value==='java'){
        $('#javamodal').modal('show');
    }
})