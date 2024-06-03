const BASE_URL = 'http://localhost:3000/api'; // url for proxy (cors policy)
const API_KEY = 'pp64muquz7qralwxkppswl49qiu8ym'; // clé API IGDB
const API_ID = '7yuofk3njbfja2pl950sfu2sxiqoqf'; // client ID

export async function getGameInfo(gameName: string) {

    //Verify if the datas are in LocalStorage to make sur not spam API call
    const cachedData = localStorage.getItem(gameName);
    if (cachedData) {
        return JSON.parse(cachedData);
    }

    //request body 
    const body = `fields name,cover.url; limit 1; search "${clearGameFileName(gameName)}";`

    let response = await fetch(
        BASE_URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${API_KEY}`,
                'Client-ID': `${API_ID}`,
                'Content-Type': 'text/plain'
            },
            body: body
        }
    );

    //handle error
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Request failed with status ${response.status}: ${errorText} - Request Body ${body}`);
    }
    
    const data = await response.json();
    const gameInfo = data.length > 0 ? data[0] : null;

    //add items to LocalStrorage make sure not Spam API Call
    if (gameInfo) {
        localStorage.setItem(gameName, JSON.stringify(gameInfo));
    }

    return gameInfo;
}

//Clear game file name for "14 - Game Name (Fr,US) (decrypted).ext" => "Game Name"
export const clearGameFileName = (fileName: string) => {
    fileName = fileName.replace(/^\d+/, '')
    fileName = fileName.replace(/\([^()]*\)/g, '')
    fileName = fileName.replace(/\[[^\[\]]*\]/g, '')
    fileName = fileName.replace(/\.[^.]+$/, '')
    fileName = fileName.replace('Decrypted', '')
    fileName = fileName.replace('random', '')

    return fileName
}

//If name is to long cut it and end it with "..."
export const truncateText = (text:string, maxlenght:number) => {
    if (text.length <= maxlenght) {
        return text
    }
    return text.substring(0, maxlenght - 3) + '...'
}