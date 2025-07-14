import {Link} from 'react-router-dom'
import { Box, Heading, Text, Button, VStack } from "@chakra-ui/react"

export function NotFound() {
    return (
        <Box h="100vh" display="flex" alignItems="center" justifyContent="center" bg="gray.50">
            <VStack spacing={4}>
                <Heading size="2xl" color="red.500">404</Heading>
                <Text fontSize="lg" color="gray.600">Page Not Found</Text>
                <Button as={Link} to="/" colorScheme="blue" size="md">
                    Go to Home Page
                </Button>
            </VStack>
        </Box>
    )
}