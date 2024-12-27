import React, { useEffect, useState } from 'react';

export const MobileFlip: React.FC = () => {
    const [isPortrait, setIsPortrait] = useState<boolean>(true);

    const handleOrientationChange = () => {
        setIsPortrait(window.innerHeight > window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener('resize', handleOrientationChange);
        handleOrientationChange(); // Check initial orientation

        return () => {
            window.removeEventListener('resize', handleOrientationChange);
        };
    }, []);

    if (isPortrait) {
        return (
            <div id="warning-message">
                <div className="phone">
                </div>
                <div className="message" dir="rtl">
                    يرجى تدوير جهازك!
                </div>
            </div>
        );
    }

    return null; // Do not render anything if the device is flipped
};
