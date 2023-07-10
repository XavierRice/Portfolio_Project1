const test = console.log //i hate typing out console.log too many letters and I am my own developemnt team

    const options = {     // this api requires fullfilment of the options and this seems to be a cleaner method of doing it.
        method: 'GET',    
        headers: {
            'X-RapidAPI-Key': '95e39c8565mshd52d9d5c85d8b80p174bd5jsn5b0ef354524f',
            'X-RapidAPI-Host': 'horoscope34.p.rapidapi.com'
        }
    };

fetch('https://horoscope34.p.rapidapi.com/api/horoscope/signs', options)
    .then((response) => response.json())
    .then((JSONresponse) => {
        const results = JSONresponse.payload
        const signs = results.signs
       test(results.images)
    })
    .catch((err) => test(err))


