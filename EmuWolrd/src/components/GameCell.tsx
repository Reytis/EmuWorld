import { useState, useEffect } from 'react';
import { clearGameFileName, getCompleteGameInfo, truncateText } from '../functions';
import { Star } from '@/Icons';
import { GameInfo } from '@/types';

interface GameComponentProps {
  gameName: string;
}

export const GameCell = ({gameName}:GameComponentProps) => {
  const [gameInfo, setGameInfo] = useState<GameInfo | null>(null);
  const [loading, setLoading] = useState(true);

  //handle fetching to get game datas
  useEffect(() => {
    async function fetchGameInfo() {
      try {
        const info = await getCompleteGameInfo(gameName);
        setGameInfo(info);
      } catch (error) {
        console.error('Error fetching game info:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchGameInfo();
  }, [gameName]);

  // handle loading UI
  if (loading) {
    return <p>Chargement des informations sur le jeu...</p>;
  }

  return (
    <div title={gameInfo ? gameInfo.name : clearGameFileName(gameName)}>
      {gameInfo ? (
        <div>
          {gameInfo.cover && <img src={`https:${gameInfo.cover.url.replace('t_thumb', 't_720p')}`} alt={gameInfo.name} width="150px" height="150px"
          /> // display datas
          } 
          {!gameInfo.cover && <img src={"./ImgNotFound.png"} alt={gameInfo.name} width="150px" height="150px"
          /> // handle UI for missing img if game found without
          }
          <div className="game_datas">
            <h2>{truncateText(gameInfo.name, 16)}</h2>
            <Star />  
          </div>
        </div>
      ) : (
        // Handle not found game UI
        <div>
          <img src="./ImgNotFound.png" alt={clearGameFileName(gameName)} width="150px" height="150px" style={{objectFit: "cover"}} />
          <div className="game_datas">
            <h2>{truncateText(clearGameFileName(gameName), 16)}</h2>
            <Star />  
          </div>
        </div>
      )}
    </div>
  );
}

export const GameCellList = ({gameName}:GameComponentProps) => {
  const [gameInfo, setGameInfo] = useState<GameInfo | null>(null);
  const [loading, setLoading] = useState(true);

  //handle fetching to get game datas
  useEffect(() => {
    async function fetchGameInfo() {
      try {
        const info = await getCompleteGameInfo(gameName);
        setGameInfo(info);
      } catch (error) {
        console.error('Error fetching game info:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchGameInfo();
  }, [gameName]);

  // handle loading UI
  if (loading) {
    return <p>Chargement des informations sur le jeu...</p>;
  }

  return (
    <div title={gameInfo ? gameInfo.name : clearGameFileName(gameName)}>
      {gameInfo ? (
        <div className='game_datas_container'>
          {gameInfo.cover && <img src={`https:${gameInfo.cover.url.replace('t_thumb', 't_720p')}`} alt={gameInfo.name} width="150px" height="150px" style={{objectFit: "cover"}}
          /> // display datas
          } 
          {!gameInfo.cover && <img src={"./ImgNotFound.png"} alt={gameInfo.name} width="150px" height="150px" style={{objectFit: "cover"}}
          /> // handle UI for missing img if game found without
          }
          <div className="game_datas">
            <h2>{gameInfo.name} <Star /></h2>
            <span className="years">Years: {gameInfo.release}</span>
            <span className="editors">Editors: {gameInfo.editors.map(e => e +', ')}</span>
            <span className="rating">Rating: {Math.round(gameInfo.rating * 10) /10 }/10</span>
          </div>
        </div>
      ) : (
        // Handle not found game UI
        <div className='game_datas_container'>
          <img src="./ImgNotFound.png" alt={clearGameFileName(gameName)} width="150px" height="150px" />
          <div className="game_datas">
            <h2>{clearGameFileName(gameName)} <Star /></h2>
            <span className="years">Years: unknow</span>
            <span className="editors">Editors: unknow</span>
            <span className="rating">Rating: 0/10</span> 
          </div>
        </div>
      )}
    </div>
  );
}