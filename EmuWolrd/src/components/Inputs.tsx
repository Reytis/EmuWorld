import { ChevronDown, Search } from "@/Icons"
import { children } from "@/types"
import { ReactElement, useEffect, useRef, useState } from "react"

type FilterInputProps = {
    options: string[],
    type: string,
    onSelectionCHange: Function
}
export const FilterInput = ({options, type, onSelectionCHange}: FilterInputProps) => {
    const [showOpt, setShowOpt] = useState(false)
    const [selectedOptions, setSelectedOptions] = useState<boolean[]>(Array(options.length).fill(false));
    const containerRef = useRef<HTMLDivElement>(null);

    const handleOptionClick = (index: number) => {
        const newSelectedOptions = [...selectedOptions];
        newSelectedOptions[index] = !newSelectedOptions[index];
        setSelectedOptions(newSelectedOptions);
        
        let opt:string[] = []
        for (let i = 0; i < options.length; i++) {
            newSelectedOptions[i] === true ?
            opt = [options[i], ...opt] :
            opt = opt 
        }
        onSelectionCHange(opt)
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setShowOpt(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
          document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return <div className="selector" ref={containerRef}>
        <div className={`selector_name ${showOpt ? "selected" : ''}`} onClick={() => setShowOpt(!showOpt)}>
            <p>{type}</p>
            <ChevronDown />
        </div>
        {showOpt && <div className="selector_options">
            {options.map((opt, index) => (
                <FilterOption key={index} selected={selectedOptions[index]} onClick={() => handleOptionClick(index)}>{opt}</FilterOption>
            ))}
        </div>}
    </div>
}

type optionsProps = {
    children: children,
    selected: boolean,
    onClick: () => void
}
export const FilterOption = ({children, selected, onClick}: optionsProps) => {

    return <div className={`option ${selected ? 'selected' : ''}`} onClick={onClick}>
        {children}
    </div>
}

type checkboxProps = {
    label: string
}
export const Checkbox = ({label}: checkboxProps) => {
    const [checked, setChecked] = useState(false)

    return <div className="checkbox" onClick={() => setChecked(!checked)}>
        <label>{label}</label>
        <input type="checkbox" checked={checked} onChange={() => {console.log("checked update")}} />
    </div>
}

type textInputProps = {
    children: children,
    placeHolder: string,
    label?: string
}
export const TextInput = ({children, placeHolder, label}: textInputProps) => {

    return <div>
        {label && <label>{label}</label>}
        <div className="text_input">
            <input type="text" className="input_text" placeholder={placeHolder} />
            {children}
        </div>
    </div>
}   

type SwitchProps = {
    options: ReactElement[],
    current: number,
    onClick: Function
}
export const Switch = ({options, current, onClick}: SwitchProps) => {
    const [selected, setSelected] = useState(current)

    const handleClick = (o: ReactElement) => {
        setSelected(options.indexOf(o))
        onClick(options.indexOf(o))
    }

    return <div className="switch">
        {options.map((o) => <div className={`switch_options ${o === options[selected] ? "selected" : ""}`} onClick={() => handleClick(o)}>{o}</div>)}
    </div>
}

type ListOptButtonProps = {
    options: ReactElement,
    onClick: Function,
    onClickAsync?: () => Promise<void>
}
export const ListOptButton = ({options, onClick, onClickAsync}: ListOptButtonProps) => {
    return <div className="list_opt_button" onClick={onClickAsync ? onClickAsync : onClick()}>{options}</div>
}

export const Opener = () => {

    return <input type="file" /> 
}