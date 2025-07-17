import { Button, VStack, Heading } from '@chakra-ui/react' //Chakra UI components for layout and styling
import { Link } from 'react-router-dom' //React Router's Link for navigation

//Onboard component: entry screen offering sign in and sign up navigation
export const Onboard = () => {
    return (
        //Vertical stack layout with spacing and top margin
        <VStack spacing={6} mt="100px">
            <Heading>Welcome!</Heading>

            {/* Button linking to login page */}
            <Button as={Link} to="user/login" colorScheme="teal" width="200px">
                Sign In
            </Button>

            {/* Button linking to registration page */}
            <Button as={Link} to="/register" colorScheme="blue" width="200px">
                Sign Up
            </Button>
        </VStack>
    )
}