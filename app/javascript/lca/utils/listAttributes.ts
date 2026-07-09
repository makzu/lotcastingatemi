export const makeListAttributeId = <
  T extends { id?: string } | string | number,
>(
  t: T,
) => {
  if (typeof t === 'object' && t.id !== undefined) return t.id

  return JSON.stringify(t)
}
