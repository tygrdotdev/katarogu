export interface RawManga {
    alternative_titles: {
        [key: string]: string
    }
    authors: string[]
    background: string
    chapters: number
    characters: any[]
    collectionId: string
    collectionName: string
    cover: string
    created: string
    end_date: string
    genres: string[]
    id: string
    media: any[]
    nsfw: string
    start_date: "nsfw" | "suggestive" | "sfw",
    status: "unpublished" | "publishing" | "finished",
    synopsis: string
    title: string
    updated: string
    volumes: number
}

export default interface Manga {
    "id": string,
    "collectionId": string,
    "collectionName": string,
    "created": string
    "updated": string,
    "title": string,
    alternative_titles: {
        [key: string]: string
    }
    "cover": string,
    "volumes": number,
    "chapters": number,
    "synopsis": string,
    "background": string,
    "start_date": string,
    "end_date": string,
    "nsfw": "nsfw" | "suggestive" | "sfw",
    "status": "unpublished" | "publishing" | "finished",
    "authors": string[],
    "genres": string[],
    "media": string[],
    "characters": string[],
}