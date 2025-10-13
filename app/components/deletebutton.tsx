'use client'

import { Spinner } from "@/components/ui/spinner";
import { Trash2 } from "lucide-react";
import { useFormStatus } from "react-dom";

export function DeleteButton () {

    const {pending:isDeleting} = useFormStatus()

    return (
        <button className="text-red-600 hover:text-red-900 cursor-pointer" type="submit" disabled={isDeleting}>
            {isDeleting ? <Spinner/> : <Trash2 className="w-4 h-4"  />}
        </button>
    )
}