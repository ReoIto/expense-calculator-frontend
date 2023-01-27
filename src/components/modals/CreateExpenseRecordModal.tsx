import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
} from '@chakra-ui/react'
import CreateExpenseRecordForm from '../CreateExpenseRecordForm'

const CreateExpenseRecordModal = ({ isOpen, onClose, users }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="5xl">
      <ModalOverlay backdropFilter="blur(10px)" />
      <ModalContent mx={2}>
        <ModalBody>
          <CreateExpenseRecordForm users={users} />
        </ModalBody>
        <ModalFooter pt={0}>
          <Button onClick={onClose}>キャンセル</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default CreateExpenseRecordModal
