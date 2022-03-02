// phone searching function by input and button
const phone_search = (searchText) =>{
    let searchInput = document.getElementById('search').value;
     searchInput = searchText;
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchInput}`)
    .then(res => res.json())
    .then(data => Display_searchText(data.data))
}
phone_search('phone')

const Display_searchText= (search_all_phone) =>{
console.log(search_all_phone);

}