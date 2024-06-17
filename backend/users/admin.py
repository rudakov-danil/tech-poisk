from django.contrib import admin
# from django.contrib.auth.admin import UserAdmin
from .models import *


class ContactInline(admin.TabularInline):
    model = Contact
    fields = ('contact_type', 'contact')


class EarlyAccessMemberAdmin(admin.ModelAdmin):
    list_display = ('get_early_access_token', 'email', 'first_name', 'last_name')
    exclude = ('early_access_token',)
    search_fields = ('email', 'first_name', 'last_name', 'contact__contact')
    inlines = (ContactInline,)

    @admin.display(description='early_access_token')
    def get_early_access_token(self, obj):
        return obj.early_access_token.token


class EarlyAccessMemberInline(admin.TabularInline):
    model = EarlyAccessMember
    extra = 0


class EarlyAccessTokenAdmin(admin.ModelAdmin):
    inlines = (EarlyAccessMemberInline,)
    readonly_fields = ('get_early_access_members_count',)

    @admin.display(description='Early access members invited')
    def get_early_access_members_count(self, obj):
        return obj.early_access_members.count()


admin.site.register(EarlyAccessMember, EarlyAccessMemberAdmin)
admin.site.register(EarlyAccessToken, EarlyAccessTokenAdmin)
