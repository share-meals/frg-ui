import {
    IonApp,    
    IonContent,
    IonPage,
} from '@ionic/react';
import type {Preview} from '@storybook/react';
import React from 'react';
import {themes} from '@storybook/theming';
import '@storybook/addon-console';

import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './variables.css';

import { setupIonicReact } from '@ionic/react';

setupIonicReact();

const preview: Preview = {
    argTypes: {
	control: {
	    table: {
		disable: true
	    }
	},
	testId: {
	    table: {
		disable: true
	    }
	},
    },
    decorators: [
	(Story) => (
	    <IonApp>
		<IonPage>
		    <IonContent>
			<Story />
		    </IonContent>
		</IonPage>
	    </IonApp>
	)
    ],
    parameters: {
	actions: { argTypesRegex: "^on[A-Z].*" },
	controls: {
	    matchers: {
		color: /(background|color)$/i,
		date: /Date$/,
	    },
	},
	darkMode: {
	    dark: { ...themes.dark, appBg: 'black' },
	    light: { ...themes.normal, appBg: 'white' }
	}
    },
};

export default preview;
