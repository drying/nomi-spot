import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Heading,
  Icon,
  Link,
} from "@chakra-ui/react";
import { FaMapMarkerAlt, FaInstagram } from "react-icons/fa";
import { StoreCardProps } from "../types/types";

export default function StoreCard({
  storeData,
  iconUrl,
  isCompact = false,
  onActionClick,
  actionLabel = "詳細",
  actions,
}: StoreCardProps) {
  return (
    <Card maxW={isCompact ? "sm" : "lg"} variant="outline">
      <CardBody>
        <Flex align="center" justify="space-between" mb={4}>
          <Avatar
            size={isCompact ? "lg" : "xl"}
            src={iconUrl}
            name={storeData.name}
            mr={4}
          />
          <Box>
            <Heading size={isCompact ? "md" : "lg"}>{storeData.name}</Heading>
          </Box>
          {onActionClick && (
            <Flex direction="column" align="center">
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
          )}
        </Flex>
      </CardBody>

      <Flex justify="center" gap={4} mb={6}>
        {storeData.instagram && (
          <Flex align="center">
            <Icon as={FaInstagram} color="blue.600" mr={2} />
            <Link
              href={storeData.instagram}
              isExternal
              color="blue.600"
              fontSize="sm"
            >
              instagram
            </Link>
          </Flex>
        )}

        {storeData.place && (
          <Flex align="center">
            <Icon as={FaMapMarkerAlt} color="blue.600" mr={2} />
            <Link
              href={storeData.place}
              isExternal
              color="blue.600"
              fontSize="sm"
            >
              Googleマップ
            </Link>
          </Flex>
        )}
      </Flex>
    </Card>
  );
}
