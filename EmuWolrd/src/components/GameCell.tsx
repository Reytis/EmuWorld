import React, { useState, useEffect } from 'react';
import { clearGameFileName, getGameInfo, truncateText } from '../functions';

interface GameComponentProps {
  gameName: string;
}

interface GameInfo {
  id: number,
  cover: {id: number, url: string},
  name: string
}

export const GameCell = ({gameName}:GameComponentProps) => {
  const [gameInfo, setGameInfo] = useState<GameInfo | null>(null);
  const [loading, setLoading] = useState(true);

  //handle fetching to get game datas
  useEffect(() => {
    async function fetchGameInfo() {
      try {
        const info = await getGameInfo(gameName);
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
          {gameInfo.cover && <img src={`https:${gameInfo.cover.url.replace('t_thumb', 't_720p')}`} alt={gameInfo.name} width="150px" height="150px" style={{objectFit: "cover"}}
          /> // display datas
          } 
          {!gameInfo.cover && <img src={"./ImgNotFound.png"} alt={gameInfo.name} width="150px" height="150px" style={{objectFit: "cover"}}
          /> // handle UI for missing img if game found without
          }
          <h2>{truncateText(gameInfo.name, 16)}</h2>
        </div>
      ) : (
        // Handle not found game UI
        <div>
          <img src="./ImgNotFound.png" alt={clearGameFileName(gameName)} width="150px" height="150px" style={{objectFit: "cover"}} />
          <h2>{truncateText(clearGameFileName(gameName), 16)}</h2>
        </div>
      )}
    </div>
  );
}