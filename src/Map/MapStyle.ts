import layers from 'protomaps-themes-base';
import { StyleSpecification } from '@maplibre/maplibre-gl-style-spec';

interface getStyleProps {
  apiKey: string,
  theme: 'black' | 'dark' | 'grayscale' | 'light' | 'white'
}

export const getMapStyle: (arg: getStyleProps) => StyleSpecification = ({
  apiKey,
  theme,
}) => {
  return {
    version: 8,
    glyphs:'https://protomaps.github.io/basemaps-assets/fonts/{fontstack}/{range}.pbf',
  sprite: `https://protomaps.github.io/basemaps-assets/sprites/v3/${theme}`,
  sources: {
    protomaps: {
      type: 'vector',
      tiles: [
	`https://api.protomaps.com/tiles/v3/{z}/{x}/{y}.mvt?key=${apiKey}`
      ],
      attribution: `<a href='https://protomaps.com'>Protomaps</a> © <a href='https://openstreetmap.org'>OpenStreetMap</a>`
    }
  },
  layers: layers('protomaps', theme)
  }
};
