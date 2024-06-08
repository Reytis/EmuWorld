import { children } from "@/types"

type CTAProps = {
    children: children,
    selected?: boolean,
    noBorder?: boolean
}

export const CTA = ({children, selected, noBorder}: CTAProps) => {

    return <button className={`cta ${selected ? 'selected' : ''} ${noBorder ? 'noBorder' : ''}`}>{children}</button>
}