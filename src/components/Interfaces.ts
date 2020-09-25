export interface Results {
    _id: number,
    headline: HeadLine,
    multimedia: Multimedia[],
    snippet: string,
    keywords: Keywords[],
    web_url: string
}

export interface HeadLine {
    main: string
}

export interface Multimedia {
    url: string
}

export interface Keywords {
    name: string,
    value: string
}