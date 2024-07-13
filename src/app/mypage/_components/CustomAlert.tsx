import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Text,
} from "@chakra-ui/react";

type AlertToggle = {
  isOpen: boolean;
  onClose: () => void;
};

export default function CustomAlert({ isOpen, onClose }: AlertToggle) {
  return (
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>お知らせ</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>ユーザーネームとアイコン画像を登録してください</Text>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            OK
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
