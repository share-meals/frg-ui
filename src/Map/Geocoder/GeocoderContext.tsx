import {
    createContext,
    JSX,
    useContext,
    useState
} from 'react';

type GeocoderPlatform = 'google' | 'nominatim';

interface GeocoderContextProps {
    url?: string,
    setUrl: (url: string | undefined) => void,
    platform?: GeocoderPlatform,
    setPlatform: (platform: GeocoderPlatform | undefined) => void,
    apiKey?: string,
    setApiKey: (apiKey: string | undefined) => void
}

const GeocoderContext = createContext<GeocoderContextProps>({
    setUrl: (url) => {console.log(url);},
    setPlatform: (platform) => {console.log(platform);},
    setApiKey: (apiKey) => {console.log(apiKey);},
});

export const useGeocoder = () => useContext(GeocoderContext);

export const GeocoderProvider = ({children}: {children: JSX.Element}) => {
    const [url, setUrl] = useState<string>();
    const [platform, setPlatform] = useState<GeocoderPlatform | undefined>();
    const [apiKey, setApiKey] = useState<string>();
    return (
	<GeocoderContext.Provider value={{
	    url,
	    setUrl,
	    platform,
	    setPlatform,
	    apiKey,
	    setApiKey
	}}>
	    {children}
	</GeocoderContext.Provider>
    );
}
