let count=0;

async function gotoaction(event){
    event.preventDefault()
    const data={
        name:event.target.name.value,
        phone:event.target.phone.value,
        adress:event.target.adress.value
    } 
    await axios
    .post('https://crudcrud.com/api/aa3be5546b0b4383aeeb6fd310163fd4/api',data)
    .then((res)=>{
        disply(res.data);
        document.getElementById('name').value=''
        document.getElementById('phone').value=''
        document.getElementById('adress').value=''
        count++;
        document.getElementById('cou').textContent=`All student:${count}`
    })
 }


  function disply(res){
    let mainE=document.getElementById('uldata');
    

    let t=document.createElement('div');
    t.innerHTML=`
    <p id=${res._id}>${res.name}
    ${res.phone}
    ${res.adress}
    <button onclick=edit(event)>edit</button>
    <button onclick=del(event)>delete</button></p>` ;

    mainE.appendChild(t)

 }


  async function edit(event){
    let el=event.target.parentElement;
    let id=el.id
    
    await axios
    .get(`https://crudcrud.com/api/aa3be5546b0b4383aeeb6fd310163fd4/api/${id}`)
    .then((res)=>{

        document.getElementById('name').value=res.data.name
        document.getElementById('phone').value=res.data.phone
        document.getElementById('adress').value=res.data.adress
    })

     axios
    .delete(`https://crudcrud.com/api/aa3be5546b0b4383aeeb6fd310163fd4/api/${id}`)
    .then((res)=>{
        event.target.parentElement.remove()
        count--;
        document.getElementById('cou').textContent=`All students:${count}`
    }) 

 }


 function del(event){
    let el=event.target.parentElement;
    let id=el.id
    axios
    .delete(`https://crudcrud.com/api/aa3be5546b0b4383aeeb6fd310163fd4/api/${id}`)
    .then((res)=>{
        event.target.parentElement.remove()
        count--;
        document.getElementById('cou').textContent=`All students:${count}`
    })

 }



 window.addEventListener('load',(evn)=>{
    axios
    .get('https://crudcrud.com/api/aa3be5546b0b4383aeeb6fd310163fd4/api')
    .then((res)=>{
        count=res.data.length;
        document.getElementById('cou').textContent=`All students:${count}`
       for(i=0;i<res.data.length;i++){
            disply(res.data[i]);  
       }
    })
    .catch((re)=>{
        console.log(res)
    })
 })



  