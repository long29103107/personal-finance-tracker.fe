export default interface CategoryType {
  id: string
  name: string
  parentId?: string
  children?: CategoryType[]
}
