import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  BarContainer,
  CustomButtonHeader,
  LogoContainerHeader,
} from "../styles";

export const HeaderBar = (props: any) => {
  // Inside of functional component
  const router = useRouter();
  const handleClick = () => {
    if (props?.text === "Log In") {
      router.push("/user/signin");
    } else if (props?.text === "Sign Up") {
      router.push("/user/signup");
    }
  };
  return (
    <BarContainer>
      <LogoContainerHeader>
        <Image
          className="Outerheading"
          src={"/assets/merchantad-logo.png"}
          alt={"logo"}
          width={180}
          height={40}
          onClick={() => {
            router.push("/");
          }}
        />
      </LogoContainerHeader>
      {props?.text && (
        <CustomButtonHeader onClick={handleClick}>
          {props?.text}
        </CustomButtonHeader>
      )}
    </BarContainer>
  );
};
