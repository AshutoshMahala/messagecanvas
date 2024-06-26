export interface MessagePreview {
    id: number;
    x: number;
    y: number;
    width: number;
    height: number;
    headerText?: string;
    bodyText?: string;
    imageUrl?: string;
    footerText?: string;
    contactUsText?: string;
}