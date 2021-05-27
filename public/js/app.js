const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const m1 = document.querySelector('#m1')
const m2 = document.querySelector('#m2')

weatherForm.addEventListener('submit', (e) => { 
    e.preventDefault()

    const location = search.value;
    m1.textContent = 'Loading...'

    fetch('/weather?address=' + encodeURI(location)).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                m2.textContent = ''
                return m1.textContent = data.error
            }
            m1.textContent = (data.location)
            m2.textContent = (data.forecast)
        })
    })


    console.log(location)
})