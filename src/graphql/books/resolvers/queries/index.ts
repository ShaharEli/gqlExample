import { QueryBookArgs } from '../../../../generated'
import { booksMock } from '../../mock'

export const books = () => booksMock

export const book = (_: undefined, { id: bookId }: QueryBookArgs) => {
  return booksMock.find(({ id }) => id === bookId)
}
