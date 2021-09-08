export interface IAuthor {
  id: number
  firstName: string
  lastName: string
}
export interface IBook {
  id: number
  title: string
  author: IAuthor
}
