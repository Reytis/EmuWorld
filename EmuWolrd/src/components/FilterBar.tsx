import { Grid, List, Search } from "@/Icons"
import { Checkbox, FilterInput, Switch, TextInput } from "./Inputs"
import { useState } from "react"

type FilterProps = {
    viewDisplayed: number
    onViewChange: Function
    onGenresChange: Function
}

export const FilterBar = ({viewDisplayed, onViewChange, onGenresChange}: FilterProps) => {
    const [view, setView] = useState(viewDisplayed)
    const [selectedGenres, setSelectedGenres] = useState<string[]>([])

    const handleSwitchView = (o:number) => {
        setView(o)
        onViewChange(o)
    }
    const handleSelectGenres = (g: string[]) => {
        setSelectedGenres(g)
        onGenresChange(g)
    }

    const storedGenres = localStorage.getItem("genres")
    const genres = storedGenres ? JSON.parse(storedGenres) : ["no datas"]

    return <div className="filter_bar">
        <div className="filters">
            <h3>Game Filter By:</h3>
            <FilterInput options={["NDS", "3DS", "Wii", "Switch"]} type={"Device"} onSelectionCHange={() => {}} />
            <FilterInput options={genres} type={"Genre"} onSelectionCHange={handleSelectGenres} />
            <Checkbox label={"Only Favoris"} />
            <TextInput placeHolder={'Search'}><Search /></TextInput>
        </div>
        <Switch options={[<Grid />, <List />]} current={view} onClick={handleSwitchView}/>
    </div>
}