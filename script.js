let center = document.querySelector(".center")
let first = document.querySelector(".first")
let nameInput = document.querySelector("#name")
let second = document.querySelector(".second")

function generate(key, value) {
    let keyDiv = document.createElement("Div")
    keyDiv.classList.add("key")
    keyDiv.innerHTML = key

    let valueDiv = document.createElement("Div")
    valueDiv.classList.add("value")

    
    if (key === "flag") {
        let img = document.createElement("img")
        img.src = value
        valueDiv.appendChild(img)

    }
    else if (key === "maps") {
        let a = document.createElement("a")
        a.href = value
        a.innerHTML = "Click Here to Open google Map"
        valueDiv.appendChild(a)
    }
    else {
        valueDiv.innerHTML = value
    }


    let itemsDiv = document.createElement("Div")
    itemsDiv.classList.add("items")
    itemsDiv.appendChild(keyDiv)
    itemsDiv.appendChild(valueDiv)
    second.appendChild(itemsDiv)
}
function getAPIData() {
  

    let country = nameInput.value.trim()

    if (!country) return


    let request = new XMLHttpRequest()
    request.open("get", "https://restcountries.com/v3.1/name/" + country)
    request.send()


    request.addEventListener("load", () => {
        let data = JSON.parse(request.responseText)
        center.removeChild(second)
        second = document.createElement("Div")
        second.classList.add("second")
        center.appendChild(second)

        data.forEach(x => {
            generate("name", x.name.official)
            generate("capital", x.capital)
            generate("currencies",  Object.values(Object.values(x.currencies)[0]))
            generate("flag", x.flags.png)
            // generate("area", x.area)
            generate("area", x.area.toLocaleString() + " km²")
            generate("population",x.population)
            generate("region", x.region)
            generate("subregion", x.subregion)
            generate("continents", x.continents)
            generate("timezones", x.timezones)
            generate("landlocked", x.landlocked)
            generate("independent", x.independent)
            generate("unMember", x.unMember)
            generate("maps", x.maps.googleMaps)
            generate("languages", Object.values(x.languages))
            // generate("states",x.states)

        });
    })
}
getAPIData()
  