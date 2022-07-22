import { FC } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
} from '@chakra-ui/react';
import { Formik, Form } from 'formik';

interface AddChannelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddChannelModal: FC<AddChannelModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <Formik
          initialValues={{ name: '', avatar: '', participants: '' }}
          onSubmit={async (values) => {
            console.log(values);
            onClose();
          }}
        >
          {({ isSubmitting, getFieldProps }) => (
            <Form>
              <ModalHeader>Create Channel</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input placeholder="Name" {...getFieldProps('name')} />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Avatar</FormLabel>
                  <Input placeholder="avatar" {...getFieldProps('avatar')} />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Participants emails</FormLabel>
                  <Input
                    placeholder="participants emails"
                    {...getFieldProps('participants')}
                  />
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button
                  type="submit"
                  colorScheme="blue"
                  mr={3}
                  isLoading={isSubmitting}
                  isDisabled={isSubmitting}
                >
                  Create!
                </Button>
                <Button type="button" onClick={onClose}>
                  Cancel
                </Button>
              </ModalFooter>
            </Form>
          )}
        </Formik>
      </ModalContent>
    </Modal>
  );
};

export { AddChannelModal };
