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
import {BASE_API} from "../api.js";

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

                    const response = await fetch(BASE_API + '/user/', {
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
                                        <option value="Afghanistan">Afghanistan</option>
                                        <option value="Algeria">Algeria</option>
                                        <option value="Angola">Angola</option>
                                        <option value="Argentina">Argentina</option>
                                        <option value="Australia">Australia</option>
                                        <option value="Azerbaijan">Azerbaijan</option>
                                        <option value="Bangladesh">Bangladesh</option>
                                        <option value="Belgium">Belgium</option>
                                        <option value="Benin">Benin</option>
                                        <option value="Bolivia">Bolivia</option>
                                        <option value="Brazil">Brazil</option>
                                        <option value="Burkina Faso">Burkina Faso</option>
                                        <option value="Burundi">Burundi</option>
                                        <option value="Cambodia">Cambodia</option>
                                        <option value="Cameroon">Cameroon</option>
                                        <option value="Canada">Canada</option>
                                        <option value="Chad">Chad</option>
                                        <option value="Chile">Chile</option>
                                        <option value="China">China</option>
                                        <option value="Colombia">Colombia</option>
                                        <option value="Cuba">Cuba</option>
                                        <option value="Czech Republic">Czech Republic</option>
                                        <option value="DR Congo">DR Congo</option>
                                        <option value="Dominican Republic">Dominican Republic</option>
                                        <option value="Ecuador">Ecuador</option>
                                        <option value="Egypt">Egypt</option>
                                        <option value="Ethiopia">Ethiopia</option>
                                        <option value="France">France</option>
                                        <option value="Germany">Germany</option>
                                        <option value="Ghana">Ghana</option>
                                        <option value="Greece">Greece</option>
                                        <option value="Guatemala">Guatemala</option>
                                        <option value="Guinea">Guinea</option>
                                        <option value="Haiti">Haiti</option>
                                        <option value="Honduras">Honduras</option>
                                        <option value="India">India</option>
                                        <option value="Indonesia">Indonesia</option>
                                        <option value="Iran">Iran</option>
                                        <option value="Iraq">Iraq</option>
                                        <option value="Italy">Italy</option>
                                        <option value="Japan">Japan</option>
                                        <option value="Jordan">Jordan</option>
                                        <option value="Kazakhstan">Kazakhstan</option>
                                        <option value="Kenya">Kenya</option>
                                        <option value="Malaysia">Malaysia</option>
                                        <option value="Malawi">Malawi</option>
                                        <option value="Mali">Mali</option>
                                        <option value="Mexico">Mexico</option>
                                        <option value="Morocco">Morocco</option>
                                        <option value="Mozambique">Mozambique</option>
                                        <option value="Myanmar">Myanmar</option>
                                        <option value="Nepal">Nepal</option>
                                        <option value="Netherlands">Netherlands</option>
                                        <option value="Niger">Niger</option>
                                        <option value="Nigeria">Nigeria</option>
                                        <option value="North Korea">North Korea</option>
                                        <option value="Pakistan">Pakistan</option>
                                        <option value="Peru">Peru</option>
                                        <option value="Philippines">Philippines</option>
                                        <option value="Poland">Poland</option>
                                        <option value="Portugal">Portugal</option>
                                        <option value="Romania">Romania</option>
                                        <option value="Russia">Russia</option>
                                        <option value="Rwanda">Rwanda</option>
                                        <option value="Saudi Arabia">Saudi Arabia</option>
                                        <option value="Senegal">Senegal</option>
                                        <option value="Somalia">Somalia</option>
                                        <option value="South Africa">South Africa</option>
                                        <option value="South Korea">South Korea</option>
                                        <option value="South Sudan">South Sudan</option>
                                        <option value="Spain">Spain</option>
                                        <option value="Sri Lanka">Sri Lanka</option>
                                        <option value="Sudan">Sudan</option>
                                        <option value="Sweden">Sweden</option>
                                        <option value="Syria">Syria</option>
                                        <option value="Tanzania">Tanzania</option>
                                        <option value="Thailand">Thailand</option>
                                        <option value="Tunisia">Tunisia</option>
                                        <option value="Turkey">Turkey</option>
                                        <option value="Uganda">Uganda</option>
                                        <option value="Ukraine">Ukraine</option>
                                        <option value="United Arab Emirates">United Arab Emirates</option>
                                        <option value="United Kingdom">United Kingdom</option>
                                        <option value="United States">United States</option>
                                        <option value="Uzbekistan">Uzbekistan</option>
                                        <option value="Venezuela">Venezuela</option>
                                        <option value="Vietnam">Vietnam</option>
                                        <option value="Zambia">Zambia</option>
                                        <option value="Zimbabwe">Zimbabwe</option>
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