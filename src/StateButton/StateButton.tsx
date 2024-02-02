import {
  IonButton,
  IonSpinner
} from '@ionic/react';

import styles from './StateButton.module.scss';

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
  return <div className={styles.wrapper}>
    {isLoading && <div className={styles.loadingIndicatorWrapper}>
      {loadingIndicator}
    </div>
      }
    <IonButton
      disabled={disabled|| isLoading}
      className={isLoading ? styles.isLoading : ''}
      {...props}>
      {children}
    </IonButton>
  </div>;
}
