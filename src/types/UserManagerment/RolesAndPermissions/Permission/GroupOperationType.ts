import type OperationType from '@/types/UserManagerment/RolesAndPermissions/Permission/OperationType'

export default interface GroupOperationType {
  id: number
  label: string
  defaultStatus: boolean
  isOverrided: boolean
  currentStatus: boolean
  childOperations: Array<OperationType>
}
