import * as Yup from "yup";

const enterNewPasswordSchema = Yup.object().shape({
    password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters")
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()+_\-~<>?/.;:{}[\]\\|=" ']).+$/,
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        ),

    password_confirmation: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm Password is required"),
});

export default enterNewPasswordSchema;
