import { Grid, List, Search } from "@/Icons"
import { Checkbox, FilterInput, Switch, TextInput } from "./Inputs"

export const FilterBar = () => {

    return <div className="filter_bar">
        <div className="filters">
            <h3>Game Filter By:</h3>
            <FilterInput options={["NDS", "3DS", "Wii", "Switch"]} type={"Console"} />
            <FilterInput options={["Action", "2D", "3D", "RPG"]} type={"Genre"} />
            <Checkbox label={"Only Favoris"} />
            <TextInput placeHolder={'Search'}><Search /></TextInput>
        </div>
        <Switch options={[<Grid />, <List />]} />
    </div>
}