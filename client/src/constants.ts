export const Modes = {
    ADMINISTRATOR: 'administrator',
    BUYER: 'buyer',
    SELLER: 'seller',
} as const;

export const PondStatus = {
    AVAILABLE: 'Available',
    SOLD: 'Sold',
    ON_HOLD: 'On Hold',
} as const;

export const MessageType = {
    TEXT: 'text',
    FILE: 'file',
} as const;
