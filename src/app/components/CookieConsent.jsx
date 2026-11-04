"use client";

import { CookieIcon } from "lucide-react";
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function CookieConsent({ variant = "default", demo = false, onAcceptCallback = () => { }, onDeclineCallback = () => { } }) {
    const [isOpen, setIsOpen] = useState(false);
    const [hide, setHide] = useState(false);

    const accept = () => {
        setIsOpen(false);
        document.cookie = "cookieConsent=true; expires=Fri, 31 Dec 9999 23:59:59 GMT";
        setTimeout(() => {
            setHide(true);
        }, 700);
        onAcceptCallback();
    };

    const decline = () => {
        setIsOpen(false);
        document.cookie = "cookieConsent=false; max-age=2592000; path=/"; // recuerda la decisión 30 días
        setTimeout(() => {
            setHide(true);
        }, 700);
        onDeclineCallback();
    };

    useEffect(() => {
        try {
            setIsOpen(true);
            if (/cookieConsent=(true|false)/.test(document.cookie)) {
                if (!demo) {
                    setIsOpen(false);
                    setTimeout(() => {
                        setHide(true);
                    }, 700);
                }
            }
        }
        catch (e) {
            // console.log("Error: ", e);
        }
    }, []);

    return (
        variant == "default" ? (
            <div className={cn("fixed z-[200] bottom-0 left-0 right-0 sm:left-4 sm:bottom-4 w-full sm:max-w-md duration-700", !isOpen ? "transition-[opacity,transform] translate-y-8 opacity-0" : "transition-[opacity,transform] translate-y-0 opacity-100", hide && "hidden")}>
                <div className="dark:bg-card bg-background rounded-md m-3 border border-border shadow-lg">
                    <div className="grid gap-2">
                        <div className="border-b border-border h-14 flex items-center justify-between p-4">
                            <h1 className="text-lg font-medium">Usamos cookies</h1>
                            <CookieIcon className="h-[1.2rem] w-[1.2rem]" />
                        </div>
                        <div className="p-4">
                            <p className="text-sm font-normal text-start">
                                Utilizamos cookies para asegurarnos de que obtengas la mejor experiencia en nuestro sitio web. Para más información sobre cómo usamos las cookies, consulta nuestra política de cookies.
                                <br />
                                <br />
                                <span className="text-xs">Al hacer clic en "<span className="font-medium opacity-80">Aceptar</span>", aceptas el uso de cookies.</span>
                                <br />
                                <Link href="https://www.bridgecapital.mx/pdf/politicacookies.pdf" target="_blank" className="text-xs underline ">Más información.</Link>
                            </p>
                        </div>
                        <div className="flex flex-col gap-2 p-4 py-5 border-t border-border dark:bg-background/20">
                            <Button onClick={accept} className="w-full ">Aceptar</Button>
                            <Button onClick={decline} className="w-full " variant="secondary">Declinar</Button>
                        </div>
                    </div>
                </div>
            </div>
        ) : variant == "small" && (
            <div className={cn("fixed z-[200] bottom-0 left-0 right-0 sm:left-4 sm:bottom-4 w-full sm:max-w-md duration-700", !isOpen ? "transition-[opacity,transform] translate-y-8 opacity-0" : "transition-[opacity,transform] translate-y-0 opacity-100", hide && "hidden")}>
                <div className="m-2 sm:m-3 dark:bg-card bg-background border border-border rounded-lg shadow-lg">
                    {/* El encabezado solo se muestra en pantallas grandes para no tapar el contenido en celular */}
                    <div className="hidden sm:flex items-center justify-between p-3">
                        <h1 className="text-lg font-medium">Usamos cookies</h1>
                        <CookieIcon className="h-[1.2rem] w-[1.2rem]" />
                    </div>
                    <div className="p-3 sm:pt-0 sm:-mt-2">
                        <p className="text-xs sm:text-sm text-left text-muted-foreground ">
                            Utilizamos cookies para asegurarnos de que obtengas la mejor experiencia en nuestro sitio web. Para más información sobre cómo usamos las cookies, consulta nuestra <Link href="https://www.bridgecapital.mx/pdf/politicacookies.pdf" target="_blank" className=" underline">política de cookies</Link>.
                        </p>
                    </div>
                    <div className="px-3 pb-3 flex flex-row items-center gap-2">
                        <Button onClick={accept} className="flex-1 h-9 rounded-full ">Aceptar</Button>
                        <Button onClick={decline} className="flex-1 h-9 rounded-full " variant="outline">Declinar</Button>
                    </div>
                </div>
            </div>
        )
    )
}