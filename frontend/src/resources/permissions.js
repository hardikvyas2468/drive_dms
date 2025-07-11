import { createResource } from "frappe-ui"
import { toast } from "@/utils/toasts"

export const getUsersWithAccess = createResource({
  url: "dms.api.permissions.get_shared_with_list",
  makeParams: (params) => params,
})

export const updateAccess = createResource({
  url: "dms.api.files.call_controller_method",
  makeParams: (params) => ({ ...params, method: params.method || "share" }),
  onError: () => toast("You can't perform this action"),
})

export const notifCount = createResource({
  url: "/api/method/dms.api.notifications.get_unread_count",
  method: "GET",
  cache: "notif-count",
})

export const settings = createResource({
  url: "/api/method/dms.api.product.get_settings",
  method: "GET",
  cache: "settings",
})

export const setSettings = createResource({
  url: "/api/method/dms.api.product.set_settings",
  method: "POST",
  onSuccess: () => {
    settings.fetch()
  },
})

export const generalAccess = createResource({
  url: "dms.api.permissions.get_user_access",
  auto: false,
})

export const userList = createResource({
  url: "dms.api.permissions.get_shared_with_list",
  auto: false,
})

export const allUsers = createResource({
  url: "dms.api.product.get_all_users",
  method: "GET",
  transform: (data) => {
    data.map((item) => {
      item.value = item.email
      item.label = item.full_name.trimEnd()
    })
  },
})

export const getInvites = createResource({
  url: "dms.api.product.get_invites",
})

export const acceptInvite = createResource({
  url: "dms.api.product.accept_invite",
  onSuccess: (data) => {
    if (data) window.location.replace(data)
    else toast("Added to the team")
  },
})

export const rejectInvite = createResource({
  url: "dms.api.product.reject_invite",
  onSuccess: () => toast("Removed invite"),
})
