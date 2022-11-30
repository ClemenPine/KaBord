import {colormap} from './consts.mjs'

let dragged = null
let shiftX = 0
let shiftY = 0

window.onload = function()
{
    document.addEventListener("mousemove", mousemove)
    document.addEventListener("mouseup", mouseup)

    const keys = "" +
    "AOEUIY BP  J," +
    "           X." +
    "HT  L  CG VZ'" +
    "SRN DM WF KQ;"

    const grid = document.getElementById("grid")

    for (let row=0; row < 8; row++)
    {
        for (let col=0; col < 13; col++)
        {
            const i = row * 13 + col

            const cell = document.createElement("div")
            cell.className = "center"
            
            if (
                (row > 3) ||
                (row != 3) &&
                (col != 5) &&
                (col != 11)
            ) {
                const point = document.createElement("div")
                point.className = "point"

                cell.className += " cell"
                cell.appendChild(point)
            }

            if (i > 51)
            {
                const letter = keys[i - 52]
                const key = document.createElement("div")
                key.className = "key center"

                key.addEventListener("mousedown", mousedown)

                switch (colormap[letter])
                {
                    case 1:
                        key.className += ' higher'
                        break
                    case 2:
                        key.className += ' high'
                        break
                    case 3:
                        key.className += ' mid'
                        break
                    case 4:
                        key.className += ' low'
                        break
                    case 5:
                        key.className += ' lower'
                        break
                }
                
                if (letter && letter != ' ')
                {
                    key.innerHTML = letter
                    cell.appendChild(key)
                }
                
            }

            grid.appendChild(cell)
        }
    }
}

function mousedown(event)
{
    const key = event.target
    key.style.zIndex = "2"

    dragged = key
    shiftX = event.clientX - key.getBoundingClientRect().left;
    shiftY = event.clientY - key.getBoundingClientRect().top;
}

function mousemove(event)
{
    if (!dragged)
    {
        return
    }

    const x = event.clientX - shiftX
    const y = event.clientY - shiftY

    dragged.style.left = `${x}px`
    dragged.style.top = `${y}px`
}

function mouseup(event)
{
    if (!dragged)
    {
        return
    }

    const elements = document.elementsFromPoint(event.clientX, event.clientY)
    for (const element of elements)
    {
        if (element.classList.contains("cell"))
        {
            element.appendChild(dragged)
        }
    }

    dragged.style.zIndex = "1"
    dragged.style.left = ""
    dragged.style.top = ""

    dragged = null
}