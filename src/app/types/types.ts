import { User } from "firebase/auth";

// AuthContextの型定義
export interface AuthContextType {
  user: User | null;
  loading: boolean;
}

// IconContextの型定義
export interface IconUrlContextProps {
  iconUrl: string | null;
  setIconUrl: (url: string | null) => void;
}
// ステータスタイプの型定義
export type Status = "wishlist" | "visited" | "favorite";

// お店データの型定義
export interface StoreData {
  id: string;
  name: string;
  place: string;
  instagram: string;
  status: Status;
}

// instagramポストの型定義
export interface InstagramPost {
  caption: string;
  media_url: string;
  permalink: string;
  timestamp: string;
}

// StoreCardコンポーネントの型定義
export interface StoreCardProps {
  storeData: StoreData;
  iconUrl?: string;
  isCompact: boolean;
  onActionClick?: () => void;
  actionLabel?: string;
  actions?: React.ReactNode;
}

// リストへの追加・削除のパラメータの型定義
export interface AddRemoveToListPrams {
  userId: string;
  storeId: string;
  listType: Status;
}

// リスト間移動のパラメータの型定義
export interface MoveToListPrams {
  userId: string;
  storeId: string;
  fromListType: Status;
  toListType: Status;
}

// リストからお店データを取得するパラメータの型定義
export interface GetStoreByListPrams {
  userId: string;
  listType: Status;
}
