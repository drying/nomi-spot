import {
  Button,
  Input,
  Link,
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
import { useRef, useState } from "react";
import { handleSingup } from "../utils/firebaseAuth";

export default function AuthForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [authName, setAuthName] = useState("新規登録");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);

  const authNames = ["新規登録", "ログイン"];

  const handleAuthClick = (newAuthName: string) => {
    setAuthName(newAuthName);
    onOpen();
  };

  const handleClickSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("mypageに移動します");
    // await handleSingup(email, password);
  };

  return (
    <>
      {authNames.map((authName) => (
        <Button
          onClick={() => handleAuthClick(authName)}
          key={authName}
          bg={authName === "新規登録" ? "black" : "initial"}
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
          <ModalBody pb={6}>
            <form onSubmit={handleClickSubmit}>
              <VStack spacing={4}>
                <Input
                  placeholder="メールアドレス"
                  name="email"
                  type="email"
                  value={email}
                  ref={initialRef}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  placeholder="パスワード"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </VStack>
            </form>
          </ModalBody>

          <ModalFooter>
            <Link href={authName === "新規登録" ? "/register" : "mypage"}>
              <Button colorScheme="blue" mr={3} as="a" type="submit">
                {authName === "新規登録" ? "新規登録" : "ログイン"}
              </Button>
            </Link>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
