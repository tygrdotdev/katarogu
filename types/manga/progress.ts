import Manga from "."

export interface MangaProgress {
    collectionId: string
    collectionName: string
    created: string
    current_chapter: number
    current_volume: number
    entry: string
    id: string
    rating: number
    status: string
    updated: string
    user: string
    expand?: {
        entry: Manga
    }
}

