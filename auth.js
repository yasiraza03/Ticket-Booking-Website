const {retrieve}=require("./dbService");

function auth(req,res,next){
    query="select * from users where email = ? and password = ?";
    console.log(req.body.email);
    values=[req.body.email,req.body.pass];
    retrieve(query,values,function(data){
        if(data!=null&&data.length>0){
            console.log("found");
            req.results=data;
        }
        else    
            console.log("not found");
        next();
    });
}
function setUser(users){
    return((req,res,next)=>{
        req.temp=users.find((element)=>element.id=req.query.userid);
        next();
    })
}

function authRole(req,res,next){
    if(req.temp.role!=='admin'){
        res.send("not admin");
        return;
    }
    next();
}


module.exports={auth,setUser,authRole};