import * as React from "react";
import { Button, Dialog, Portal } from "react-native-paper";
import { useTheme } from "@/context/themeContext";

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
  const { theme } = useTheme();

  return (
    <Portal>
      <Dialog visible={visible} style={{ backgroundColor: theme.background }}>
        <Dialog.Title style={{ color: theme.text }}>{text}</Dialog.Title>
        <Dialog.Actions>
          {action1 && (
            <Button
              onPress={() => {
                hideDialog();
                if (action1) {
                  action1();
                }
              }}
              textColor={theme.primary}
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
              textColor={theme.primary}
            >
              {actionKey2}
            </Button>
          )}
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default DialogAction;
