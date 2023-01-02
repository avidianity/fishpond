import { Modes, PondStatus } from '@/constants';
import { MRT_ColumnDef } from 'material-react-table';
import { Administrator } from '@/types/models/administrator/administrator';
import { Buyer } from '@/types/models/administrator/buyer';
import { Seller } from '@/types/models/administrator/seller';

export type ObjectAsType<T> = T[keyof T];

export type Modes = ObjectAsType<typeof Modes>;

export type PondStatus = ObjectAsType<typeof PondStatus>;

export type MaterialIconType =
    | 'filled'
    | 'outlined'
    | 'round'
    | 'sharp'
    | 'two-tone';

export type Token = {
    type: string;
    token: string;
    expiry: number;
};

export type Nullable<T> = T | undefined | null;

export type Image = {
    url: string;
};

export type TableColumns<T extends Record<string, any> = {}> =
    MRT_ColumnDef<T>[];

export type Response<T = any> = {
    data: T;
};

export type SenderType = Modes;

export type Valid = any;

export type User = Administrator | Buyer | Seller;

export type FormMode = 'add' | 'edit';
