from sqladmin import Admin, ModelView
from .models.user import User


class UserAdmin(ModelView, model=User):
    column_list = [User.id, User.email, User.name, User.role, User.is_active, User.created_at]
    column_searchable_list = [User.email, User.name]
    column_sortable_list = [User.id, User.email, User.name, User.created_at]
    column_default_sort = [(User.created_at, True)]
    can_create = True
    can_edit = True
    can_delete = True
    can_view_details = True
    name = "User"
    name_plural = "Users"
    icon = "fa-solid fa-user"


def setup_admin(app, engine):
    admin = Admin(app, engine, title="無垠科技 Admin")
    admin.add_view(UserAdmin)
    return admin
