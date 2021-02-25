console.log('Client side js')

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })




const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')

// message1.textContent = 'From JS'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value 

    const url = '/weather?address=' + location

    if(location != undefined)
    {
        message1.textContent = 'loading . . . '
        message2.textContent = ''

        fetch(url).then((response) => {
            response.json().then((data) => {
                if(data.error)
                {
                    message1.textContent = data.error
                }
                else 
                {
                    message1.textContent = data.location 
                    message2.textContent = data.forecast
                }
            })
        })
    }
})
