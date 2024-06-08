import { useEffect, useState } from 'react';
import { GameCell, GameCellList } from './components/GameCell';
import { Menu } from './components/Menu';
import { GameLibrary } from './components/GameLibrary';
import { FilterBar } from './components/FilterBar';
import { GameEditor } from './components/GameEditor';
import { Checkbox, FilterInput, Opener, SearchBar, Switch } from './components/Inputs';
import { CTA } from './components/CTA';
import { BookShelf, Burger, ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Cross, Edit, Grid, Home, List, Manette, Open, Remove, Search, Settings, Star } from './Icons';
import { Console } from './components/Console';

declare global {
  interface Window {
    EmulatorOpener: {
      openFile: (filePath: string) => void;
      listFiles: (dirPath: string) => Promise<string[]>;
      getDirectories: () => Promise<string[]>;
      addDirectory: (dirPath: string) => Promise<string[]>;
      removeDirectory: (dirPath: string) => Promise<string[]>;
      chooseDirectory: () => any;
    };
  }
}

/*
function App() {
  const [directories, setDirectories] = useState<string[]>([]);
  const [files, setFiles] = useState<{ [key: string]: string[] }>({});

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

  const handleAddDirectory = async () => {
    try {
      const result = await window.EmulatorOpener.chooseDirectory();
      // make sur to ad directory if selected
      if (!result.canceled && result.filePaths.length > 0) {
        const chosenDir = result.filePaths[0];
        const updatedDirs = await window.EmulatorOpener.addDirectory(chosenDir);
        setDirectories(updatedDirs);
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout du répertoire :', error);
      alert('Erreur lors de l\'ajout du répertoire');
    }
  };

  //Handle remove dir
  const handleRemoveDirectory = async (dir: string) => {
    const updatedDirs = await window.EmulatorOpener.removeDirectory(dir);
    setDirectories(updatedDirs);
  };

  return (
    <>
      <h1>Gestion des Répertoires</h1>
      <button onClick={handleAddDirectory}>Ajouter Répertoire</button>
      <ul>
        {// list all directory for user confirmation
        directories.map((dir) => (
          <li key={dir}>
            {dir}
            <button className='cta' onClick={() => handleRemoveDirectory(dir)}>Supprimer</button>
          </li>
        ))}
      </ul>
      <h2>Fichiers</h2>
      {directories.map((dir) => (
        <div key={dir}>
          <h3>{dir}</h3>
          <div className='game_container'>
            {files[dir]
              ?.filter((file) => !file.endsWith('.sav'))// make sure file is a game not a save if saves file are in same folder
              .map((file, index) => (
                <button className='game_cell' key={index} onClick={() => handleOpenFile(`${dir}/${file}`)}>
                  <GameCell  gameName={file} />
                </button>
              ))}            
          </div>
        </div>
      ))}
    </>
  )
}
*/
function App() {

  return <div className="ui_library">
    <h4>UI Library</h4>
    <div>
      <h1>Menu</h1>
      <Menu />      
    </div>
    <div>
      <h1>Filter Bar</h1>
      <FilterBar />
    </div>
    <div>
      <h1>Grid Game Cell</h1>
      <div className="game_container">
        <button className='game_cell'><GameCell gameName={'Game Cell'} /></button>
        <button className='game_cell'><GameCell gameName={'Game Cell'} /></button>
        <button className='game_cell'><GameCell gameName={'Game Cell'} /></button>
        <button className='game_cell'><GameCell gameName={'Game Cell'} /></button>
      </div>
      <h1>List Game Cell</h1>
      <div className="game_container_list">
        <button className='game_cell_list'><GameCellList gameName={'Game Cell List'} /></button>
        <button className='game_cell_list'><GameCellList gameName={'Game Cell List'} /></button>
        <button className='game_cell_list'><GameCellList gameName={'Game Cell List'} /></button>
      </div>      
    </div>
    <div>
      <h1>Game Edition</h1>
      <GameEditor />
    </div>
    <div>
      <h1>Console Cell</h1>
      <Console />
    </div>
    <div className="inputs_container">
      <h1>Inputs</h1>
      <FilterInput type='Options' options={["Option 1", "Option 2", "Option 3", "Option 4"]} />
      <Checkbox  label='Checkbox'/>
      <SearchBar />
      <Switch options={[<Grid />, <List />]} />
      {/* <Opener /> */}
    </div>
    <div className="cta_container">
      <h1>CTA</h1>
      <CTA><Home />Full Icon<Home /></CTA>
      <CTA><Home />Left Icon</CTA>
      <CTA>Right Icon<ChevronRight /></CTA>
      <CTA>No Icon</CTA>
      <CTA selected noBorder>Selected & No Radius</CTA>
    </div>
    <div className='icons_container'>
      <h1>Icon Set</h1>
      <div className="icons_list">
        <Star />
        <BookShelf />
        <Burger />
        <ChevronDown />
        <ChevronLeft />
        <ChevronRight />
        <ChevronUp />
        <Cross />
        <Edit />
        <Grid />
        <Home />
        <List />
        <Manette />
        <Open />
        <Remove />
        <Search />
        <Settings />
      </div>      
    </div>
  </div>
}

export default App
