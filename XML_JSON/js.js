function load_xml() {
    // Create a new request
    let req = new XMLHttpRequest()
    // Set the method and endpoint
    req.open("GET", "plant_catalog.xml", true)

    // register callback
    req.onreadystatechange = () => {
        // if done and ok
        if (req.readyState == req.DONE && req.status == 200) {
            // Get the response as XML
            /**@type {Document}! */
            let data = req.responseXML

            let plants = data.getElementsByTagName("LIGHT")

            let light_data = new Array()

            for (let i = 0; i < plants.length; ++i) {
                /**@type {string} */
                let text = plants[i].childNodes[0].data.toLowerCase()

                if (!light_data.includes(text)) {
                    light_data.push(text)
                }
            }

            light_data = light_data.sort()

            document.getElementById("res_xml").innerText = light_data.join(", ")

            let min = 9999999
            let max = 0
            let avg = 0.0

            let prices = data.getElementsByTagName("PRICE")

            //console.log(prices[0].childNodes[0].data)

            for (let i = 0; i < prices.length; ++i) {
                let p = +prices[i].childNodes[0].data.replace("$", "")

                if (p < min) {
                    min = p
                }

                if (max < p) {
                    max = p
                }

                avg += p
            }

            avg /= prices.length

            document.getElementById("res_xml_2").innerHTML = `Minimum ár: ${min.toFixed(2)} USD<br>Maximum ár: ${max.toFixed(2)} USD<br>Átlag ár: ${avg.toFixed(2)} USD`

        }
    }

    req.send()

}

function load_json() {
    // init GET to API Endpoint
    fetch("all.json")
        // get json
        .then(x => x.json())
        // process data
        .then(x => {
            document.getElementById("res_json").innerHTML = ""
            let ul = document.createElement("ul")
            let search = document.getElementById("day").value
            for (let i = 0; i < x.length; ++i) {
                if (search == "") {
                    ul.innerHTML += `<li>${x[i]["translations"]["hun"]["common"]}</li>`
                } else {
                    if (x[i]["startOfWeek"] == search) {
                        ul.innerHTML += `<li>${x[i]["translations"]["hun"]["common"]}</li>`
                    }
                }

            }
            document.getElementById("res_json").appendChild(ul)
        })


}
