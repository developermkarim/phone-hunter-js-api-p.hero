// Loading Spinner
const loading_spinner = (spinner_style)=>{
    const spinner = document.getElementById('spinner');
 spinner.style.display  = spinner_style;
}

// Click Handler For Search Button
const handler_btn = () =>{
    loading_spinner('block');
    const searchInput = document.getElementById('search-feild');
    const searchInputValue = searchInput.value;
    
    if(searchInputValue == ""){
        document.getElementById('warning-text').innerText = 'Please Write somthing !!';
        loading_spinner('none');
        document.getElementById("notFound").style.display="block";
    }
    else{
        fetch(`https://openapi.programming-hero.com/api/phones?search=${searchInputValue}`)
        .then(res => res.json())
        .then(data => display_all_mobile(data.data))
    }
}
const display_all_mobile = (phones) =>{
    // console.log(phones);
    const container = document.getElementById("container");
    const showPhoneContent = phones.slice(0,20);
    
    showPhoneContent.forEach(per_phone => {
       // console.log(per_phone);
       const main_div = document.createElement('div');
       main_div.innerHTML = `
       
       <div class="col">
        <div class="card h-100 shadow stl">
        <img src="${per_phone.image}" class="card-img-top px-5 py-2 pt-4" alt="...">
        <div class="card-body">
          <h5 class="card-title">${per_phone.phone_name}</h5>
          <p>Brand: ${per_phone.brand}</p>
          </div>
          <button onclick="phoneDetails('${per_phone.slug}')" class="btn btn-primary detils w-75 mx-auto mb-3" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Details</button>
        </div>
        </div>

       `
       container.appendChild(main_div)
    });

    // Not mobile Found Area & condision
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

    loading_spinner("none")

}


// call Phone API
const phoneDetails = () =>{
    fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    .then(res => res.json())
    .then(data => display_phone_detail(data))
}

const display_phone_detail = (phone) =>{
    const details = document.getElementById("details");
    details.textContent="";
    const title =document.getElementById("staticBackdropLabel");
    title.innerText=`${phone.data.name}`

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
