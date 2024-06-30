import { useState, useEffect } from "react";
import { FilterBar } from "./FilterBar"
import { GameCell, GameCellList } from "./GameCell"

export const GameLibrary = () => {
    const [directories, setDirectories] = useState<string[]>([]);
    const [files, setFiles] = useState<{ [key: string]: string[] }>({});
    const [filterState, setFilterState] = useState({
        console: "all",
        genre: "all",
        favorites: false,
        view: "grid"
    })

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

    return <div className="game_library">
        <FilterBar />
        <div className={filterState.view === 'grid' ? 'game_container' : 'game_container_list'}>
            {directories.map((dir) => (
                files[dir]
                ?.filter((file) => !file.endsWith('.sav'))// make sure file is a game not a save if saves file are in same folder
                .map((file, index) => (
                    <button className={filterState.view === 'grid' ? 'game_cell' : 'game_cell_list'} key={index} onClick={() => handleOpenFile(`${dir}/${file}`)}>
                    {filterState.view === 'grid' ? <GameCell gameName={file} /> : <GameCellList gameName={file} />}
                    </button>
                ))           
            ))}
        </div>
    </div>
}