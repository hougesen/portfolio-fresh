/** @jsx h */
import { h } from 'preact';
import { tw } from '@twind';
import HeroText from './HeroText.tsx';
import HeroImage from '../components/HeroImage.tsx';

export default function Hero() {
    const grid = tw`w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4`;
    return (
        <section class={grid}>
            <HeroText />

            <HeroImage />
        </section>
    );
}
