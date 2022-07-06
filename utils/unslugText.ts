export default function unslugText(text: string): string {
    const decodedURI = decodeURI(text)?.replaceAll('-', ' ');

    return `${decodedURI[0].toUpperCase()}${decodedURI.slice(1, decodedURI?.length)}`;
}
