/** @jsx h */
import { h } from 'preact';
import { tw } from '@twind';
import Icons from '../components/Icons.tsx';

export default function HeroText() {
    function randomHighlightColor(): void {
        const root = document.documentElement;

        const min = 70;
        const max = 360;
        const color = `hsl(${Math.floor(Math.random() * (max - min) + min)}, 80%, 50%)`;

        root.style.setProperty('--highlight-color', color);
    }

    return (
        <div class={tw`my-auto flex flex-col gap-4`}>
            <h1 class={tw`text-5xl lg:text-6xl font-bold uppercase  text__flip`}>
                <span onMouseOver={() => randomHighlightColor()} class={tw`text__highlight`}>
                    Hi,{' '}
                </span>
                I'm Mads
            </h1>

            <p class={tw`text-2xl  text__flip`}>
                I am a software developer from Denmark. Lover of all things programming. Currently into Rust, Python and
                TypeScript.
            </p>

            <p class={tw`text-2xl  text__flip`}>
                I work @{' '}
                <a href='https://cavea.io' rel='noreferrer noopener' target='_blank' class={tw`underline`}>
                    cavea.io
                </a>{' '}
                while studying for my bachelor's degree in web development.
            </p>

            <Icons />
        </div>
    );
}
