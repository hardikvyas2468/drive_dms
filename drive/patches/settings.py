import frappe


def execute():
    for user in frappe.db.get_list("User", pluck="name"):
        teams = frappe.get_all(
            "dms Team Member",
            pluck="parent",
            filters=[
                ["parenttype", "=", "dms Team"],
                ["user", "=", user],
            ],
        )
        if teams:
            if not frappe.db.exists("dms Settings", {"user": user}):
                frappe.get_doc(
                    {
                        "doctype": "dms Settings",
                        "user": user,
                        "single_click": 1,
                        "default_team": teams[0],
                    }
                ).insert()
