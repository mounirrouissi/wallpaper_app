export type ItemData = {
  _id: string;
  name: string;
  mainImage: string;
  title: string;
  bucket?:string;
};


export interface Bookmark {
  imageUrl: string;
  // likes: number;
  id: string | undefined;
  // index: string | number[];
  isBookMarked?:Boolean;

}