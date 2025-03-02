function generate(n, m) {
    let str = `Az elso ${n} darab, 1-től induló, ${m} különbséggel vett szám természetes logaritmusának értékei:<br><ul>`

    for (let i = 0; i < n; ++i) {
        if (i == 0) {
            str += `<li>${Math.log(1).toFixed(4)}</li>`
        } else {
            str += `<li>${Math.log((i * m + 1)).toFixed(4)}</li>`
        }
    }

    str += "</ul>"

    return str
}

module.exports = { generate }
