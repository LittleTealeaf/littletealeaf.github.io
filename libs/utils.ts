export const filterUnique = <T>(value: T, index: number, self: Array<T>): boolean => self.indexOf(value) === index;

export const BackgroundImage = (url: string, attributes: string = ""): string => `url(${url}) ${attributes}`
