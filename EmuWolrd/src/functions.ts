const BASE_URL = 'http://localhost:3000/api/'; // url for proxy (cors policy)
const API_KEY = 'pp64muquz7qralwxkppswl49qiu8ym'; // clé API IGDB
const API_ID = '7yuofk3njbfja2pl950sfu2sxiqoqf'; // client ID

export async function getGameInfo(gameName: string) {
    //request body 
    const body = `fields name,cover.url,total_rating,genres,release_dates,involved_companies; limit 1; search "${clearGameFileName(gameName)}";`

    let response = await fetch(
        BASE_URL+'games', {
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

    return gameInfo;
}
export async function getGameGenre(genres: number[]) {
    //request body 
    const body = `fields name; where id=(${genres.map(g => g)});`

    let response = await fetch(
        BASE_URL+'genres', {
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

    return data;
}
export async function getGameEditors(editors: number[]) {
    //request body 
    const body = `fields company; where id=(${editors.map(g => g)});`

    let response = await fetch(
        BASE_URL+'editors', {
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

    return data;
}
export async function getGameEditorsName(editors: number[]) {
    //request body 
    const body = `fields name; where id=(${editors.map(g => g)});`

    let response = await fetch(
        BASE_URL+'company', {
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

    return data;
}
export async function getGameReleaseDate(date: number[]) {
    //request body 
    const body = `fields y; where id=${date[0]};`

    let response = await fetch(
        BASE_URL+'release', {
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

    return data;
}

export async function getCompleteGameInfo(gameName: string) {
    // Check if data is in local storage
    const cachedData = localStorage.getItem(gameName);
    if (cachedData) {
        return JSON.parse(cachedData);
    }

    try {
        // Fetch game information
        const gameInfo = await getGameInfo(gameName);

        if (!gameInfo) {
            throw new Error(`Game info not found for ${gameName}`);
        }

        // Fetch genres, editors, and release date in parallel
        const [genres, editors, releaseDate] = await Promise.all([
            getGameGenre(gameInfo.genres),
            getGameEditors(gameInfo.involved_companies),
            getGameReleaseDate(gameInfo.release_dates)
        ]);

        const editorsName = await getGameEditorsName(editors.map((editor: {company: number;}) => editor.company))

        // Convert rating to be out of 10
        const rating = gameInfo.total_rating ? (gameInfo.total_rating / 100) * 10 : null;

        // Construct the final object
        const completeGameInfo = {
            id: gameInfo.id,
            cover: gameInfo.cover ? { id: gameInfo.cover.id, url: gameInfo.cover.url } : null,
            name: gameInfo.name,
            editors: editorsName ? editorsName.map((editor: { name: string; }) => editor.name) : [],
            release: releaseDate ? releaseDate[0].y : null, // Assuming the first release date is the desired one
            genres: genres ? genres.map((genre: { name: string; }) => genre.name) : [],
            rating: rating
        };

        // Store the final object in local storage
        localStorage.setItem(gameName, JSON.stringify(completeGameInfo));

        console.log(completeGameInfo);
        return completeGameInfo;

    } catch (error) {
        console.error('Error fetching complete game info:', error);
        throw error;
    }
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