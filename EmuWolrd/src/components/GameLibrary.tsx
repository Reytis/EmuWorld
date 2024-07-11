import { useState, useEffect } from "react";
import { FilterBar } from "./FilterBar"
import { GameCell, GameCellList } from "./GameCell"
import { clearGameFileName, getAllLocalStorageGames } from "@/functions";

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
        let filteredFiles: { name: string, displayedName: string, dir: string }[] = [];
        const filteredGames = handleFilteringByGenre();

        directories.forEach((dir) => {
            const filteredDirFiles = files[dir]?.filter(file => {
                const isGame = !file.endsWith('.sav');
                const isFilteredGame = genres.length === 0 || filteredGames.includes(file);
                return isGame && isFilteredGame;
            }) || [];

            filteredDirFiles.forEach(file => {
                let LocalStored = localStorage.getItem(file)
                let GameName = clearGameFileName(file)
                if (LocalStored) {
                    GameName = JSON.parse(LocalStored).name
                }
                
                filteredFiles.push({ name: file, displayedName: GameName, dir });
            });
        });

        filteredFiles.sort((a,b) => a.displayedName.localeCompare(b.displayedName))

        return filteredFiles;
    };

    const filteredFiles = getFilteredFiles();

    return <div className="game_library">
        {genres}
        <FilterBar viewDisplayed={view} onViewChange={setView} onGenresChange={SetGenres} />
        <div className={view === 0 ? 'game_container' : 'game_container_list'}>
            {filteredFiles.map((fileObj, index) => (
                <button
                    className={view === 0 ? 'game_cell' : 'game_cell_list'}
                    key={`${fileObj.dir}-${fileObj.name}-${index}`}
                    onClick={() => handleOpenFile(`${fileObj.dir}/${fileObj.name}`)}
                >
                    {view === 0 ? <GameCell gameName={fileObj.name} /> : <GameCellList gameName={fileObj.name} />}
                </button>
            ))}
        </div>
    </div>
}