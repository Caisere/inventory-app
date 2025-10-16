'use client'

import { Spinner } from "@/components/ui/spinner";
import { useFormStatus } from "react-dom";


interface FormActionBtnProps {
    children: React.ReactNode;
    action:string;
}

export function FormActionBtn ({children, action}: FormActionBtnProps) {

    const {pending:formAction} = useFormStatus()

    return (
        <button className={`${action === 'addProduct' ? 'px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700' : 'text-red-600 hover:text-red-900'} cursor-pointer`} type="submit" disabled={formAction}>
            {formAction ? <Spinner/> : children}
        </button>
    )
}