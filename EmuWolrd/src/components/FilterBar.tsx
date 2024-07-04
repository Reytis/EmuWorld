import { Grid, List, Search } from "@/Icons"
import { Checkbox, FilterInput, Switch, TextInput } from "./Inputs"
import { useState } from "react"

type FilterProps = {
    viewDisplayed: number
    onViewChange: Function
}

export const FilterBar = ({viewDisplayed, onViewChange}: FilterProps) => {
    const [view, setView] = useState(viewDisplayed)

    const handleSwitchView = (o:number) => {
        setView(o)
        onViewChange(o)
    }

    const storedGenres = localStorage.getItem("genres")
    const genres = storedGenres ? JSON.parse(storedGenres) : ["no datas"]

    return <div className="filter_bar">
        <div className="filters">
            <h3>Game Filter By:</h3>
            <FilterInput options={["NDS", "3DS", "Wii", "Switch"]} type={"Device"} />
            <FilterInput options={genres} type={"Genre"} />
            <Checkbox label={"Only Favoris"} />
            <TextInput placeHolder={'Search'}><Search /></TextInput>
        </div>
        <Switch options={[<Grid />, <List />]} current={view} onClick={handleSwitchView}/>
    </div>
}