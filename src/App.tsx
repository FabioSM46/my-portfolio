import { Canvas, useFrame } from '@react-three/fiber';
import { EffectComposer, TiltShift2 } from '@react-three/postprocessing';
import { FileUser, Github, Linkedin } from 'lucide-react';
import { easing } from 'maath';
import { useEffect, useState } from 'react';
import Status from './components/status/Status';
import { Button } from './components/ui/button';

function App() {
    const year = new Date().getFullYear();
    const rootElement = document.getElementById('root');
    const [blur, setBlur] = useState(0.2);
    const [zoomLevel, setZoomLevel] = useState(25);

    const onClickLinkHandler = (url: string) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    const Rig = ({ setBlur }: { setBlur: (blur: number) => void }) => {
        useFrame((state, delta) => {
            easing.damp3(
                state.camera.position,
                [Math.sin(-state.pointer.x) * 5, state.pointer.y * 3.5, zoomLevel + Math.cos(state.pointer.x) * 10],
                0.2,
                delta
            );
            state.camera.lookAt(0, 0, 0);

            const blurIntensity = Math.abs(state.pointer.x) * 0.3;
            setBlur(blurIntensity);
        });

        return null;
    };

    useEffect(() => {
        const updateCameraDistance = () => {
            const width = window.innerWidth;
            setZoomLevel(100000 / (width * 1.5));
        };
        updateCameraDistance();
        window.addEventListener('resize', updateCameraDistance);
        return () => window.removeEventListener('resize', updateCameraDistance);
    }, [zoomLevel]);

    return (
        <>
            <div className="flex justify-center gap-2">
                <Button variant={'default'} onClick={() => onClickLinkHandler('https://github.com/FabioSM46')}>
                    <Github />
                </Button>
                <Button
                    variant={'default'}
                    onClick={() => onClickLinkHandler('https://www.linkedin.com/in/fabio-sdringola-maranga/')}
                >
                    <Linkedin />
                </Button>
                <Button variant={'default'} onClick={() => onClickLinkHandler('/resume.pdf')}>
                    <FileUser />
                </Button>
            </div>
            <Canvas
                eventSource={rootElement ? rootElement : undefined}
                eventPrefix="client"
                shadows
                camera={{ position: [0, 0, 20], fov: 50 }}
            >
                <Status position={[0, 0, -10]} />
                <EffectComposer>
                    <TiltShift2 blur={blur} />
                </EffectComposer>
                <Rig setBlur={setBlur} />
            </Canvas>
            <p className="fixed bottom-0 right-2">© {year} Fabio Sdringola Maranga. All rights reserved.</p>
        </>
    );
}

export default App;
