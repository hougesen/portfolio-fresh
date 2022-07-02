/** @jsx h */
import { h } from 'preact';
import { tw } from '@twind';
import Icons from './Icons.tsx';

function Text() {
    function randomHighlightColor(): void {
        const root = document.documentElement;

        const min = 70;
        const max = 360;
        const color = `hsl(${Math.floor(Math.random() * (max - min) + min)}, 80%, 50%)`;

        root.style.setProperty('--highlight-color', color);
    }

    return (
        <section class={tw`my-auto flex flex-col gap-4`}>
            <h1 class={tw`text-5xl lg:text-6xl font-bold uppercase`}>
                <span onMouseOver={() => randomHighlightColor()} class={tw`text__highlight`}>
                    Hi,{' '}
                </span>
                I'm Mads
            </h1>

            <p class={tw`text-2xl`}>
                I am a software developer from Denmark. Lover of all things programming. Currently into Rust, Python and
                TypeScript.
            </p>

            <p class={tw`text-2xl`}>
                I work @{' '}
                <a href='https://cavea.io' rel='noreferrer noopener' target='_blank' class={tw`underline`}>
                    cavea.io
                </a>{' '}
                while studying for my bachelor's degree in web development.
            </p>

            <Icons />
        </section>
    );
}

function Image() {
    return (
        <picture class={tw`w-9/12 lg:w-fit order-first lg:order-1 mr-auto lg:mr-0 ml-auto lg:text-right`}>
            <source srcset='/mads-hougesen-image.webp' type='image/webp' />

            <source srcset='/mads-hougesen-image.png' type='image/png' />

            <img
                src='/mads-hougesen-image.png'
                alt='Image of Mads Hougesen'
                class={tw`mr-auto lg:mr-0 ml-auto lg:text-right`}
            />
        </picture>
    );
}

export default function Hero() {
    return (
        <div class={tw`w-full grid grid-cols-1 lg:grid-cols-2 gap-4`}>
            <Text />

            <Image />
        </div>
    );
}
