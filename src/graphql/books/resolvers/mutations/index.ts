import { MutationAddBookArgs } from '../../../../generated'

export const addBook = (_: undefined, { book }: MutationAddBookArgs) => {
  console.log(book)
  return { title: 'true' }
}
