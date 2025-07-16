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
} from '@chakra-ui/react'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import {useNavigate} from "react-router-dom";
import {BASE_API} from "../api.js";

export const Login = () => {
    const toast = useToast()

    const loginSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().required('Password is required'),
    })

    const navigate = useNavigate();

    const handleLogin = async (values, actions) => {
        try {
            const response = await fetch(BASE_API +'/user/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values),
            });

            if (!response.ok) {
                throw new Error('Invalid credentials');
            }

            const data = await response.json();
            const token = data.token;

            localStorage.setItem('jwt', token);

            toast({
                title: 'Login successful',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });

            navigate('/user');
        } catch (error) {
            toast({
                title: 'Login failed',
                description: error.message,
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        } finally {
            actions.setSubmitting(false);
        }
    };

    return (
        <Box maxW="400px" mx="auto" mt="100px">
            <Heading mb={6}>Login</Heading>
            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={loginSchema}
                onSubmit={handleLogin}
            >
                {(props) => (
                    <Form>
                        <VStack spacing={4}>
                            <Field name="email">
                                {({ field, form }) => (
                                    <FormControl isInvalid={form.errors.email && form.touched.email} isRequired>
                                        <FormLabel>Email</FormLabel>
                                        <Input {...field} type="email" />
                                        <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>

                            <Field name="password">
                                {({ field, form }) => (
                                    <FormControl isInvalid={form.errors.password && form.touched.password} isRequired>
                                        <FormLabel>Password</FormLabel>
                                        <Input {...field} type="password" />
                                        <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>

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