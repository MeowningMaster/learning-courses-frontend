import { UserType } from '@/api/commonType'
import { auth } from './auth'

type TypePermissions = {
  navigation: {
    catalog: boolean
    enrolled: boolean
    templates: boolean
  }
  course: {
    create: boolean
    enroll: boolean
    /**
     * delete | finish
     */
    operate: boolean
  }
  template: {
    create: boolean
  }
}

type Permissions = Record<UserType, TypePermissions>

export const permissions: Permissions = {
  ADMIN: {
    navigation: {
      catalog: true,
      enrolled: false,
      templates: true,
    },
    course: {
      create: false,
      enroll: false,
      operate: true,
    },
    template: {
      create: false,
    },
  },
  INSTRUCTOR: {
    navigation: {
      catalog: true,
      enrolled: false,
      templates: true,
    },
    course: {
      create: true,
      enroll: false,
      operate: true,
    },
    template: {
      create: true,
    },
  },
  STUDENT: {
    navigation: {
      catalog: true,
      enrolled: true,
      templates: false,
    },
    course: {
      create: false,
      enroll: true,
      operate: false,
    },
    template: {
      create: false,
    },
  },
}

export function getPermissions(): TypePermissions {
  const { role } = auth.getOrThrow()
  return permissions[role]
}
