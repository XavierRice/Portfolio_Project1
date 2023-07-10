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
        const images = results.images

        const col2 = document.getElementById("sign_image")
        const select = document.querySelector("select")
        
        for(let sign of signs){
            const option = document.createElement("option")
            option.classList.add("options")

            const sign_image = document.createElement("img")
            sign_image.classList.add("signs")
            let picture = images[sign] 
            sign_image.setAttribute("src", picture)
            col2.appendChild(sign_image)

            option.setAttribute("value", `${sign}` )
            option.textContent = `${sign}`
            select.append(option)
        }
    })
    .catch((err) => test(err))

    const options1 = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '95e39c8565mshd52d9d5c85d8b80p174bd5jsn5b0ef354524f',
            'X-RapidAPI-Host': 'horoscope34.p.rapidapi.com'
        }
    }



    const form = document.querySelector("form")
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        let userSign = event.target["signs"].value
        let userDob = event.target["date"].value
        
    })


    fetch('https://horoscope34.p.rapidapi.com/api/horoscope/today', options1)
    .then((response) => response.json())
    .then((JSONresponse) =>{
        const results = JSONresponse.payload //
        test(results)

    })