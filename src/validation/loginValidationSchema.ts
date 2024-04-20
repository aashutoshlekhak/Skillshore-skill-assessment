import * as Yup from "yup";

const loginValidationSchema = Yup.object({
    email: Yup.string()
        .email("Email must be a valid email")
        .required("Email is required")
        .matches(
            /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i,
            "Email must be a valid email"
        ),
    password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters"),
});

export default loginValidationSchema;