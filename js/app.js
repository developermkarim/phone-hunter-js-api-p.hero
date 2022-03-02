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
    console.log(phones);
}