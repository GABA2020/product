export interface Resource {
  description: string;
  id: string;
  name: string;
  rating?: null | number;
  onLocker?: boolean;
  picture_name?: string;
  price_from?: null | string;
  price_to?: null | string;
  reviewsCount?: null | number;
  tags?: string[];
}

export interface IComment {
  comment: string;
  createdAt: string | number;
  id: string;
  rating: number;
  specialties: array | null;
  subjects: null;
  title: string;
  usedInTests: array<string>;
  username: string | null;
}
