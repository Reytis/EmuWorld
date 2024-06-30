import { BookShelf, Cross, Home, Manette, Settings } from "@/Icons"
import { CTA } from "./CTA"
import { useState } from "react"

type menuProps = {
    current: number,
    changeCurrent: (n:number) => void
}

export const Menu = ({current, changeCurrent}: menuProps) => {
    const [isOpen, setOpen] = useState(false)

    return <ul className="menu" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
        <li><CTA noBorder onClick={() => changeCurrent(0)} selected={current === 0}><Home /> {isOpen ? 'Home' : ''}</CTA></li>
        <li><CTA noBorder onClick={() => changeCurrent(1)} selected={current === 1}><Manette /> {isOpen ? 'Controls' : ''}</CTA></li>
        <li><CTA noBorder onClick={() => changeCurrent(2)} selected={current === 2}><BookShelf /> {isOpen ? 'Library' : ''}</CTA></li>
        <li><CTA noBorder onClick={() => changeCurrent(3)} selected={current === 3}><Cross /> {isOpen ? 'Add' : ''}</CTA></li>
        <li><CTA noBorder onClick={() => changeCurrent(4)} selected={current === 4}><Settings /> {isOpen ? 'Settings' : ''}</CTA></li>
    </ul>
}