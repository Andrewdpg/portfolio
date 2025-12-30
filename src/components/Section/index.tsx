import React from 'react';
import { SectionProps } from './types';
import { ImmersiveVariant } from './variants/Immersive';
import { MinimalVariant } from './variants/Minimal';
import { SplitVariant } from './variants/Split';

export const Section: React.FC<SectionProps> = (props) => {
    const { variant = 'immersive' } = props;

    switch (variant) {
        case 'immersive':
            return <ImmersiveVariant {...props} />;
        case 'minimal':
            return <MinimalVariant {...props} />;
        case 'split':
            return <SplitVariant {...props} />;
        default:
            return <ImmersiveVariant {...props} />;
    }
};

export * from './types';
