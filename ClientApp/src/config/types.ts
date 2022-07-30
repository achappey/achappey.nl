export interface IProfile {
    id: string
    username: string
    url: string
    createdAt?: Date
    updatedAt?: Date
    network: string
    descriptions?: string[]
}

export interface IActivity {
    id: string
    title: string
    network: string
    createdAt: string
}

export const Twitter = "Twitter"
export const Duolingo = "Duolingo"
export const LinkedIn = "LinkedIn"
export const Lastfm = "Last.fm"
export const WakaTime = "WakaTime"
export const GitHub = "GitHub"

