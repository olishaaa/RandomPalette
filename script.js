const cols = document.querySelectorAll('.col')

document.addEventListener('keydown', event => {
    event.preventDefault()
    if (event.code.toLocaleLowerCase() === 'space'){
        setRandomColors()
    }

})

document.addEventListener('click', event => {
    const type = event.target.dataset.type

    if(type === 'lock') {
        const node = event.target.tagName.toLowerCase() === 'i'
         ? event.target
         : event.target.children[0]

        node.classList.toggle('fa-lock-open')
        node.classList.toggle('fa-lock')
    } else if (type === 'copy') {
        copyToClickboard(event.target.textContent)
    }
})

function generateRandomColor() {
    // RGB 
    //#FF0000
    //#00FF00
    //#0000FF

    const hexCodes = '0123456789ABCDEF'
    let color = ''
    for (let i = 0; i < 6; i++) {
        color += hexCodes[Math.floor(Math.random() * hexCodes.length)]
    }
    return '#' + color
}

function copyToClickboard(text) {
    return navigator.clipboard.writeText(text)
}

function setRandomColors() {
    const colors = []
    cols.forEach((col) => {
        const isLocked = col.querySelector('i').classList.contains('fa-lock')
        console.log(col)
        const text = col.querySelector('h2')
        const color = chroma.random()
        const icon = col.querySelector('button')

        if (isLocked) {
            colors.push(text.textContent)
            return
        }

        colors.push(color)

        text.textContent = color
        col.style.background = color

        setTextColor(text, color)
        setTextColor(icon, color)
    })

    updateColorsHash(colors)
}

function setTextColor(text, color) {
    const luminance = chroma(color).luminance()
    text.style.color = luminance > 0.5 ? 'black' : 'white'
}

function updateColorsHash(colors = []) {
    document.location.hash = colors
    .map((col) => {
        return col.toString().substring(1)
    }).join('-')
}

function getColorsFromHash() {
    if (document.location.hash.length > 1) {
        return document.location.hash
            .substring(1)
            .split('-')
            .map((color) => '#' + color)
    }
    return[]
}

setRandomColors();
