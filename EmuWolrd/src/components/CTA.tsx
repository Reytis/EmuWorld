import { children } from "@/types"

type CTAProps = {
    children: children,
    selected?: boolean,
    noBorder?: boolean,
    onClick?: () => void
}

export const CTA = ({children, selected, noBorder, onClick}: CTAProps) => {

    return <button onClick={onClick} className={`cta ${selected ? 'selected' : ''} ${noBorder ? 'noBorder' : ''}`}>{children}</button>
}