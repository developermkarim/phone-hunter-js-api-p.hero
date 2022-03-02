/* Catch loding spinner */
const lodingSpinner=(condition)=>{
    document.getElementById("spinner").style.display=condition;
}

/* click Event hendler for search button*/
document.getElementById("search-btn").addEventListener("click",function(){
    lodingSpinner("block");
    const searchFeild = document.getElementById("search-feild");
    const searchFeildValue = searchFeild.value;
    if(searchFeildValue==""){
        alert("Please Write somthing !!")
        lodingSpinner("none");
        document.getElementById("notFound").style.display="block";
    }
    else{
        fetch(`https://openapi.programming-hero.com/api/phones?search=${searchFeildValue.toLowerCase()}`)
        .then((res)=>res.json())
        .then((data)=>displayPhoneInfo(data.data))
    }

}) 

/*append cards in container */
const displayPhoneInfo = (phones)=>{
    const container = document.getElementById("container");
    const showPhone = phones.slice(0,20);
    
    /* clear container */
    container.textContent="";

    showPhone.forEach(phone=>{
        const div = document.createElement("div");
        div.innerHTML=`
        <div class="col">
        <div class="card h-100 shadow stl">
        <img src="${phone.image}" class="card-img-top px-5 py-2 pt-4" alt="...">
        <div class="card-body">
          <h5 class="card-title">${phone.phone_name}</h5>
          <p>Brand: ${phone.brand}</p>
          </div>
          <button onclick="PhoneDetils('${phone.slug}')" class="btn btn-primary detils w-75 mx-auto mb-3" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Details</button>
        </div>
        </div>
        `
        container.appendChild(div);
    })

    
    /* not found area & condision*/
    if(container.textContent==""){
        seeAllBtn.style.display="none";
        const searchFeild = document.getElementById("search-feild");
        const searchFeildValue = searchFeild.value;
        const daynamic = document.getElementById("daynamic");
        daynamic.innerText=`${searchFeildValue}`
        document.getElementById("notFound").style.display="block";
    }
    else{
        document.getElementById("notFound").style.display="none";
        const seeAllBtn = document.getElementById("seeAllBtn");
        seeAllBtn.style.display="block";
    }
    lodingSpinner("none")
}

/* call phoneApi */
const PhoneDetils = (id)=>{
    fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    .then(res=>res.json())
    .then(data=>displayDetils(data))
}

/* display ditils in modal*/
const displayDetils = (phone)=>{
    const details = document.getElementById("details");
    details.textContent="";
    const title =document.getElementById("staticBackdropLabel");
    title.innerText=`${phone.data.name}`
    const div = document.createElement("div");

    /* releaseDate condition add */
    if(phone.data.releaseDate===""){
        phone.data.releaseDate="No release date found"
      }

    /* append details in modal */
    div.innerHTML=`
    <div class="">
    <div class='d-flex justify-content-center'>
    <img src="${phone.data.image}" alt="">
    </div>
    <div class="ms-4">
    <h6><span class="title">Brand:</span> ${phone.data.brand}</h6>
    <h5><span class="header-title">Main Features:-</span></h5>
    <h6><span class="title">ChipSet:</span> ${phone.data.mainFeatures.chipSet}</h6>
    <h6><span class="title">Display Size:</span> ${phone.data.mainFeatures.displaySize}</h6>
    <h6><span class="title">Storage:</span> ${phone.data.mainFeatures.storage}</h6>
    <h6><span class="title">Sensors:</span> ${phone.data.mainFeatures.sensors}</h6>
    <h5><span class="header-title">Others:-</span></h5>
    <h6><span class="title">Bluetooth:</span> <span class="otherTitle">${phone?.data?.others?.Bluetooth}</span></h6>
    <h6><span class="title">GPS:</span> <span class="otherTitle">${phone?.data?.others?.GPS}</span></h6>
    <h6><span class="title">Radio:</span> <span class="otherTitle">${phone?.data?.others?.Radio}</span></h6>
    <h6><span class="title">ReleaseDate:</span> ${phone.data.releaseDate}</h6>
    </div>
    </div>
      `
      details.appendChild(div);

      /* others information Error handel. */
      const titles = document.getElementsByClassName("otherTitle");
      for(const title of titles){
        if(phone?.data?.others == undefined){
            title.innerText="This feature does not exist";
        }
      }
}

/* call displayPhoneInfo for all phone */
document.getElementById("seeAllBtn").addEventListener("click",function(){
    document.getElementById("seeAllBtn").style.display="none";
    const searchFeild = document.getElementById("search-feild");
    const searchFeildValue = searchFeild.value;
    searchFeild.value="";
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchFeildValue.toLowerCase()}`)
    .then((res)=>res.json())
    .then((data)=>displayAllPhoneInfo(data.data))
})
const displayAllPhoneInfo = (phones)=>{
    const container = document.getElementById("container");
    const showPhone = phones.slice(20,phones.length);

    showPhone.forEach(phone=>{
        const div = document.createElement("div");
        div.innerHTML=`
        <div class="col">
        <div class="card h-100 shadow stl">
        <img src="${phone.image}" class="card-img-top px-5 py-2 pt-4" alt="...">
        <div class="card-body">
          <h5 class="card-title">${phone.phone_name}</h5>
          <p>Brand: ${phone.brand}</p>
          </div>
          <button onclick="PhoneDetils('${phone.slug}')" class="btn btn-primary detils w-75 mx-auto mb-3" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Details</button>
        </div>
        </div>
        `
        container.appendChild(div);
    })
}
