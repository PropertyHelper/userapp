import {
    FormControl,
    FormLabel,
    Input,
    Button,
    FormErrorMessage,
    Box,
    VStack,
    Heading,
    useToast,
} from '@chakra-ui/react' //Chakra UI components for styling and layout
import { Field, Form, Formik } from 'formik' //Formik components for form handling
import * as Yup from 'yup' //Yup for validation schema
import {useNavigate} from "react-router-dom"; //Hook for programmatic navigation
import {BASE_API} from "../api.js"; //Base API endpoint constant

//Login component: handles login form, validation, and authentication
export const Login = () => {
    const toast = useToast() // Chakra toast for notifications

    //Yup schema for login form validation
    const loginSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().required('Password is required'),
    })

    const navigate = useNavigate(); //React Router hook for redirecting

    //Handle form submission
    const handleLogin = async (values, actions) => {
        try {
            //Make POST request to login endpoint with form values
            const response = await fetch(BASE_API +'/user/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values),
            });

            //If login fails, show error toast
            if (!response.ok) {
                throw new Error('Invalid credentials');
            }

            //Parse response, extract token
            const data = await response.json();
            const token = data.token;

            //Store token in localStorage
            localStorage.setItem('jwt', token);

            //Show success toast
            toast({
                title: 'Login successful',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });

            //Navigate to user page
            navigate('/user');
        } catch (error) {
            //Show error toast on failure
            toast({
                title: 'Login failed',
                description: error.message,
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        } finally {
            //Reset submitting state in Formik
            actions.setSubmitting(false);
        }
    };

    return (
        <Box maxW="400px" mx="auto" mt="100px">
            <Heading mb={6}>Login</Heading>
            {/* Formik wrapper handles form state and validation */}
            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={loginSchema}
                onSubmit={handleLogin}
            >
                {(props) => (
                    <Form>
                        <VStack spacing={4}>
                            {/* Email field with validation */}
                            <Field name="email">
                                {({ field, form }) => (
                                    <FormControl isInvalid={form.errors.email && form.touched.email} isRequired>
                                        <FormLabel>Email</FormLabel>
                                        <Input {...field} type="email" />
                                        <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>

                            {/* Password field with validation */}
                            <Field name="password">
                                {({ field, form }) => (
                                    <FormControl isInvalid={form.errors.password && form.touched.password} isRequired>
                                        <FormLabel>Password</FormLabel>
                                        <Input {...field} type="password" />
                                        <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>

                            {/* Submit button with loading indicator */}
                            <Button
                                type="submit"
                                colorScheme="teal"
                                isfullwidth = "true"
                                isLoading={props.isSubmitting}
                            >
                                Login
                            </Button>
                        </VStack>
                    </Form>
                )}
            </Formik>
        </Box>
    )
}