
interface consoleProps {
    name: string,
    pictures: string
}

export const Console = ({name, pictures}: consoleProps) => {

    return <button className="console">
        <img src={`console/${pictures}.png`} alt={name + " picture"} />
        <h2>{name}</h2>
    </button>
}