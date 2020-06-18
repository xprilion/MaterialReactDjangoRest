from django.contrib import admin

from .models import Setting

class CustomModelAdmin(admin.ModelAdmin):
    def __init__(self, model, admin_site):
        self.list_display = [field.name for field in model._meta.fields]
        super(CustomModelAdmin, self).__init__(model, admin_site)

class SettingAdmin(CustomModelAdmin):
    pass

admin.site.register(Setting, SettingAdmin)