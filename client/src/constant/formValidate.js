import * as yup from "yup";

export const registerSchema = yup.object().shape({
    firstName: yup
        .string()
        .required("Firstname is a required field")
        .min(3, "Firstname must be at least 3 characters"),
    // photo: yup
    //     .mixed()
    //     .test('fileType', 'Invalid file format', (value) => {
    //         if (!value) return true; // Пустой файл считается валидным, можно изменить логику здесь
    //         // return (
    //         //     value && ['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(value.type)
    //         // );
    //     }),
    lastName: yup
        .string()
        .required("Lastname is a required field")
        .min(3, "Lastname must be at least 3 characters"),
    phone: yup
        .number()
        .typeError('Phone number must be a number')
        .required('Please supply your phone number')
        .test('len', 'Min 9 numbers', (val) => (val + '').length >= 9),
    email: yup
        .string()
        .email()
        .required("Email is a required field"),
    password: yup
        .string()
        .required("Please enter your password")
        .matches(
            /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
            "Password must contain at least 8 characters, one uppercase, one number and one special casecharacter"
        ),
    confirmPassword: yup
        .string()
        .required("Please confirm your password")
        .oneOf([yup.ref('password'), null], 'Passwords must match')

});
export const loginSchema = yup.object().shape({
    email: yup
        .string()
        .email()
        .required("Email is a required field"),
    password: yup
        .string()
        .required("Please enter your password")
        .matches(
            /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
            "Password must contain at least 8 characters, one uppercase, one number and one special casecharacter"
        )
});

export const commentSchema = yup.object().shape({
    comment: yup.string().required("Text is a required field").trim().min(1, "Text must not be empty"),
  });