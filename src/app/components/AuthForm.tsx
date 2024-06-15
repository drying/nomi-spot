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

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  const [authName, setAuthName] = useState("新規登録");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const authNames = ["新規登録", "ログイン"];

  const handleAuthClick = (newAuthName: string) => {
    setAuthName(newAuthName);
    onOpen();
  };

  return (
    <>
      {authNames.map((authName) => (
        <Button
          onClick={() => handleAuthClick(authName)}
          key={authName}
          bg={authName === "新規登録" ? "black" : "#EDF2F8"}
          color={authName === "新規登録" ? "white" : "initial"}
        >
          {`${authName}`}
        </Button>
      ))}

      <Modal onClose={onClose} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{authName}</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody pb={6}>
              <VStack spacing={4}>
                <FormControl isInvalid={!!errors.email || !!errors.password}>
                  <FormLabel htmlFor="email">メールアドレス</FormLabel>
                  <Input
                    type="email"
                    placeholder="email"
                    {...register("email")}
                  />
                  <FormErrorMessage>
                    {errors.email && errors.email.message}
                  </FormErrorMessage>
                  <FormLabel htmlFor="password">パスワード</FormLabel>
                  <Input
                    type="passwprd"
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
