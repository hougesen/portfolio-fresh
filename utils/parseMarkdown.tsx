/** @jsx h */
/** @jsxFrag Fragment */
import { h } from 'preact';
import { tw } from '@twind';

export const H1Regex = /^(# .*$)/;
export const H2Regex = /^(## .*$)/;
export const H3Regex = /^(### .*$)/;
export const H4Regex = /^(#### .*$)/;
export const H5Regex = /^(##### .*$)/;
export const H6Regex = /^(###### .*$)/;
export const LINKRegex = /(\[.*\])\((.*?)\)/;

export function parseLink(text: string): { linkText: string; linkLocation: string } {
    const linkParts = text?.replace('[', '')?.replace('](', ' ')?.replace(']', '').replace(')', '');

    const [linkText, linkLocation, ..._] = linkParts.split(' ');

    if (linkLocation.includes('http') === false) {
        try {
            const url = new URL(`https://${linkLocation}`);

            return {
                linkText,
                linkLocation: url.href,
            };
        } catch (_) {
            // new URL will throw an error if it isn't a valid url
        }
    }

    return {
        linkText,
        linkLocation,
    };
}

export function parseLine(line: string) {
    if (H1Regex.test(line)) {
        return <h1>{line?.replace('# ', '')?.trim()}</h1>;
    }

    if (H2Regex.test(line)) {
        return <h2>{line?.replace('## ', '')?.trim()}</h2>;
    }

    if (H3Regex.test(line)) {
        return <h3>{line?.replace('### ', '')?.trim()}</h3>;
    }

    if (H4Regex.test(line)) {
        return <h4>{line?.replace('#### ', '')?.trim()}</h4>;
    }

    if (H5Regex.test(line)) {
        return <h5>{line?.replace('##### ', '')?.trim()}</h5>;
    }

    if (H6Regex.test(line)) {
        return <h6>{line?.replace('###### ', '')?.trim()}</h6>;
    }

    if (LINKRegex.test(line)) {
        const parts = line?.trim()?.split(' ');

        return (
            <p>
                {parts.map((p) => {
                    if (LINKRegex.test(p)) {
                        const { linkLocation, linkText } = parseLink(p);

                        return (
                            <a
                                href={linkLocation}
                                target='_blank'
                                rel='noopener noreferrer'
                                class={tw`underline`}
                                style={{ textDecoration: 'underline !important' }}
                            >
                                {' '}
                                {linkText}{' '}
                            </a>
                        );
                    } else {
                        return ` ${p} `;
                    }
                })}
            </p>
        );
    }

    return <p>{line?.trim()}</p>;
}

export function parseMetaData(data: string) {}

export function parseMarkdown(fileContent: string) {
    const lines = fileContent?.split('\n');

    return <article class={tw`prose lg:prose-xl`}>{lines?.map((l) => parseLine(l))}</article>;
}
