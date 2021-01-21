import {useFormik} from "formik";
import React from "react";
import {required} from "../../../utils/vilidate";
import ErrorMessage from "../../common/ErrorMessage/ErrorMessage";

const FormLogin = ({login}) => {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            isRememberMe: false
        },
        validate: (values => {
            let errors = {}
            let requiredEmail = required(values.email)
            let requiredPassword = required(values.password)

            if (requiredEmail) errors.email = requiredEmail
            if (requiredPassword) errors.password = requiredPassword

            return errors
        }),
        onSubmit: async (values, {setStatus}) => {
            try {
                await login(values.email, values.password, values.isRememberMe)
            } catch (error) {
                setStatus(error.message)
            }
        }
    });

    return (
        <form className='login__form' onSubmit={formik.handleSubmit}>
            <div>
                <input
                    className="login__form-email"
                    placeholder="Email"
                    type="email"
                    name="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                />
                {formik.errors.email && formik.touched.email &&
                <ErrorMessage className='login__error-message'>{formik.errors.email}</ErrorMessage>}
            </div>
            <div>
                <input
                    className="login__form-password"
                    placeholder="Пароль"
                    type="password"
                    name="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                />
                {formik.errors.password && formik.touched.password &&
                <ErrorMessage className='login__error-message'>{formik.errors.password}</ErrorMessage>}
            </div>
            <div>
                <input
                    id="rememberMe"
                    type="checkbox"
                    name="isRememberMe"
                    value={formik.values.isRememberMe}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                <label htmlFor="rememberMe">Remember me</label>
            </div>
            {!!formik.status && <ErrorMessage className='login__error-message'>{formik.status}</ErrorMessage>}
            <button type="submit" disabled={formik.isSubmitting || formik.errors.email || formik.errors.password}>
                Submit
            </button>
        </form>
    );
};

export default FormLogin;