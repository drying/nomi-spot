import {
  Avatar,
  Button,
  Card,
  CardBody,
  Flex,
  Grid,
  GridItem,
  Icon,
  Link,
  Text,
} from "@chakra-ui/react";
import { FaMapMarkerAlt, FaInstagram } from "react-icons/fa";
import { StoreCardProps } from "../types/types";

export default function StoreCard({
  storeData,
  isCompact = false,
  onActionClick,
  actionLabel = "詳細",
  actions,
}: StoreCardProps) {
  return (
    <Card maxW={isCompact ? "sm" : "lg"} shadow="md">
      <CardBody>
        <Grid
          templateColumns="auto 1fr auto"
          templateRows="auto auto"
          gap={4}
          alignItems="center"
        >
          <GridItem>
            <Avatar
              size={isCompact ? "lg" : "xl"}
              src={storeData.iconStorageUrl || storeData.iconUrl}
              name={storeData.name}
            />
          </GridItem>
          <GridItem justifySelf="start" alignSelf="center">
            <Text fontSize={isCompact ? "md" : "2xl"} fontWeight="bold">
              {storeData.name}
            </Text>
          </GridItem>
          {onActionClick && (
            <GridItem rowSpan={2}>
              <Flex direction="column" align="flex-end">
                <Button
                  colorScheme="blue"
                  onClick={onActionClick}
                  size={isCompact ? "sm" : "md"}
                  mb={4}
                >
                  {actionLabel}
                </Button>
                {actions}
              </Flex>
            </GridItem>
          )}
          <GridItem colSpan={2}>
            <Flex justify="center" gap={4} mt={isCompact ? 0 : 4}>
              {storeData.instagram && (
                <Flex align="center">
                  <Link
                    href={storeData.instagram}
                    isExternal
                    color="blue.600"
                    fontSize="sm"
                    mr={4}
                  >
                    <Icon as={FaInstagram} mr={2} />
                    instagram
                  </Link>
                </Flex>
              )}

              {storeData.place && (
                <Flex align="center">
                  <Link
                    href={storeData.place}
                    isExternal
                    color="blue.600"
                    fontSize="sm"
                  >
                    <Icon as={FaMapMarkerAlt} color="blue.600" mr={2} />
                    Googleマップ
                  </Link>
                </Flex>
              )}
            </Flex>
          </GridItem>
        </Grid>
      </CardBody>
    </Card>
  );
}
