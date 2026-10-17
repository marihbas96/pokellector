"use client";

import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";

type CardCaptureProps = {
    verified: boolean
}

const CardCapture = ({verified} : CardCaptureProps) => {

    // stream and video objects
    const videoRef = useRef<HTMLVideoElement>(null);
    const streamRef = useRef<MediaStream | null>(null);

    const [cameraActive, setCameraActive] = useState(false);

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: { ideal: "environment" }
                },
                audio: false,
            });

            streamRef.current = stream;

            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }

            setCameraActive(true);
        } catch (error) {
            console.error("Could not access the camera:", error);
        }
    }

    return (
        <div className="flex flex-col items-center">
            {
                !cameraActive && (
                    <Button onClick={startCamera} size="lg" className="w-1/4 mt-8 bg-[#0D63A5] transition-colors hover:bg-[#083358]">
                        Add card
                    </Button>
                )
            }

            <video ref={videoRef} autoPlay playsInline/>
        </div>
    )
}

export default CardCapture