import Alert from "react-s-alert";

export const showAlert = message => {
  Alert.success(message, {
    position: "top",
    effect: "stackslide",
    timeout: 1500
  });
};
