import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    Button,
    Select,
    Box,
    RadioGroup,
    Radio,
    Stack,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import validator from 'email-validator';
import { useNavigate, useSearchParams } from "react-router-dom";

export const Register = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const uid = searchParams.get('uid'); // Read the query param

    const validateRequired = (value) => (!value ? 'This field is required' : undefined);

    const validateEmail = (value) => {
        if (!value) return 'Email is required';
        if (!validator.validate(value)) return 'Invalid email address';
    };

    const validateDateOfBirth = (value) => {
        if (!value) return 'Date of birth is required';
        if (new Date(value) > new Date()) return 'Date cannot be in the future';
    };

    const validatePassword = (value) => {
        if (!value) return 'Password is required';
        if (value.length < 6) return 'Password must be at least 6 characters';
    };

    return (
        <Formik
            initialValues={{
                first_name: '',
                last_name: '',
                email: '',
                date_of_birth: '',
                user_name: '',
                nationality: '',
                password: '',
                gender: '',
            }}
            onSubmit={async (values, actions) => {
                try {
                    // Include uid if present
                    const payload = uid ? { ...values, uid } : values;

                    const response = await fetch('http://10.128.55.69:8002/user/', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(payload),
                    });

                    if (!response.ok) {
                        const errorData = await response.json();
                        console.error("Server responded with error:", errorData);
                    } else {
                        const result = await response.json();
                        localStorage.setItem('jwt', result.token);
                        navigate('/user');
                    }
                } catch (error) {
                    console.error("Error submitting form:", error);
                } finally {
                    actions.setSubmitting(false);
                }
            }}
        >
            {(props) => (
                <Form>
                    <Box maxW="600px" mx="auto" mt="50px" display="flex" flexDirection="column" gap={4}>
                        <Field name="first_name" validate={validateRequired}>
                            {({ field, form }) => (
                                <FormControl isInvalid={form.errors.first_name && form.touched.first_name}>
                                    <FormLabel>First Name</FormLabel>
                                    <Input {...field} placeholder="First Name" />
                                    <FormErrorMessage>{form.errors.first_name}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>

                        <Field name="last_name" validate={validateRequired}>
                            {({ field, form }) => (
                                <FormControl isInvalid={form.errors.last_name && form.touched.last_name}>
                                    <FormLabel>Last Name</FormLabel>
                                    <Input {...field} placeholder="Last Name" />
                                    <FormErrorMessage>{form.errors.last_name}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>

                        <Field name="email" validate={validateEmail}>
                            {({ field, form }) => (
                                <FormControl isInvalid={form.errors.email && form.touched.email}>
                                    <FormLabel>Email</FormLabel>
                                    <Input {...field} placeholder="me@example.com" type="email" />
                                    <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>

                        <Field name="date_of_birth" validate={validateDateOfBirth}>
                            {({ field, form }) => (
                                <FormControl isInvalid={form.errors.date_of_birth && form.touched.date_of_birth}>
                                    <FormLabel>Date of Birth</FormLabel>
                                    <Input {...field} type="date" />
                                    <FormErrorMessage>{form.errors.date_of_birth}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>

                        <Field name="user_name" validate={validateRequired}>
                            {({ field, form }) => (
                                <FormControl isInvalid={form.errors.user_name && form.touched.user_name}>
                                    <FormLabel>User Name</FormLabel>
                                    <Input {...field} placeholder="User name" />
                                    <FormErrorMessage>{form.errors.user_name}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>

                        <Field name="nationality" validate={validateRequired}>
                            {({ field, form }) => (
                                <FormControl isInvalid={form.errors.nationality && form.touched.nationality}>
                                    <FormLabel>Nationality</FormLabel>
                                    <Select {...field} placeholder="Select nationality">
                                        <option value="American">American</option>
                                        <option value="Australian">Australian</option>
                                        <option value="Canadian">Canadian</option>
                                        <option value="Other">Other</option>
                                    </Select>
                                    <FormErrorMessage>{form.errors.nationality}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>

                        <Field name="gender" validate={validateRequired}>
                            {({ field, form }) => (
                                <FormControl isInvalid={form.errors.gender && form.touched.gender}>
                                    <FormLabel>Gender</FormLabel>
                                    <RadioGroup {...field} onChange={val => form.setFieldValue("gender", val)}>
                                        <Stack direction="row">
                                            <Radio value="male">Male</Radio>
                                            <Radio value="female">Female</Radio>
                                            <Radio value="other">Other</Radio>
                                        </Stack>
                                    </RadioGroup>
                                    <FormErrorMessage>{form.errors.gender}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>

                        <Field name="password" validate={validatePassword}>
                            {({ field, form }) => (
                                <FormControl isInvalid={form.errors.password && form.touched.password}>
                                    <FormLabel>Password</FormLabel>
                                    <Input {...field} type="password" placeholder="Enter password" />
                                    <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>

                        <Button
                            mt={4}
                            colorScheme="teal"
                            isLoading={props.isSubmitting}
                            type="submit"
                        >
                            Submit
                        </Button>
                    </Box>
                </Form>
            )}
        </Formik>
    );
};