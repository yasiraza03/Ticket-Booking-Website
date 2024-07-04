async function postForm(url,clientData){
    try{
        const response =await fetch(url,{
            method:'POST',
            headers:{"content-type":"application/json"},
            body:JSON.stringify(clientData)
        });
        if(!response.ok)
            throw Error('error recieved from server');
        const data=await response.json();
        return data;
    }catch(err){
        return {'error':'bitch u got that url wrong'};
    }
}

export default postForm;