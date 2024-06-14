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
import Header from "../components/Header";
import { Cog6ToothIcon } from "@heroicons/react/16/solid";
import Footer from "../components/Footer";

export default function Mypage() {
  return (
    <>
      <Header />
      <Container>
        <Box className="flex justify-center items-center m-6 space-x-4">
          <Avatar name="yukimatsu" src="/profile.jpg" size="lg" />
          <Text className="text-3xl font-bold">yukimatsu</Text>
          <Link href="/register">
            <IconButton
              icon={<Cog6ToothIcon className="h-6 w-6" />}
              aria-label="Register"
              variant="ghost"
            />
          </Link>
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
              <Tab>リスト</Tab>
              <Tab>リスト</Tab>
              <Tab>リスト</Tab>
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
