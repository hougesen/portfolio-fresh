/** @jsx h */
import { h } from 'preact';
import { tw } from '@twind';

export default function HeroImage() {
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
