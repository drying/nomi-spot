"use client";
import { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Container,
  Heading,
  IconButton,
  Image,
  Link,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { Cog6ToothIcon } from "@heroicons/react/16/solid";
import Header from "../components/Header";
import Footer from "../components/Footer";
import RegisterForm from "../components/RegisterForm";
import CustomAlert from "../components/CustomAlert";

export default function Mypage() {
  const [isVisible, setIsVisible] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [currentUsername, setCurrentUsername] = useState("username");
  const [uploadImage, setUploadImage] = useState<string | null>(null);

  useEffect(() => {
    const isAlertShown = localStorage.getItem("isAlertShown");

    if (!isAlertShown) {
      setShowAlert(true);
      localStorage.setItem("isAlertShown", "true");
    }
  }, []);

  const handleOpen = () => {
    setIsVisible(!isVisible);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
    setIsVisible(true);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleUpdateUsername = (newUsername: string) => {
    setCurrentUsername(newUsername);
    setIsVisible(false);
  };

  return (
    <>
      <Header />
      <Container>
        <Box className="flex justify-center items-center m-6 space-x-4">
          {uploadImage ? (
            <Avatar name={currentUsername} src={uploadImage} size="lg" />
          ) : (
            <Avatar name={currentUsername} src="" size="lg" />
          )}
          <Text className="text-3xl font-bold">{currentUsername}</Text>
          <IconButton
            aria-label="Register"
            icon={<Cog6ToothIcon className="h-6 w-6" />}
            variant="ghost"
            onClick={handleOpen}
          />
          {showAlert && (
            <CustomAlert isOpen={showAlert} onClose={handleCloseAlert} />
          )}
          {isVisible && (
            <RegisterForm
              isOpen={isVisible}
              onClose={handleClose}
              currentUsername={currentUsername}
              onUpdateUsername={handleUpdateUsername}
              setUploadImage={setUploadImage}
              uploadImage={uploadImage}
            />
          )}
        </Box>
        <Box className="flex justify-items-start w-96 h-24 border-2 border-gray-100 rounded-md p-2 mx-auto my-6">
          <Text className="text-sm text-gray-600">
            テストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテスト
          </Text>
        </Box>
        <Box>
          <Tabs align="center">
            <TabList>
              {/* map関数でリストを作成する */}
              <Tab>行きたい</Tab>
              <Tab>行った</Tab>
              <Tab>お気に入り</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <Card
                  direction={{ base: "column", sm: "row" }}
                  overflow="hidden"
                  variant="outline"
                  size="sm"
                >
                  <Image
                    objectFit="cover"
                    maxW={{ base: "100%", sm: "150px" }}
                    src="/profile.jpg"
                    alt="Caffe Latte"
                  />

                  <Stack>
                    <CardBody>
                      <Heading size="md">The perfect latte</Heading>

                      <Text py="2">
                        Caffè latte is a coffee beverage of Italian origin made
                        with espresso and steamed milk.
                      </Text>
                    </CardBody>

                    <CardFooter>
                      <Link href="/store">
                        <Button variant="solid" colorScheme="blue">
                          Buy Latte
                        </Button>
                      </Link>
                    </CardFooter>
                  </Stack>
                </Card>
                <Card
                  direction={{ base: "column", sm: "row" }}
                  overflow="hidden"
                  variant="outline"
                  size="sm"
                >
                  <Image
                    objectFit="cover"
                    maxW={{ base: "100%", sm: "150px" }}
                    src="/profile.jpg"
                    alt="Caffe Latte"
                  />

                  <Stack>
                    <CardBody>
                      <Heading size="md">The perfect latte</Heading>

                      <Text py="2">
                        Caffè latte is a coffee beverage of Italian origin made
                        with espresso and steamed milk.
                      </Text>
                    </CardBody>

                    <CardFooter>
                      <Button variant="solid" colorScheme="blue">
                        Buy Latte
                      </Button>
                    </CardFooter>
                  </Stack>
                </Card>
                <Card
                  direction={{ base: "column", sm: "row" }}
                  overflow="hidden"
                  variant="outline"
                  size="sm"
                >
                  <Image
                    objectFit="cover"
                    maxW={{ base: "100%", sm: "150px" }}
                    src="/profile.jpg"
                    alt="Caffe Latte"
                  />

                  <Stack>
                    <CardBody>
                      <Heading size="md">The perfect latte</Heading>

                      <Text py="2">
                        Caffè latte is a coffee beverage of Italian origin made
                        with espresso and steamed milk.
                      </Text>
                    </CardBody>

                    <CardFooter>
                      <Button variant="solid" colorScheme="blue">
                        Buy Latte
                      </Button>
                    </CardFooter>
                  </Stack>
                </Card>
                <Card
                  direction={{ base: "column", sm: "row" }}
                  overflow="hidden"
                  variant="outline"
                  size="sm"
                >
                  <Image
                    objectFit="cover"
                    maxW={{ base: "100%", sm: "150px" }}
                    src="/profile.jpg"
                    alt="Caffe Latte"
                  />

                  <Stack>
                    <CardBody>
                      <Heading size="md">The perfect latte</Heading>

                      <Text py="2">
                        Caffè latte is a coffee beverage of Italian origin made
                        with espresso and steamed milk.
                      </Text>
                    </CardBody>

                    <CardFooter>
                      <Button variant="solid" colorScheme="blue">
                        Buy Latte
                      </Button>
                    </CardFooter>
                  </Stack>
                </Card>
                <Card
                  direction={{ base: "column", sm: "row" }}
                  overflow="hidden"
                  variant="outline"
                  size="sm"
                >
                  <Image
                    objectFit="cover"
                    maxW={{ base: "100%", sm: "150px" }}
                    src="/profile.jpg"
                    alt="Caffe Latte"
                  />

                  <Stack>
                    <CardBody>
                      <Heading size="md">The perfect latte</Heading>

                      <Text py="2">
                        Caffè latte is a coffee beverage of Italian origin made
                        with espresso and steamed milk.
                      </Text>
                    </CardBody>

                    <CardFooter>
                      <Button variant="solid" colorScheme="blue">
                        Buy Latte
                      </Button>
                    </CardFooter>
                  </Stack>
                </Card>
              </TabPanel>
              <TabPanel>
                <Card
                  direction={{ base: "column", sm: "row" }}
                  overflow="hidden"
                  variant="outline"
                  size="sm"
                >
                  <Image
                    objectFit="cover"
                    maxW={{ base: "100%", sm: "150px" }}
                    src="/profile.jpg"
                    alt="Caffe Latte"
                  />

                  <Stack>
                    <CardBody>
                      <Heading size="md">The perfect latte</Heading>

                      <Text py="2">
                        Caffè latte is a coffee beverage of Italian origin made
                        with espresso and steamed milk.
                      </Text>
                    </CardBody>

                    <CardFooter>
                      <Button variant="solid" colorScheme="blue">
                        Buy Latte
                      </Button>
                    </CardFooter>
                  </Stack>
                </Card>
                <Card
                  direction={{ base: "column", sm: "row" }}
                  overflow="hidden"
                  variant="outline"
                  size="sm"
                >
                  <Image
                    objectFit="cover"
                    maxW={{ base: "100%", sm: "150px" }}
                    src="/profile.jpg"
                    alt="Caffe Latte"
                  />

                  <Stack>
                    <CardBody>
                      <Heading size="md">The perfect latte</Heading>

                      <Text py="2">
                        Caffè latte is a coffee beverage of Italian origin made
                        with espresso and steamed milk.
                      </Text>
                    </CardBody>

                    <CardFooter>
                      <Button variant="solid" colorScheme="blue">
                        Buy Latte
                      </Button>
                    </CardFooter>
                  </Stack>
                </Card>
                <Card
                  direction={{ base: "column", sm: "row" }}
                  overflow="hidden"
                  variant="outline"
                  size="sm"
                >
                  <Image
                    objectFit="cover"
                    maxW={{ base: "100%", sm: "150px" }}
                    src="/profile.jpg"
                    alt="Caffe Latte"
                  />

                  <Stack>
                    <CardBody>
                      <Heading size="md">The perfect latte</Heading>

                      <Text py="2">
                        Caffè latte is a coffee beverage of Italian origin made
                        with espresso and steamed milk.
                      </Text>
                    </CardBody>

                    <CardFooter>
                      <Button variant="solid" colorScheme="blue">
                        Buy Latte
                      </Button>
                    </CardFooter>
                  </Stack>
                </Card>
                <Card
                  direction={{ base: "column", sm: "row" }}
                  overflow="hidden"
                  variant="outline"
                  size="sm"
                >
                  <Image
                    objectFit="cover"
                    maxW={{ base: "100%", sm: "150px" }}
                    src="/profile.jpg"
                    alt="Caffe Latte"
                  />

                  <Stack>
                    <CardBody>
                      <Heading size="md">The perfect latte</Heading>

                      <Text py="2">
                        Caffè latte is a coffee beverage of Italian origin made
                        with espresso and steamed milk.
                      </Text>
                    </CardBody>

                    <CardFooter>
                      <Button variant="solid" colorScheme="blue">
                        Buy Latte
                      </Button>
                    </CardFooter>
                  </Stack>
                </Card>
                <Card
                  direction={{ base: "column", sm: "row" }}
                  overflow="hidden"
                  variant="outline"
                  size="sm"
                >
                  <Image
                    objectFit="cover"
                    maxW={{ base: "100%", sm: "150px" }}
                    src="/profile.jpg"
                    alt="Caffe Latte"
                  />

                  <Stack>
                    <CardBody>
                      <Heading size="md">The perfect latte</Heading>

                      <Text py="2">
                        Caffè latte is a coffee beverage of Italian origin made
                        with espresso and steamed milk.
                      </Text>
                    </CardBody>

                    <CardFooter>
                      <Button variant="solid" colorScheme="blue">
                        Buy Latte
                      </Button>
                    </CardFooter>
                  </Stack>
                </Card>
              </TabPanel>
              <TabPanel>
                <Card
                  direction={{ base: "column", sm: "row" }}
                  overflow="hidden"
                  variant="outline"
                  size="sm"
                >
                  <Image
                    objectFit="cover"
                    maxW={{ base: "100%", sm: "150px" }}
                    src="/profile.jpg"
                    alt="Caffe Latte"
                  />

                  <Stack>
                    <CardBody>
                      <Heading size="md">The perfect latte</Heading>

                      <Text py="2">
                        Caffè latte is a coffee beverage of Italian origin made
                        with espresso and steamed milk.
                      </Text>
                    </CardBody>

                    <CardFooter>
                      <Button variant="solid" colorScheme="blue">
                        Buy Latte
                      </Button>
                    </CardFooter>
                  </Stack>
                </Card>
                <Card
                  direction={{ base: "column", sm: "row" }}
                  overflow="hidden"
                  variant="outline"
                  size="sm"
                >
                  <Image
                    objectFit="cover"
                    maxW={{ base: "100%", sm: "150px" }}
                    src="/profile.jpg"
                    alt="Caffe Latte"
                  />

                  <Stack>
                    <CardBody>
                      <Heading size="md">The perfect latte</Heading>

                      <Text py="2">
                        Caffè latte is a coffee beverage of Italian origin made
                        with espresso and steamed milk.
                      </Text>
                    </CardBody>

                    <CardFooter>
                      <Button variant="solid" colorScheme="blue">
                        Buy Latte
                      </Button>
                    </CardFooter>
                  </Stack>
                </Card>
                <Card
                  direction={{ base: "column", sm: "row" }}
                  overflow="hidden"
                  variant="outline"
                  size="sm"
                >
                  <Image
                    objectFit="cover"
                    maxW={{ base: "100%", sm: "150px" }}
                    src="/profile.jpg"
                    alt="Caffe Latte"
                  />

                  <Stack>
                    <CardBody>
                      <Heading size="md">The perfect latte</Heading>

                      <Text py="2">
                        Caffè latte is a coffee beverage of Italian origin made
                        with espresso and steamed milk.
                      </Text>
                    </CardBody>

                    <CardFooter>
                      <Button variant="solid" colorScheme="blue">
                        Buy Latte
                      </Button>
                    </CardFooter>
                  </Stack>
                </Card>
                <Card
                  direction={{ base: "column", sm: "row" }}
                  overflow="hidden"
                  variant="outline"
                  size="sm"
                >
                  <Image
                    objectFit="cover"
                    maxW={{ base: "100%", sm: "150px" }}
                    src="/profile.jpg"
                    alt="Caffe Latte"
                  />

                  <Stack>
                    <CardBody>
                      <Heading size="md">The perfect latte</Heading>

                      <Text py="2">
                        Caffè latte is a coffee beverage of Italian origin made
                        with espresso and steamed milk.
                      </Text>
                    </CardBody>

                    <CardFooter>
                      <Button variant="solid" colorScheme="blue">
                        Buy Latte
                      </Button>
                    </CardFooter>
                  </Stack>
                </Card>
                <Card
                  direction={{ base: "column", sm: "row" }}
                  overflow="hidden"
                  variant="outline"
                  size="sm"
                >
                  <Image
                    objectFit="cover"
                    maxW={{ base: "100%", sm: "150px" }}
                    src="/profile.jpg"
                    alt="Caffe Latte"
                  />

                  <Stack>
                    <CardBody>
                      <Heading size="md">The perfect latte</Heading>

                      <Text py="2">
                        Caffè latte is a coffee beverage of Italian origin made
                        with espresso and steamed milk.
                      </Text>
                    </CardBody>

                    <CardFooter>
                      <Button variant="solid" colorScheme="blue">
                        Buy Latte
                      </Button>
                    </CardFooter>
                  </Stack>
                </Card>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
      <Footer />
    </>
  );
}
