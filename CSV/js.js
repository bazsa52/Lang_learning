function load() {
    // initialize request
    let request = new XMLHttpRequest()

    // set-up request
    request.open("GET", "data.csv", true)

    // set-up request handler
    request.onreadystatechange = () => {
        if (request.readyState == request.DONE && request.status == 200) {
            // get the data as plaintext
            let data = request.responseText.trimEnd()

            // console.info(data)
            // document.getElementById("res").innerHTML = data

            // split data
            // let splitted = data.replaceAll("\n", "<br>")

            // document.getElementById("res").innerHTML = splitted

            // split data by new lines
            //let splitted = data.split("\n")
            // make the first row UPPERCASE
            //splitted[0] = splitted[0].toUpperCase()
            // join the elements in the array with <br>
            //document.getElementById("res").innerHTML = splitted.join("<br>")

            // make every line UPPERCASE
            let splitted = data.split("\n")
            splitted[0] = splitted[0].toUpperCase()

            // create a new table element
            let table = document.createElement("table")

            splitted.forEach(x => {
                // create a new table-row
                let row = document.createElement("tr")

                x.split(";").forEach(y => {
                    row.innerHTML += `<td>${y}</td>`
                })

                table.appendChild(row)
            })

            // append the created table element to the DOM
            document.getElementById("res").appendChild(table)
        }
    }

    //send the request
    request.send()
}
