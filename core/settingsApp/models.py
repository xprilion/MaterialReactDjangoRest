from django.db import models

class Setting(models.Model):
    bannerImageUrl = models.TextField("Banner Image URL", default="https://picsum.photos/200/400/?blur=2")
    contactMail = models.TextField("Contact Mail", default="admin@localhost")
    mainText = models.TextField("Main Text", blank="", default="You are reading the main text")
    metaTags = models.TextField("Meta Tags", blank="", default="")
    metaDesc = models.TextField("Meta Desc", blank="", default="")
    tracker = models.TextField("Tracker Code", blank="", default="")
    noIndex = models.BooleanField("No Index", default=False)

    class Meta:
        db_table = "settings"