import { Cross, Edit, Open, Remove, Warning } from "@/Icons";
import { CTA } from "@/components/CTA";
import { ListOptButton, Switch } from "@/components/Inputs";
import { useState, useEffect } from "react";


export const Add = () => {
    const [directories, setDirectories] = useState<string[]>([]);
    const [files, setFiles] = useState<{ [key: string]: string[] }>({});
    const [devices, setDevice] = useState(["nintendo Switch", "Nintendo 3DS", "Nintendo DS", "Wii"])
    const [saves, setSaves] = useState<string[]>([])


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
    const handleAddSaveDirectory = async () => {
      try {
        const result = await window.EmulatorOpener.chooseDirectory();
        // make sur to ad directory if selected
        if (!result.canceled && result.filePaths.length > 0) {
          const chosenDir = result.filePaths[0];
          const updatedDirs = await window.EmulatorOpener.addSaveDirectory(chosenDir);
          setSaves(updatedDirs);
        }
      } catch (error) {
        console.error('Erreur lors de l\'ajout du répertoire :', error);
        alert('Erreur lors de l\'ajout du répertoire');
      }
    };

    const handleOpenDirectory = async (dir: string) => {
      await window.EmulatorOpener.openDirectory(dir)
    }
  
    //Handle remove dir
    const handleRemoveDirectory = async (dir: string) => {
      const updatedDirs = await window.EmulatorOpener.removeDirectory(dir);
      setDirectories(updatedDirs);
    };
    const handleRemoveSaveDirectory = async (dir: string) => {
      const updatedDirs = await window.EmulatorOpener.removeSaveDirectory(dir);
      setSaves(updatedDirs);
    };

    const handleAddDevice = () => {
      
    }
    
    return <div className="adding page">
    <h1>My Repertories :</h1>

    <ul>
      {// list all directory for user confirmation
      directories.map((dir) => (
        <li key={dir}>
          {dir}
          <div className="list_opt">
            <ListOptButton options={<Open />} onClickAsync={() => handleOpenDirectory(dir)} onClick={() => {}}/>
            <ListOptButton options={<Remove />} onClickAsync={() => handleRemoveDirectory(dir)} onClick={() => {}} />
          </div>
        </li>
      ))}
    </ul>
    <h1>My Saves :</h1>
    <ul>
      {// list all directory for user confirmation
      saves.map((s) => (
        <li key={s}>
          {s}
          <div className="list_opt">
            <ListOptButton options={<Open />} onClickAsync={() => handleOpenDirectory(s)} onClick={() => {}}/>
            <ListOptButton options={<Remove />} onClickAsync={() => handleRemoveSaveDirectory(s)} onClick={() => {}}/>
          </div>
        </li>
      ))}
    </ul>
    <h1>My Device :</h1>
    <p className="warning"><Warning /> Not Implemented Yet</p>
    {/* <ul>
      {// list all directory for user confirmation
      devices.map((d) => (
        <li key={d}>
          {d}
          <div className="list_opt">
            <ListOptButton options={<Open />} onClick={() => {}} />
            <ListOptButton options={<Edit />} onClick={() => {}} />
            <ListOptButton options={<Remove />} onClick={() => {}} />
          </div>
        </li>
      ))}
    </ul> */}
    <h1>Add :</h1>
    <div className="adding_cta">
        <CTA onClick={handleAddDirectory}>New Repertory<Cross /></CTA>
        {/* <CTA onClick={handleAddDevice}>New Device<Cross /></CTA> */}
        <CTA onClick={handleAddSaveDirectory}>New Save Location<Cross /></CTA>
    </div>
  </div>
}