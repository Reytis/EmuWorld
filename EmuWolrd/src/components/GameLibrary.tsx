import { FilterBar } from "./FilterBar"
import { GameCell } from "./GameCell"

export const GameLibrary = () => {

    return <div className="game_library">
        <FilterBar />
        <div className="game_container">
            <button className="game_cell"><GameCell gameName={"Game Name"} /></button>
        </div>
    </div>
}