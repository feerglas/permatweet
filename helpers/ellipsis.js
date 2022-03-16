export const ellipsisMiddle = (string) => {
  const length = string.length
  const third = Math.floor(length / 3)

  return `${string.substring(0, third)}...${string.substring(length - third, length)}`
}
