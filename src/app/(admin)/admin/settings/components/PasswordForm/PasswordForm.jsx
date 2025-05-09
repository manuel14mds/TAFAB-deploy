'use client'

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import * as yup from "yup";

function PasswordForm() {
    const currentPswRef = useRef(null);
    const [newPassword, setNewPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    const [errors, setErrors] = useState({
        newPassword: "",
        repeatPassword: "",
    });

    const router = useRouter();

    const schema = yup.object().shape({
        newPassword: yup
            .string()
            .required("La nueva contraseña es obligatoria.")
            .min(8, "Debe tener al menos 8 caracteres.")
            .matches(/[A-Z]/, "Debe incluir al menos una letra mayúscula.")
            .matches(/[a-z]/, "Debe incluir al menos una letra minúscula.")
            .matches(/\d/, "Debe incluir al menos un número."),
        repeatPassword: yup
            .string()
            .oneOf([yup.ref("newPassword")], "Las contraseñas no coinciden.")
            .required("Debe confirmar la nueva contraseña."),
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await schema.validate({ newPassword, repeatPassword }, { abortEarly: false });
            setErrors({});

            const data = {
                currentPass: currentPswRef.current.value,
                newPass: newPassword,
            };

            const response = await fetch('/api/admins/pass/change', {
                method: 'PUT',
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (result.data) {
                alert("Contraseña cambiada con éxito");
                router.push('/admin');
            } else {
                alert("No se pudo cambiar la contraseña, verifique los campos o contraseña actual incorrecta.");
            }

        } catch (err) {
            if (err.inner) {
                const validationErrors = {};
                err.inner.forEach(error => {
                    validationErrors[error.path] = error.message;
                });
                setErrors(validationErrors);
            }
        }
    };

    return (
        <form className="w-full max-w-md" onSubmit={handleSubmit}>
            <h1 className="text-center mt-4 font-bold text-2xl">Cambiar Contraseña</h1>

            <div className="relative flex items-center mt-4">
                <span className="absolute">
                    <svg className="w-6 h-6 mx-3 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round"
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                </span>
                <input
                    type="text"
                    className="block w-full px-10 py-3 text-xs md:text-base text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder="Contraseña actual / Provisional"
                    ref={currentPswRef}
                    required
                />
            </div>

            <div className="relative flex items-center mt-4">
                <span className="absolute">
                    <svg className="w-6 h-6 mx-3 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round"
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                </span>
                <input
                    type="text"
                    className="block w-full px-10 py-3 text-xs md:text-base text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder="Nueva Contraseña"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
            </div>
            {errors.newPassword && (
                <p className="text-red-500 text-sm">{errors.newPassword}</p>
            )}

            <div className="relative flex items-center mt-4">
                <span className="absolute">
                    <svg className="w-6 h-6 mx-3 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round"
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                </span>
                <input
                    type="text"
                    className="block w-full px-10 py-3 text-xs md:text-base text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder="Repite la nueva contraseña"
                    value={repeatPassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                />
            </div>
            {errors.repeatPassword && (
                <p className="text-red-500 text-sm">{errors.repeatPassword}</p>
            )}

            <div className="mt-6">
                <button
                    type="submit"
                    className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                >
                    Cambiar
                </button>

                <div className="mt-6 text-center">
                    <Link href="/admin" className="text-sm text-gray-500 hover:underline">
                        cancelar
                    </Link>
                </div>
            </div>
        </form>
    );
}

export default PasswordForm;
