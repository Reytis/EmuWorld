import { Console } from "@/components/Console"
import { GameLibrary } from "@/components/GameLibrary"
import { Warning } from "@/Icons"


export const Library = () => {

    return <div className="library page">
        <h1>My Device :</h1>
        <p className="warning"><Warning /> Not Added Yet</p>
        {/* <div className="console_container_library">
            <Console name='Nintendo Switch' pictures='Switch' />
            <Console name='3DS' pictures='3DS' />
            <Console name='Wii' pictures='Wii' />
            <Console name='Nintendo DS' pictures='DS' />
        </div> */}
        <h1>My Games :</h1>
        <GameLibrary />
    </div>
}