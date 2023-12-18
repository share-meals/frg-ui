import {
    createContext,
    Dispatch,
    PropsWithChildren,
    SetStateAction,
    useContext,
    useState
} from 'react';

type GeocoderPlatform = 'google' | 'nominatim';

interface GeocoderContextProps {
    apiKey?: string,
    platform: GeocoderPlatform,
    setApiKey?: Dispatch<SetStateAction<string>>,
    setPlatform: Dispatch<SetStateAction<GeocoderPlatform>>,
    setUrl: Dispatch<SetStateAction<string>>,
    url: string,
}

const GeocoderContext = createContext<GeocoderContextProps>({
    platform: 'nominatim',
    setUrl: () => {},
    setPlatform: () => {},
    url: 'https://nominatim.openstreetmap.org/search'
});

export const useGeocoder = () => useContext(GeocoderContext);

export interface GeocoderProvider {
    platform: GeocoderPlatform,
    url: string,
};

export const GeocoderProvider = ({
    children,
    platform: platformFromProps,
    url: urlFromProps,
}: PropsWithChildren<GeocoderProvider>) => {
    const [apiKey, setApiKey] = useState<string>('');
    const [platform, setPlatform] = useState<GeocoderPlatform>(platformFromProps);
    const [url, setUrl] = useState<string>(urlFromProps);
    return (
	<GeocoderContext.Provider value={{
	    apiKey,
	    platform,
	    setUrl,
	    setPlatform,
	    setApiKey,
	    url,
	}}>
	    {children}
	</GeocoderContext.Provider>
    );
}
