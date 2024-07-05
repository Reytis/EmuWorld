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
        let filteredGames: string[] = []
        console.log(games[0])
        games.forEach(g => {
            let genre: string[] = g.datas.genres
            genres.forEach(ge => {
                if (genre.includes(ge) && !filteredGames.includes(g.game)) {
                    filteredGames.push(g.game)
                }
            })
        })
        
        return filteredGames
    }

    // Combine filtered files from all directories
    const getFilteredFiles = () => {
        let filteredFiles: { [key: string]: string[] } = {};
        const filteredGames = handleFilteringByGenre();

        directories.forEach((dir) => {
            filteredFiles[dir] = files[dir]?.filter(file => {
                const isGame = !file.endsWith('.sav');
                const isFilteredGame = genres.length === 0 || filteredGames.includes(file);
                return isGame && isFilteredGame;
            }) || [];
        });

        return filteredFiles;
    }

    const filteredFiles = getFilteredFiles();

    return <div className="game_library">
        {genres}
        <FilterBar viewDisplayed={view} onViewChange={setView} onGenresChange={SetGenres} />
        <div className={view === 0 ? 'game_container' : 'game_container_list'}>
            {directories.map((dir) => (
                filteredFiles[dir]?.map((file, index) => (
                    <button
                        className={view === 0 ? 'game_cell' : 'game_cell_list'}
                        key={`${dir}-${file}-${index}`}
                        onClick={() => handleOpenFile(`${dir}/${file}`)}>
                        {view === 0 ? <GameCell gameName={file} /> : <GameCellList gameName={file} />}
                    </button>
                ))
            ))}
        </div>
    </div>
}