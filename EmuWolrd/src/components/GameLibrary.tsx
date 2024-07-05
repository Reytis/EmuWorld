import { useState, useEffect } from "react";
import { FilterBar } from "./FilterBar"
import { GameCell, GameCellList } from "./GameCell"
import { getAllLocalStorageGames } from "@/functions";

export const GameLibrary = () => {
    const [directories, setDirectories] = useState<string[]>([]);
    const [files, setFiles] = useState<{ [key: string]: string[] }>({});
    const [view, setView] = useState<number>(0)
    const [genres, SetGenres] = useState<string[]>([])

    // directory to display 
    useEffect(() => {
        const fetchDirectories = async () => {
        const dirs = await window.EmulatorOpener.getDirectories();
        setDirectories(dirs);
        };

        fetchDirectories();
    }, []);

    // handle file in directory
    useEffect(() => {
        const fetchFiles = async () => {
        const newFiles: { [key: string]: string[] } = {};
        for (const dir of directories) {
            newFiles[dir] = await window.EmulatorOpener.listFiles(dir);
        }
        setFiles(newFiles);
        };

        //make sure dir has files
        if (directories.length > 0) {
        fetchFiles();
        }
    }, [directories]);

    //handle Game opening
    const handleOpenFile = (filePath: string) => {
        let normalizedPath = filePath.replace(/\//g, '\\')
        console.log(normalizedPath)
        window.EmulatorOpener.openFile(normalizedPath);
    };

    //handle filtering by genres
    const handleFilteringByGenre = () => {
        const games = getAllLocalStorageGames()
        let filteredGames: Object[] = []
        console.log(games[0])
        games.forEach(g => {
            let genre: string[] = g.datas.genres
            genres.forEach(ge => {
                if (genre.includes(ge) && !filteredGames.includes(g)) {
                    filteredGames.push(g.game)
                }
            })
        })

        return filteredGames
    }

    return <div className="game_library">
        <FilterBar viewDisplayed={view} onViewChange={setView} onGenresChange={SetGenres} />
        <div className={view === 0 ? 'game_container' : 'game_container_list'}>
            {directories.map((dir) => (
                files[dir]
                ?.filter((file) => genres.length > 0 ? 
                !file.endsWith('.sav') && handleFilteringByGenre().includes(file) : 
                !file.endsWith('.sav'))// make sure file is a game not a save if saves file are in same folder
                .map((file, index) => (
                    <button className={view === 0 ? 'game_cell' : 'game_cell_list'} key={index} onClick={() => handleOpenFile(`${dir}/${file}`)}>
                    {view === 0 ? <GameCell gameName={file} /> : <GameCellList gameName={file} />}
                    </button>
                ))           
            ))}
        </div>
    </div>
}