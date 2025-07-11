import frappe


def execute():
    frappe.reload_doc("dms", "doctype", "dms Team Member")
    for id in frappe.get_all("dms Team Member"):
        member = frappe.get_doc("dms Team Member", id)
        member.access_level = 2 if member.is_admin else 1
        member.save()
