/** @jsx h */
import { h } from 'preact';
import { tw } from '@twind';
import { useState } from 'preact/hooks';

function Text() {
    const [highlightColor, setHighlightColor] = useState('#ff142e');

    function randomHighlightColor(): void {
        console.log('hello');
        const min = 70;
        const max = 360;
        const color = `hsla(${Math.floor(Math.random() * (max - min) + min)}, 80%, 50%, 1)`;

        setHighlightColor(color);
        console.log('ASDAWD');
    }

    return (
        <div class={tw`my-auto`}>
            <h1 class={tw`text-6xl font-bold mb-4`}>
                <span style={{ color: highlightColor }} onMouseOver={() => randomHighlightColor()}>
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
        </div>
    );
}

function Image() {
    return (
        <picture class={tw`w-9/12 md:w-fit order-first md:order-1 mr-auto md:mr-0 ml-auto md:text-right`}>
            <source srcset='/mads-hougesen-image.webp' type='image/webp' />

            <source srcset='/mads-hougesen-image.png' type='image/png' />

            <img
                src='/mads-hougesen-image.png'
                alt='Image of Mads Hougesen'
                class={tw`mr-auto md:mr-0 ml-auto md:text-right`}
            />
        </picture>
    );
}

export default function Hero() {
    return (
        <div class={tw`w-full grid grid-cols-1 md:grid-cols-2 gap-4`}>
            <Text />

            <Image />
        </div>
    );
}
