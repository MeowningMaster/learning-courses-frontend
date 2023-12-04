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
  instructor: {
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
    instructor: {
      create: true,
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
      enroll: true,
      operate: true,
    },
    template: {
      create: true,
    },
    instructor: {
      create: false,
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
    instructor: {
      create: false,
    },
  },
}

export function getPermissions(): TypePermissions {
  const { role } = auth.getOrThrow()
  return permissions[role]
}
