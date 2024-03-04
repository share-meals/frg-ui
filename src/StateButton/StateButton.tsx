import {
  IonButton,
  IonSpinner
} from '@ionic/react';

import styles from './StateButton.module.css';

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
  return <div className={styles.wrapper} style={{width: props.expand === 'block' || props.expand === 'full' ? '100%' : 'initial'}}>
    {isLoading && <div className={styles.loadingIndicatorWrapper}>
      {loadingIndicator}
    </div>
      }
    <IonButton
      disabled={disabled|| isLoading}
      expand='block'
      className={isLoading ? styles.isLoading : ''}
      {...props}>
      {children}
    </IonButton>
  </div>;
}
