const test = console.log //i hate typing out console.log too many letters and I am my own developemnt team

const options = {     // this api requires fullfilment of the options and this seems to be a cleaner method of doing it.
    method: 'GET',    // These are one of the 5 http verbs GET, POST, PUT, DELETE and PATCH
    headers: {
        'X-RapidAPI-Key': '95e39c8565mshd52d9d5c85d8b80p174bd5jsn5b0ef354524f',  // these are headers req. by Rapid API
        'X-RapidAPI-Host': 'horoscope34.p.rapidapi.com'
    }
};

fetch('https://horoscope34.p.rapidapi.com/api/horoscope/signs', options)  // fetches take two arguements, though with only one it automatially "GETS", the second argument is options that takes in a method and headers.
    .then((response) => response.json())            // This has to do with a "promise" made by the fetch statement and formatting that into JSON data.
    .then((JSONresponse) => {
        const results = JSONresponse.payload         // The returned results which is now an object/
        const signs = results.signs
        const images = results.images

        const col2 = document.getElementById("sign_image")    //using the DOM to access my col
        const select = document.querySelector("select")       // and my select


        for (let sign of signs) {                                 //looping through my images gathered in my fetch
            const option = document.createElement("option")
            option.classList.add("options")

            const sign_image = document.createElement("img")
            sign_image.classList.add("signs")
            let picture = images[sign]
            sign_image.setAttribute("src", picture)
            col2.appendChild(sign_image)

            option.setAttribute("value", `${sign}`)       //i thought this was fun, just making my selects instead of typing them out. 
            option.textContent = `${sign}`
            select.append(option)
        }
    })
    .catch((err) => test(err))

const options1 = {                                      //you can do only one request per fetch so i had to make several fetches requiring diffrent Keys and hosts
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '95e39c8565mshd52d9d5c85d8b80p174bd5jsn5b0ef354524f',
        'X-RapidAPI-Host': 'horoscope34.p.rapidapi.com'
    }
}

const errFlag = document.getElementById("errFlag")          //i hard coded a place for my errFlag, my results and my simple form
const resultsCol = document.getElementById("results")
const form = document.querySelector("form")

form.addEventListener("submit", (event) => {
    event.preventDefault();                             // i can hear sam now- "EVENT DOT PREVENT"
    setTimeout(() => resultsCol.innerHTML = "", 6000)

    let userSign = event.target["signs"].value          //storing the vaule of the sign the user selected so i can access it later in another fetch.
    let userDate = event.target["date"].value         // ** I don't know if I'll have this working by the time i turn it in, but you will be able to look up the horoscope for any day once finished. I'm having trouble fetching two different things in the same event listner.

    if (userSign === "???") {                         // if you sumbit the form w/out selecting a sign an err message pop's up
        errFlag.innerHTML = "<h4><Strong>Must Enter Sign</Strong></h4>"
        errFlag.style.color = "orange"
        form.reset()                                //then resetting the form and err flag so it doesn't stay on screen.
        setTimeout(() => errFlag.innerHTML = "", 1000)
    }

    fetch('https://horoscope34.p.rapidapi.com/api/horoscope/today', options1)
        .then((response) => response.json())
        .then((JSONresponse) => {
            const results = JSONresponse.payload
            test(results[`${userSign}`])

        })
        .catch((err) => test(err))


    const options2 = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '95e39c8565mshd52d9d5c85d8b80p174bd5jsn5b0ef354524f',
            'X-RapidAPI-Host': 'horoscope34.p.rapidapi.com'
        }
    };


    fetch(`https://horoscope34.p.rapidapi.com/api/horoscope/byDate?date=${userDate}`, options2)
        .then((response) => response.json())
        .then((JSONresponse) => {
            const results = JSONresponse.payload
            resultsCard(results[userSign])
        })
        .catch((err) => test(err))

})


function resultsCard(string) {                               // making cards to display my information. As i grow this project, i'd like to add another image to the card and maybe include another api that draws tarot cards for you.

    const resultCard = document.createElement("div")       //there is ingrown functionaility using classes on BOOTSTRAP, as they say im "strapped in".
    resultCard.classList.add("card")

    const h3Title = document.createElement("h3")
    h3Title.classList.add("HoroLabel")
    h3Title.innerText = 'Your Daily Horoscope:'
    h3Title.style.color = "blue"

    //  const h2Header = document.createElement("h2")     // I wanted to add my user sign to the top of my header results card, but as of send in time it's giving me issues. This feature is an after thought and not part of my MVP
    // h2Header.innerText = userSign

    const pHoroscope = document.createElement("p")
    pHoroscope.innerHTML = `${string}`
    pHoroscope.style.color = "purple"

    if (pHoroscope.innerHTML === undefined) {
        pHoroscope.innerHTML = "<strong><em>You have broken either the past, present and future.Try again!</em></strong>"
    }

    resultCard.append(pHoroscope)
    // resultCard.appendChild(h2Header)           // when i add this in it doesn't appear at the top of the screen for some reason.
    resultCard.appendChild(h3Title)
    resultsCol.append(resultCard)

    const advice = document.getElementById("advice")

    fetch("https://api.adviceslip.com/advice")
        .then((response) => response.json())
        .then((JSONresponse) => {
            const results = JSONresponse

            const h6Advice = document.createElement("h6")
            h6Advice.innerHTML = results.slip.advice
            h6Advice.style.textAlign = "center"
            h6Advice.classList.add("fs-4")       //adding this class list for bootstrap adds the border and dimension. 
            h6Advice.style.color = "red"
            advice.append(h6Advice)
        })


}

function resetStuff() {
    errFlag.innerHTML = "";
    form.reset();
    resultsCol.innerHTML = "";
}