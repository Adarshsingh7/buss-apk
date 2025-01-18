import * as React from "react";
import { Button, Dialog, Portal } from "react-native-paper";

type DialogActionProps = {
  text: string;
  actionKey1?: string;
  actionKey2?: string;
  action1?: () => void;
  action2?: () => void;
};

const DialogAction = ({
  text,
  actionKey1,
  actionKey2,
  action1,
  action2,
}: DialogActionProps) => {
  const [visible, setVisible] = React.useState(true);
  const hideDialog = () => setVisible(false);

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Title>{text}</Dialog.Title>
        <Dialog.Actions>
          {action1 && (
            <Button
              onPress={() => {
                hideDialog();
                if (action1) {
                  action1();
                }
              }}
            >
              {actionKey1}
            </Button>
          )}
          {action2 && (
            <Button
              onPress={() => {
                hideDialog();
                if (action2) {
                  action2();
                }
              }}
            >
              {actionKey2}
            </Button>
          )}
          {/* <Button onPress={action}>{actionKey2}</Button> */}
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default DialogAction;
