import { Text } from '@react-three/drei';
import { FC } from 'react';

type StatusProps = FC<{
    position: [number, number, number];
}>;

const Status: StatusProps = ({ position }) => {
    return (
        <Text fontSize={14} letterSpacing={-0.025} color="black" position={position}>
            web dev
        </Text>
    );
};

export default Status;
