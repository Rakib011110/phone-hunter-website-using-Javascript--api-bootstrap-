const loadPhone = async (search) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${search}`
    const res = await fetch(url)
    const data = await res.json()

    displayePhone(data.data);


}


const displayePhone = phones => {

    const phoneContainer = document.getElementById('phone-container')

    phoneContainer.innerHTML = ''

    phones = phones.slice(0, 10)
    console.log(phones);
    phones.forEach(phone => {

        const div = document.createElement('div')
        div.classList.add('col')
        div.innerHTML = ` 

<div class="card">
<img src="${phone.image}" class="card-img-top mx-auto p-2 w-75"   alt="..." />
<div class="card-body">
  <h5 class="card-title">${phone.phone_name} </h5>
  <p class="card-text">
    ${phone.slug}
  </p>
</div>
</div>
`
        phoneContainer.appendChild(div)

    })


}




document.getElementById('btn-search').addEventListener('click', function () {

    const phoneValue = document.getElementById('phoneValue').value
    console.log(phoneValue);
    loadPhone(phoneValue)

})




loadPhone('iphone')

