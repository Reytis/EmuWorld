import { BookShelf, Cross, Home, Manette, Settings } from "@/Icons"
import { CTA } from "./CTA"
import { useState } from "react"

export const Menu = () => {
    const [isOpen, setOpen] = useState(false)
    const [selected, setSelected] = useState(0)

    return <ul className="menu" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
        <li><CTA noBorder onClick={() => setSelected(0)} selected={selected === 0 ? true : false}><Home /> {isOpen ? 'Home' : ''}</CTA></li>
        <li><CTA noBorder onClick={() => setSelected(1)} selected={selected === 1 ? true : false}><Manette /> {isOpen ? 'Controls' : ''}</CTA></li>
        <li><CTA noBorder onClick={() => setSelected(2)} selected={selected === 2 ? true : false}><BookShelf /> {isOpen ? 'Library' : ''}</CTA></li>
        <li><CTA noBorder onClick={() => setSelected(3)} selected={selected === 3 ? true : false}><Cross /> {isOpen ? 'Add' : ''}</CTA></li>
        <li><CTA noBorder onClick={() => setSelected(4)} selected={selected === 4 ? true : false}><Settings /> {isOpen ? 'Settings' : ''}</CTA></li>
    </ul>
}