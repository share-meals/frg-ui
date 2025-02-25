import {
  IonButton,
  IonSpinner
} from '@ionic/react';

export interface StateButtonProps extends React.ComponentProps<typeof IonButton> {
  isLoading?: boolean,
  loadingIndicator?: React.ReactElement
};

export const StateButton: React.FC<React.PropsWithChildren<StateButtonProps>> = ({
  children,
  isLoading = false,
  loadingIndicator = <IonSpinner />,
  disabled,
  ...props
}) => {
  return <div style={{
    width: props.expand === 'block' || props.expand === 'full' ? '100%' : 'initial',
    position: 'relative',
    display: 'inline-block'    
  }}>
    {isLoading && <div style={{
      alignItems: 'center',
      display: 'flex',
      height: '100%',
      justifyContent: 'center',
      position: 'absolute',
      width: '100%'
    }}>
      {loadingIndicator}
    </div>
      }
    <IonButton
      disabled={disabled|| isLoading}
      expand='block'
      {...props}>
      {children}
    </IonButton>
  </div>;
}
//      	

