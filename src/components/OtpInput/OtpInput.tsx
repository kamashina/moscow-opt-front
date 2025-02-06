import Otp, { OTPInputProps } from "react-otp-input";
import { twMerge } from "tailwind-merge";
import AppText from "../AppText/AppText";

type Props = {
  value?: string;
  label?: string;
  labelClassName?: string;
  error?: string;
} & OTPInputProps;

const OtpInput = ({ label, labelClassName, error, ...rest }: Props) => {
  return (
    <label className={twMerge("", labelClassName)}>
      {label}
      <Otp
        numInputs={5}
        renderSeparator={<span style={{ width: "8px" }}></span>}
        shouldAutoFocus={true}
        inputStyle={{
          border: "1px solid #0167FF",
          borderRadius: "8px",
          width: "54px",
          height: "54px",
          fontSize: "12px",
          color: "#000",
          fontWeight: "400",
          caretColor: "blue",
        }}
        {...rest}
      />
      {error && <AppText className="text-red">{error}</AppText>}
    </label>
  );
};

export default OtpInput;
