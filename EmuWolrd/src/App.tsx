import { useEffect, useState } from 'react';
import { Menu } from './components/Menu';
import { HomePage } from './pages/Home';
import { Add } from './pages/Add';
import { Controls } from './pages/Controls';
import { Library } from './pages/Library';
import { SettingsPage } from './pages/Settings';

declare global {
  interface Window {
    EmulatorOpener: {
      openFile: (filePath: string) => void;
      listFiles: (dirPath: string) => Promise<string[]>;
      getDirectories: () => Promise<string[]>;
      addDirectory: (dirPath: string) => Promise<string[]>;
      addSaveDirectory: (dirPath: string) => Promise<string[]>;
      removeDirectory: (dirPath: string) => Promise<string[]>;
      removeSaveDirectory: (dirPath: string) => Promise<string[]>;
      chooseDirectory: () => any;
      openDirectory: (dirPath: string) => any;
    };
  }
}


function App() {
  const [selected, setSelected] = useState(0);

  return (
    <>
      <Menu current={selected} changeCurrent={(n: number) => setSelected(n)} />
      {selected === 0 && <HomePage />}
      {selected === 1 && <Controls />}
      {selected === 2 && <Library />}
      {selected === 3 && <Add />}
      {selected === 4 && <SettingsPage />}
    </>
  );
}

export default App
