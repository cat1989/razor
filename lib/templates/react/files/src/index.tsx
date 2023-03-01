import React from 'react'
import { createRoot } from 'react-dom/client'

const root = document.createElement("div")
document.body.appendChild(root)

createRoot(root).render(
    <div>Hello world!</div>,
)
