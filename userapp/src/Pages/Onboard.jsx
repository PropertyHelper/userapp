import { Button, VStack, Heading } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

export const Onboard = () => {
    return (
        <VStack spacing={6} mt="100px">
            <Heading>Welcome!</Heading>

            <Button as={Link} to="user/login" colorScheme="teal" width="200px">
                Sign In
            </Button>

            <Button as={Link} to="/register" colorScheme="blue" width="200px">
                Sign Up
            </Button>
        </VStack>
    )
}
