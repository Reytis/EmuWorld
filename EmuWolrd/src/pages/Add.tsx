import { Cross, Edit, Open, Remove } from "@/Icons";
import { CTA } from "@/components/CTA";
import { GameCell } from "@/components/GameCell"
import { Switch } from "@/components/Inputs";
import { useState, useEffect } from "react";


export const Add = () => {
    const [directories, setDirectories] = useState<string[]>([]);
    const [files, setFiles] = useState<{ [key: string]: string[] }>({});
    const [devices, setDevice] = useState(["nintendo Switch", "Nintendo 3DS", "Nintendo DS", "Wii"])
    const [saves, setSaves] = useState(["D:\\Wii\\saves","D:\\Switch\\saves","D:\\DS\\saves","D:\\3DS\\saves"])


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

    const handleAddDevice = () => {
        setDevice([...devices, "new device"])
    }
    const handleAddSaveLocation = () => {
      setSaves([...saves, "new saves"])
    }
    
    return <div className="adding page">
    <h1>My Repertories :</h1>

    <ul>
      {// list all directory for user confirmation
      directories.map((dir) => (
        <li key={dir}>
          {dir}
          <Switch options={[<Open />, <Edit />, <Remove />]} current={10} onClick={() => {}} />
        </li>
      ))}
    </ul>
    <h1>My Device :</h1>
    <ul>
      {// list all directory for user confirmation
      devices.map((d) => (
        <li key={d}>
          {d}
          <Switch options={[<Open />, <Edit />, <Remove />]} current={10} onClick={() => {}} />
        </li>
      ))}
    </ul>
    <h1>My Saves :</h1>
    <ul>
      {// list all directory for user confirmation
      saves.map((s) => (
        <li key={s}>
          {s}
          <Switch options={[<Open />, <Edit />, <Remove />]} current={10} onClick={() => {}} />
        </li>
      ))}
    </ul>
    <h1>Add :</h1>
    <div className="adding_cta">
        <CTA onClick={handleAddDirectory}>New Repertory<Cross /></CTA>
        <CTA onClick={handleAddDevice}>New Device<Cross /></CTA>
        <CTA onClick={handleAddDevice}>New Save Location<Cross /></CTA>
    </div>
  </div>
}