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
    const canvasRef = useRef<HTMLCanvasElement>(null);

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

    const takePhoto = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;

        if (!video || !canvas) return;

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const context = canvas.getContext("2d");

        context?.drawImage(video,0,0,canvas.width,canvas.height);

        canvas.toBlob(
            (blob) => {
                if (!blob) return;

                const imageFile = new File(
                    [blob],
                    "card-image.jpg",
                    {
                        type: "image/jpeg",
                    }
                );

                console.log(imageFile);
            },
            "image/jpeg",
            0.9   
        );

        // exit camera stream
        streamRef.current?.getTracks().forEach((track) => track.stop());

        streamRef.current = null;
        setCameraActive(false);
    };

    return (
        <div className="flex flex-col items-center">
            {
                !cameraActive ? (
                    <Button onClick={startCamera} size="lg" className="w-1/4 mt-8 bg-[#0D63A5] transition-colors hover:bg-[#083358]">
                        Add card
                    </Button>
                ) :
                <div className="relative">
                    <video ref={videoRef} autoPlay playsInline className="w-full"/>
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-64 aspect-[2.5/3.5] border-2 rounded-xl"> </div>
                    </div>
                    <Button onClick={takePhoto} size="lg" className="w-1/4 mt-8 bg-[#0D63A5] transition-colors hover:bg-[#083358]">
                        Take picture
                    </Button>
                </div>
            }
        </div>
    )
}

export default CardCapture