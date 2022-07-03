/** @jsx h */
import { h } from 'preact';
import { tw } from '@twind';
import { validDate } from '../utils/validDate.ts';

export const H1Regex = /^(# .*$)/;
export const H2Regex = /^(## .*$)/;
export const H3Regex = /^(### .*$)/;
export const H4Regex = /^(#### .*$)/;
export const H5Regex = /^(##### .*$)/;
export const H6Regex = /^(###### .*$)/;
export const LINKRegex = /(\[.*\])\((.*?)\)/;
export const IMGRegex = /(\!\[.*\])\((.*?)\)/;

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

export function parseImage(text: string): {
    src: string;
    alt: string;
    title: string;
} {
    const imageParts = text?.replace('![', '')?.replace('](', ' ')?.replace(']', '').replace(')', '');

    let [src, alt, title, ..._] = imageParts.split(' ');

    if (!src.includes('http')) {
        try {
            const fullSrc = new URL(`https://${src}`);
            src = fullSrc.href;
        } catch (_error) {
            // not external
        }
    }
    return {
        alt: alt ?? title ?? '',
        src,
        title: title ?? alt ?? '',
    };
}

export function parseLine(line: string) {
    if (H1Regex.test(line)) {
        return <h1 class={tw`text__flip`}>{line?.replace('# ', '')?.trim()}</h1>;
    }

    if (H2Regex.test(line)) {
        return <h2 class={tw`text__flip`}>{line?.replace('## ', '')?.trim()}</h2>;
    }

    if (H3Regex.test(line)) {
        return <h3 class={tw`text__flip`}>{line?.replace('### ', '')?.trim()}</h3>;
    }

    if (H4Regex.test(line)) {
        return <h4 class={tw`text__flip`}>{line?.replace('#### ', '')?.trim()}</h4>;
    }

    if (H5Regex.test(line)) {
        return <h5 class={tw`text__flip`}>{line?.replace('##### ', '')?.trim()}</h5>;
    }

    if (H6Regex.test(line)) {
        return <h6 class={tw`text__flip`}>{line?.replace('###### ', '')?.trim()}</h6>;
    }

    if (LINKRegex.test(line)) {
        const parts = line?.trim()?.split(' ');

        return (
            <p class={tw`text__flip`}>
                {parts.map((p) => {
                    if (LINKRegex.test(p)) {
                        const { linkLocation, linkText } = parseLink(p);

                        return (
                            <a href={linkLocation} target='_blank' rel='noopener noreferrer' class={tw`text__flip`}>
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

    if (IMGRegex.test(line)) {
        const { src, title, alt } = parseImage(line);

        return <img src={src} alt={alt} title={title} />;
    }

    return <p class={tw`text__flip`}>{line?.trim()}</p>;
}

export interface IArticleMetaData {
    title?: string;
    author?: string;
    createdDate?: Date;
    lastUpdatedDate?: Date;
}

export interface IArticle {
    metadata?: IArticleMetaData;
    article: (h.JSX.Element | string)[];
}

export function parseMetaData(data: string): IArticleMetaData {
    const metadata: IArticleMetaData = {};

    for (const line of data.split('\n')) {
        if (line.includes('TITLE:')) {
            metadata.title = line?.replace('TITLE:', '').trim();
        } else if (line.includes('AUTHOR:')) {
            metadata.author = line?.replace('AUTHOR:', '').trim();
        } else if (line.includes('CREATED_DATE:')) {
            const unvalidatedDate = line?.replace('CREATED_DATE:', '')?.trim();
            if (validDate(unvalidatedDate)) {
                metadata.createdDate = new Date(unvalidatedDate);
            }
        } else if (line.includes('UPDATED_DATE:')) {
            const unvalidatedDate = line?.replace('UPDATED_DATE:', '')?.trim();
            if (validDate(unvalidatedDate)) {
                metadata.createdDate = new Date(unvalidatedDate);
            }
        }
    }

    return metadata;
}

export function parseArticle(lines: string) {
    const split = lines?.trim()?.split('\n');

    return split?.map((l) => parseLine(l));
}

function SiteMeta({ author, date }: { author?: string; date?: Date }) {
    return (
        <p class={tw`text-sm text__flip`}>
            {date ? new Intl.DateTimeFormat(undefined, { dateStyle: 'full' }).format(date) : null} by{' '}
            <a class={tw`font-semibold`} href='/'>
                {author ?? 'Mads Hougesen'}
            </a>
        </p>
    );
}

export function parseMarkdown(fileContent: string): IArticle {
    if (fileContent.includes('---')) {
        const [_, metaData, lines] = fileContent?.trim()?.split('---');

        const article = parseArticle(lines);

        const parsedMetaData = parseMetaData(metaData);

        article.splice(1, 0, <SiteMeta date={parsedMetaData.createdDate} author={parsedMetaData.author} />);

        return {
            metadata: parsedMetaData,
            article,
        };
    } else {
        const article = parseArticle(fileContent);

        article.splice(1, 0, <SiteMeta author={'Mads Hougesen'} />);

        return {
            metadata: undefined,
            article,
        };
    }
}
