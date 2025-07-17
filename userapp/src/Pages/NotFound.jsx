import {Link} from 'react-router-dom' //React Router's Link for navigation
import { Box, Heading, Text, Button, VStack } from "@chakra-ui/react" //Chakra UI components

//NotFound component: renders a 404 error page with a link back to home
export function NotFound() {
    return (
        //Full-height centered container with light background
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