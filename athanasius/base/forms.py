from django import forms

class UploadForm(forms.Form):
    collection = forms.CharField(max_length=100)