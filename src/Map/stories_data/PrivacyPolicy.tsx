import {
    closeSharp
} from 'ionicons/icons';
import {
    FC,
    RefObject,
    useRef
} from 'react';
import {
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonModal,
    IonText,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import ReactMarkdown from 'react-markdown';


const privacyPolicy: string = `We want to ensure transparency and clarity about the data collection practices related to the Food Access Map hosted on our website. The Hunter College NYC Food Policy Center and City Harvest are committed to enhancing food access and conducting valuable research to benefit our community. To achieve this, we collect anonymous aggregated data, and we would like to emphasize that your privacy and personal information remain paramount to us.

**Data Collection and Usage**

- **Anonymous Aggregated Data Only**: The data collected from users of the Food Access Map is completely anonymous and aggregated. This means that no personally identifiable information (PII) will be associated with the collected data. We are solely interested in patterns, trends, and overall insights to improve food access.
- **No Personalized Information**: We want to assure you that we do not collect, store, or utilize any personalized information through the Food Access Map. Your privacy is our priority, and we have taken measures to ensure that no personal information will be linked to the data you provide.
- **Research and Improvement**: The primary purpose of collecting this data is for research and to enhance food access in our community. By analyzing aggregated data, we can identify areas for improvement, target resources effectively, and develop strategies to make positive changes.
- **No Cookies or Local Data**: Our website does not use cookies or collect any information from your computer or your usage of the website. You can use the Food Access Map without concerns about any data being stored locally or on your device.

  
Rest assured that our commitment to privacy extends to every aspect of our data collection and analysis process. We adhere to strict ethical standards and legal requirements to ensure that your trust in us is well-placed.

Thank you for being a part of our effort to improve food access for everyone in our community. If you have any questions or concerns about our data practices, please feel free to reach out to us through the provided contact information.`;

export const PrivacyPolicy = () => {
    const modal = useRef<HTMLIonModalElement>(null);
    return (
	<>
	    <IonText>
		<p>
		    Important Data Collection Notice for Food Access Map Users
		</p>
	    </IonText>
	    <IonText>
		<p>
		    Your Privacy Matters: Hunter College NYC Food Policy Center and City Harvest collect only anonymous, aggregated data from the Food Access Map. No personalized information is used or stored, ensuring your privacy. This data aids research and enhances food access without the use of cookies or local storage. <a id='open-privacy-policy' style={{cursor: 'pointer'}}>Read more.</a>
		</p>
	    </IonText>
	    <Modal {...{modal}} />
	</>
    );
};

const Modal: FC<{modal: RefObject<HTMLIonModalElement>}> = ({modal}) => {
    return <IonModal
	       ref={modal}
	       trigger='open-privacy-policy'
	   >
	<IonHeader className='ion-no-border ion-padding'>
	    <IonToolbar>
		<IonTitle>
		    Privacy Policy
		</IonTitle>
		<IonButtons slot='end'>
		    <IonButton onClick={() => modal.current?.dismiss()}>
			<IonIcon
			    icon={closeSharp}
			    slot='icon-only' />
		    </IonButton>
		</IonButtons>
	    </IonToolbar>
	</IonHeader>
	<IonContent className='ion-padding'>
	    <ReactMarkdown children={privacyPolicy} />
	</IonContent>
    </IonModal>;
}
