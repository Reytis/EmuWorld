import { Cross, Img, Remove, Reset } from "@/Icons"
import { CTA } from "./CTA"
import { GameCell, GameCellList } from "./GameCell"
import { TextInput } from "./Inputs"

export const GameEditor = () => {

    return <div className="game_editor">
        <div className="editions">
            <h3>Edit</h3>
            <CTA><Img />Choose IMG</CTA>
            <TextInput children={""} placeHolder={"Name"} label="Game Name"/>
            <TextInput placeHolder={"Editors"} label="Editors"><CTA><Cross /></CTA></TextInput>
            <TextInput placeHolder={"Genres"} label="Genres"><CTA><Cross /></CTA></TextInput>
            <div className="editions_note_years">
                <TextInput children={""} placeHolder={"Note"} label="Note"/>
                <TextInput children={""} placeHolder={"Years"} label="Years"/>
            </div>
            <CTA>Save Game Datas</CTA>
        </div>
        <div className="preview">
            <h3>Preview</h3>
            <button className="game_cell_list"><GameCellList gameName={"La Merde A Michel"} /></button>
            <div className="container_preview">
                <div className="game_cell_container">
                    <button className="game_cell"><GameCell gameName={"La Merde A Michel"} /></button>                
                </div>
                <div className="multiple_data">
                    <div className="editor">
                        <CTA>Editors <Reset /></CTA>
                        <ul>
                            <li>Marcorp. <CTA><Remove /></CTA></li>
                            <li>Nintendeux <CTA><Remove /></CTA></li>
                        </ul>
                    </div>
                    <div className="genres">
                        <CTA>Genres <Reset /></CTA>
                        <ul>
                            <li>Action <CTA><Remove /></CTA></li>
                            <li>RPG <CTA><Remove /></CTA></li>
                            <li>Aventure <CTA><Remove /></CTA></li>
                        </ul>
                    </div>
                </div>                
            </div>

        </div>
    </div>
}