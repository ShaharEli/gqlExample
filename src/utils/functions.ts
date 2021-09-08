export const promisfy = <T>(func: (...args: any[]) => T) => {
  return (...args: any[]) =>
    new Promise((resolve, reject) => {
      func(...args, (err: Error | null, result: T) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
}
