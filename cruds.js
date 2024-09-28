let title=document.getElementById('title');
let price=document.getElementById('price');
let taxes=document.getElementById('taxes');
let ads=document.getElementById('ads');
let discount=document.getElementById('discount');
let category=document.getElementById('category');
let count=document.getElementById('count');
let submit=document.getElementById('submit');
let mood='create';
let y;
console.log(title,price,taxes,ads,discount,category,count,submit);
function getTotal(){
  if(price.value!=''){
    let result = (+price.value+ +taxes.value+ +ads.value)- +discount.value;
    total.innerHTML=result;
    total.style.background='#040';
  }
  else{
    total.innerHTML='';
    total.style.background='#a00d02';
  }
}
let dataPro=[];
if(localStorage.product!=null){
    dataPro=JSON.parse(localStorage.product);
}else{
    dataPro=[];
}

submit.onclick=function(){
    let newPro={
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        category:category.value.toLowerCase(),
        count:count.value,
    }
    if(title.value!='' && price.value!='' && newPro.count<100 && category.value!=''){
    if(mood==='create'){
      if(newPro.count>1){
        for(let x=0;x<newPro.count;x++){
          dataPro.push(newPro);
        }
      }else{
        dataPro.push(newPro);
      }
        
   }clearData();
  }
   else{
    dataPro[y]=newPro;
    mood='create';
    submit.innerHTML='create'
    count.style.display='block';
   }
     
    localStorage.setItem('product',JSON.stringify(dataPro));
    
    showData();   
    
}
function clearData(){
   title.value='';
   price.value='';
   taxes.value='';
   ads.value='';
   total.innerHTML='';
   category.value='';
   discount.value='';
   count.value='';
}
function showData(){
  getTotal();
   let table='';
   
   for(let i=0;i<dataPro.length;i++){
    table +=` <tr>
    <td>${i+1}</td>
    <td>${dataPro[i].title}</td>
    <td>${dataPro[i].price}</td>
    <td>${dataPro[i].taxes}</td>
    <td>${dataPro[i].ads}</td>
    <td>${dataPro[i].discount}</td>
    <td>${dataPro[i].total}</td>
    <td>${dataPro[i].category}</td>
    <td><button onclick="updateData(${i})" id="update">update</button></td>
    <td><button onclick="deleteData(${i}) " id="delete">delete</button></td>
</tr>`;
    
   }
  
    
   document.getElementById('tbody').innerHTML=table;
   let btnDelete=document.getElementById('deleteAll');
   if(dataPro.length>0){
    btnDelete.innerHTML=`<button onclick="deleteAll()">deleteAll(${dataPro.length})</button>`;

   }else{
    btnDelete.innerHTML='';
   }
}
showData();
function updateData(i){
  discount.value=dataPro[i].discount;
  title.value=dataPro[i].title;
  price.value=dataPro[i].price;
  category.value=dataPro[i].category;
  taxes.value=dataPro[i].taxes;
  ads.value=dataPro[i].ads;
  count.style.display='none';
  getTotal();
  submit.innerHTML='update'
  mood='update';
  y=i;
  scroll({
    top:0,
    behavior:'smooth'

  })
  }
  function deleteData(i){
    dataPro.splice(i,1);
    localStorage.product=JSON.stringify(dataPro);
    showData();
   console.log(i);
  }

  
function deleteAll(){
  localStorage.clear();
  dataPro.splice(0);
  showData();
}update=document.getElementById('update');
let searchMood='title';
function getSearchMood(id){
  let search=document.getElementById('search');
  search.value='';
  if(id=='searchTitle'){
    searchMood='title';
   
  }else{
    searchMood='category';
    
  }
  search.placeholder='search by '+ searchMood;
  search.focus();
  showData();


}
function searchData(value){
  
  let table='';
if(searchMood=='title'){
for(let i=0;i<dataPro.length;i++){
  if(dataPro[i].title.includes(value.toLowerCase())){

    table +=` <tr>
    <td>${i}</td>
    <td>${dataPro[i].title}</td>
    <td>${dataPro[i].price}</td>
    <td>${dataPro[i].taxes}</td>
    <td>${dataPro[i].ads}</td>
    <td>${dataPro[i].discount}</td>
    <td>${dataPro[i].total}</td>
    <td>${dataPro[i].category}</td>
    <td><button onclick="updateData(${i})" id="update">update</button></td>
    <td><button onclick="deleteData(${i}) " id="delete">delete</button></td>
</tr>`

  }
}


}else{
  for(let i=0;i<dataPro.length;i++){
    if(dataPro[i].category.includes(value)){
  
      table +=` <tr>
      <td>${i}</td>
      <td>${dataPro[i].title}</td>
      <td>${dataPro[i].price}</td>
      <td>${dataPro[i].taxes}</td>
      <td>${dataPro[i].ads}</td>
      <td>${dataPro[i].discount}</td>
      <td>${dataPro[i].total}</td>
      <td>${dataPro[i].category}</td>
      <td><button onclick="updateData(${i})" id="update">update</button></td>
      <td><button onclick="deleteData(${i}) " id="delete">delete</button></td>
  </tr>`
  
    }
  }
}
document.getElementById('tbody').innerHTML=table;
}
