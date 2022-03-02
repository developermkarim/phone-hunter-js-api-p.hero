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
          <button onclick="PhoneDetils('${per_phone.slug}')" class="btn btn-primary detils w-75 mx-auto mb-3" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Details</button>
        </div>
        </div>

       `
       container.appendChild(main_div)
    });

}

