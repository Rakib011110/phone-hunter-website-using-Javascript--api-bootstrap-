const loadPhone = async (search, datalimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${search}`
    const res = await fetch(url)
    const data = await res.json()

    displayePhone(data.data, datalimit);


}


const displayePhone = (phones, datalimit) => {

    const phoneContainer = document.getElementById('phone-container')

    phoneContainer.innerHTML = ''

    //  slice only 10 phone
    // phones = phones.slice(0, 10)
    const shoAll = document.getElementById('showAll')

    if (datalimit && phones.length > 10) {
        phones = phones.slice(0, 10)

        shoAll.classList.remove('d-none')
    }
    else {
        shoAll.classList.add('d-none')
    }

    console.log(phones);

    //  display now phone found 

    const noPhone = document.getElementById('noPhoneMassage')
    if (phones.length === 0) {
        noPhone.classList.remove('d-none')
    }

    else {

        noPhone.classList.add('d-none')

    }



    // display all phone  
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
  <div>
  
  <button  onclick='LoadPhoneDetails("${phone.slug}")' ahref="#"  
  
  type="button"
  class="btn btn-primary"
  data-bs-toggle="modal"
  data-bs-target="#phoneDetailsModal"
  
  >Show Details </button>

  
  </div>
</div>
</div>
`
        phoneContainer.appendChild(div)

    })


    //  stopt loader
    togleSinner(false)

}


// search btn
document.getElementById('btn-search').addEventListener('click', function () {


    //  start loading 
    togleSinner(true)
    // const phoneValue = document.getElementById('phoneValue').value
    // console.log(phoneValue);
    // loadPhone(phoneValue)

    procesSearch(10)


})

// search input inter keyHander 


document.getElementById('phoneValue').addEventListener('keypress', function (event) {
    if (event.key === "Enter") {
        procesSearch(10)
    }

})




const togleSinner = isloading => {
    const loadSection = document.getElementById('loader')
    if (isloading == true) {
        loadSection.classList.remove('d-none')

    }
    else {
        loadSection.classList.add('d-none')

    }
}


const procesSearch = (datalimit) => {
    togleSinner(true)

    const phoneValue = document.getElementById('phoneValue').value
    console.log(phoneValue);
    loadPhone(phoneValue, datalimit)

}

//  not the best way to 

document.getElementById('btn-ShowAll').addEventListener('click', function () {
    procesSearch()

})




const LoadPhoneDetails = async (id) => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    const res = await fetch(url)
    const data = await res.json()
    displayPhoneDetails(data.data);

}


const displayPhoneDetails = phone => {
    console.log(phone);
    const modalTitle = document.getElementById('phoneDetailsModalLabel');
    modalTitle.innerText = phone.name;
    const phoneDetails = document.getElementById('phone-details');
    // console.log(phone.mainFeatures.sensors[0]);
    phoneDetails.innerHTML = `
    <p>Release Date: ${phone.releaseDate ? phone.releaseDate : 'No Release Date Found'}</p>
    <p>Storage: ${phone.mainFeatures ? phone.mainFeatures.storage : 'No Storage Information '}</p>
    <p>Others: ${phone.others ? phone.others.Bluetooth : 'No Bluetooth Information'}</p>
    <p>Sensor: ${phone.mainFeatures.sensors ? phone.mainFeatures.sensors[0] : 'no sensor'}</p>
    `
}



loadPhone('iphone')

