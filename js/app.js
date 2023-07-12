const loadPhone = async (input, dataLimit) => {
    const API = `https://openapi.programming-hero.com/api/phones?search=${input}`
    const res = await fetch(API)
    const data = await res.json()
    if (data.status == true) {
        displayPhone(data.data, dataLimit);
    } else {
        const phoneContainer = document.getElementById('phone-container').innerHTML = `<h2 class="text-center"> Data Not Found </h2>`
        toggleSpinner(false)
    }
}

const displayPhone = (phones, dataLimit) => {
    // console.log(data);
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.innerHTML = ''

    if (dataLimit && phones.length > 6) {
        phones = phones.splice(0, 6)
        const showAll = document.getElementById('showAll');
        showAll.classList.remove('d-none')
    } else {
        showAll.classList.add('d-none')
        document.getElementById('inputValue').value = ''

    }


    for (const phone of phones) {
        // console.log(phone);
        const div = document.createElement('div')
        div.innerHTML =
            `
        <div class="col">
            <div class="card p-4">
                <img src="${phone.image}" style="height:250px" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title"> ${phone.phone_name} </h5>
                    <p class="card-text">This is a longer card with supporting text below as a natural lead-into additional content. This content is a little bit longer.</p>
                    
                    <button onclick="phoneDetails('${phone.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Phone Details</button>
                </div>
            </div>
        </div>
        `
        phoneContainer.appendChild(div)

    }
    toggleSpinner(false)

}

const processSearch = (dataLimit) => {
    toggleSpinner(true)
    const inputValue = document.getElementById('inputValue').value;
    loadPhone(inputValue, dataLimit)
}

const searchPhone = () => {
    processSearch(6)

}

document.getElementById('inputValue').addEventListener('keypress', (e) => {
    if (e.key == 'Enter') {
        processSearch(6)
        document.getElementById('inputValue').value = ''
    }
})


const toggleSpinner = (isLoader) => {
    const loadingSection = document.getElementById('loader')
    if (isLoader) {
        loadingSection.classList.remove('d-none')
    } else {
        loadingSection.classList.add('d-none')
        document.getElementById('inputValue').value = ''
    }
}

document.getElementById('showAllBtn').addEventListener('click', () => {
    processSearch()
    document.getElementById('inputValue').value = ''

})


const phoneDetails = async (slug) => {
    // console.log(slug);

    const API = `https://openapi.programming-hero.com/api/phone/${slug}`
    const res = await fetch(API)
    const data = await res.json()
    displayPhoneDetails(data.data);
}

const displayPhoneDetails = (phoneDetails) => {
    // console.log(phoneDetails.name);
    document.getElementById('phoneDeatils').innerText = phoneDetails.name
}

loadPhone('phone')

