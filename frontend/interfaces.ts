export interface Cake {
  id?: number;
  name: string;
  comment: string;
  imageUrl: string;
  yumFactor: number;
}

export interface CakeLinkProps {
  cake: Cake;
}