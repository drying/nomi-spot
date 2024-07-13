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
} from "@chakra-ui/react";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import UploadImage from "./UploadImage";
import { auth } from "../../../utils/firebaseConfig";
import { updateUsername } from "../../../utils/firebaseData";

const createSchema = (cuurentUsername: string) => {
  return z.object({
    username: z
      .string()
      .refine((value) => value === cuurentUsername || value.trim().length > 0, {
        message: "ユーザーネームは必須です",
      }),
    profileImage: z.instanceof(FileList).optional(),
  });
};

type FormValues = z.infer<ReturnType<typeof createSchema>>;

type Toggle = {
  isOpen: boolean;
  onClose: () => void;
  currentUsername: string;
  onUpdateUsername: (newUsername: string) => void;
  setUploadImage: (image: string | null) => void;
  uploadImage: string | null;
};

export default function RegisterForm({
  isOpen,
  onClose,
  currentUsername,
  onUpdateUsername,
  setUploadImage,
  uploadImage,
}: Toggle) {
  const schema = createSchema(currentUsername);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const user = auth.currentUser;
    if (user) {
      await updateUsername(user.uid, data.username);
      onUpdateUsername(data.username);
      onClose();
    } else {
      console.error("このユーザーはログインしていません");
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>プロフィール編集</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody pb={6}>
              <VStack spacing={4}>
                <FormControl isInvalid={!!errors.username}>
                  <FormLabel htmlFor="username">ユーザーネーム</FormLabel>
                  <Input
                    id="username"
                    defaultValue={currentUsername}
                    placeholder="username"
                    {...register("username")}
                    mb={4}
                  />
                  <FormErrorMessage>
                    {errors.username && errors.username.message}
                  </FormErrorMessage>
                  <FormLabel htmlFor="profileImage">アイコン</FormLabel>
                  <UploadImage
                    setUploadImage={setUploadImage}
                    uploadImage={uploadImage}
                  />
                  <FormErrorMessage>
                    {errors.profileImage && errors.profileImage.message}
                  </FormErrorMessage>
                </FormControl>
              </VStack>
            </ModalBody>

            <ModalFooter>
              <Button type="submit" mr={2} colorScheme="blue">
                更新
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}
