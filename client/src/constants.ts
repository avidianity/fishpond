export const Modes = {
    ADMINISTRATOR: 'administrator',
    BUYER: 'buyer',
    SELLER: 'seller',
} as const;

export const PondStatus = {
    ALL: 'All',
    AVAILABLE: 'For Sale',
    SOLD: 'Sold',
    FOR_RENT: 'For Rent',
} as const;

export const MessageType = {
    TEXT: 'text',
    FILE: 'file',
} as const;

export const PondClass = {
    ALL: 'All',
    A: 'Class A',
    B: 'Class B',
    C: 'Class C',
} as const;
