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
        // 180 días; path=/ para que aplique en todas las rutas.
        document.cookie = "cookieConsent=true; max-age=15552000; path=/; SameSite=Lax";
        setTimeout(() => {
            setHide(true);
        }, 700);
        onAcceptCallback();
    };

    const decline = () => {
        setIsOpen(false);
        // Recordamos también el rechazo para no volver a mostrar el banner en cada visita.
        document.cookie = "cookieConsent=false; max-age=15552000; path=/; SameSite=Lax";
        setTimeout(() => {
            setHide(true);
        }, 700);
        onDeclineCallback();
    };

    useEffect(() => {
        try {
            setIsOpen(true);
            if (document.cookie.includes("cookieConsent=")) {
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
                            <p className="text-lg font-medium">Usamos cookies</p>
                            <CookieIcon className="h-[1.2rem] w-[1.2rem]" />
                        </div>
                        <div className="p-4">
                            <p className="text-sm font-normal text-start">
                                Utilizamos cookies para asegurarnos de que obtengas la mejor experiencia en nuestro sitio web. Para más información sobre cómo usamos las cookies, consulta nuestra política de cookies.
                                <br />
                                <br />
                                <span className="text-xs">Al hacer clic en "<span className="font-medium opacity-80">Aceptar</span>", aceptas el uso de cookies.</span>
                                <br />
                                <Link href="/legal/politica-de-cookies" className="text-xs underline ">Más información.</Link>
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
                <div className="m-3 dark:bg-card bg-background border border-border rounded-lg">
                    <div className="hidden sm:flex items-center justify-between p-3">
                        <p className="text-lg font-medium">Usamos cookies</p>
                        <CookieIcon className="h-[1.2rem] w-[1.2rem]" />
                    </div>
                    <div className="p-3 sm:-mt-2">
                        <p className="text-xs sm:text-sm text-left text-muted-foreground pt-2 sm:pt-0">
                            Utilizamos cookies para asegurarnos de que obtengas la mejor experiencia en nuestro sitio web. Para más información sobre cómo usamos las cookies, consulta nuestra <Link href="/legal/politica-de-cookies" className=" underline">política de cookies</Link>.
                        </p>
                    </div>
                    <div className="p-3 flex flex-row items-center gap-2 mt-1 border-t">
                        <Button onClick={accept} className="flex-1 h-9 rounded-full ">Aceptar</Button>
                        <Button onClick={decline} className="flex-1 h-9 rounded-full " variant="outline">Declinar</Button>
                    </div>
                </div>
            </div>
        )
    )
}