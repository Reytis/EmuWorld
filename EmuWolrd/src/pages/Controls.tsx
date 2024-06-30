import { Console } from "@/components/Console"


export const Controls = () => {

    return <div className="controls page">
        <h1>Choose wich device to configure</h1>
        <div className="console_flexcenter">
            <div className="console_container">
                <Console name='Nintendo Switch' pictures='Switch' />
                <Console name='3DS' pictures='3DS' />
                <Console name='Wii' pictures='Wii' />
                <Console name='Nintendo DS' pictures='DS' />
            </div>
        </div>  
    </div>

}