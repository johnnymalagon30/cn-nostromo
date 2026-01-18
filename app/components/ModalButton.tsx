"use client"

import {
    Modal,
    ModalContent,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Link,
    Avatar
  } from "@heroui/react";

  import { Atom } from "lucide-react"
  
  export default function ModalButton() {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
  
    return (
      <>
        <Button onPress={onOpen} as={Link} variant="solid" className="bg-sky-500 text-white"><Atom />About</Button>
        <Modal backdrop="blur" isOpen={isOpen} size="xl" onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                
                <ModalBody className="italic">
                  <Avatar isBordered size="lg" src="images/newheadshot.jpg" className="justify-center mt-6 mx-auto outline-red-500"/>
                  <p>
                    Like many people, I grew up on awesome sci-fi and space exploration video games and movies.
                  </p>
                  <p>
                    Naturally, looking up at the stars and the night sky would throw my mind into a whirlwind.
                    What is out there? Will I ever get to see? Will I ever get to pilot a spaceship? Will Ripley ever get back to Earth...
                  </p>
                  <p>
                    Today, all of those movies and video games still live in my heart, and the love for space and the universe that they sparked drives a curiosity
                    that knows no end. We're blessed with untapped access to knowledge and information from organizations like NASA.

                  </p>
                  <p>
                    I hope this little tool allows you to see something beautiful, something that makes you think about your place in the universe,
                    or something that just makes you think, "Hey, that's pretty cool!".
                  </p>
                  <p className="">
                    - John
                  </p>
                  
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    );
  }
  