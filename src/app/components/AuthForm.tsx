import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AuthData,
  handleLogin,
  handleLogout,
  handleSignup,
} from "../utils/firebaseAuth";
import { useRouter } from "next/navigation";
import { useAuth } from "../contexts/AuthContext";

type Inputs = {
  email: string;
  password: string;
};

const schema = z.object({
  email: z
    .string()
    .min(1, "メールアドレスは必須です")
    .email("有効なメールアドレスを入力してください"),
  password: z
    .string()
    .min(8, "パスワードは8文字以上で入力してください")
    .regex(/^[a-zA-Z0-9]+$/, "パスワードは英数字のみで入力してください"),
});

export default function AuthForm() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const [authName, setAuthName] = useState("新規登録");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const { user, loading } = useAuth();
  const authNames = ["新規登録", "ログイン"];

  const handleAuthClick = (newAuthName: string) => {
    setAuthName(newAuthName);
    onOpen();

    if (newAuthName === "新規登録") {
      router.push("?params=signup");
    } else if (newAuthName === "ログイン") {
      router.push("?params=login");
    }
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
    try {
      const authData: AuthData = {
        email: data.email,
        password: data.password,
      };

      if (authName === "新規登録") {
        const user = await handleSignup(authData);
        console.log("新規登録完了:", user);
        router.push("/mypage");
      } else {
        const user = await handleLogin(authData);
        console.log("ログイン完了:", user);
        router.push("/mypage");
      }
      onClose();
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error message", error.message);
      } else {
        console.error("Unknow error", error);
      }
    }
  };

  const handleLogoutClick = async () => {
    try {
      await handleLogout();
      router.push("/");
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  return (
    <>
      {!loading && user ? (
        <Button
          onClick={handleLogoutClick}
          bg="red.500"
          color="white"
          minW="120px"
        >
          ログアウト
        </Button>
      ) : (
        authNames.map((authName) => (
          <Button
            onClick={() => handleAuthClick(authName)}
            key={authName}
            bg={authName === "新規登録" ? "black" : "#EDF2F8"}
            color={authName === "新規登録" ? "white" : "initial"}
          >
            {`${authName}`}
          </Button>
        ))
      )}

      <Modal onClose={onClose} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{authName}</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody pb={6}>
              <VStack spacing={4}>
                <FormControl isInvalid={!!errors.email}>
                  <FormLabel htmlFor="email">メールアドレス</FormLabel>
                  <Input
                    type="email"
                    placeholder="email"
                    {...register("email")}
                  />
                  <FormErrorMessage>
                    {errors.email && errors.email.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.password}>
                  <FormLabel htmlFor="password">パスワード</FormLabel>
                  <Input
                    type="password"
                    placeholder="password"
                    {...register("password")}
                  />
                  <FormErrorMessage>
                    {errors.password && errors.password.message}
                  </FormErrorMessage>
                </FormControl>
              </VStack>
            </ModalBody>

            <ModalFooter>
              <Button
                type="submit"
                mr={2}
                colorScheme="blue"
                isLoading={isSubmitting}
              >
                {authName === "新規登録" ? "新規登録" : "ログイン"}
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}
