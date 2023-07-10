const test = console.log

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '95e39c8565mshd52d9d5c85d8b80p174bd5jsn5b0ef354524f',
            'X-RapidAPI-Host': 'horoscope34.p.rapidapi.com'
        }
    };

fetch('https://horoscope34.p.rapidapi.com/api/horoscope/today', options)
    .then((response) => response.json())
    .then((JSONresponse) => {
        const results = JSONresponse
        test(results.payload)
    })
    .catch((err) => test(err))


