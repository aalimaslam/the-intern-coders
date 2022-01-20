from email.message import Message
from django.shortcuts import render
from .settings import BASE_DIR

db_file = str(BASE_DIR) + "/dbfile.csv"

def Home(request):
    return render(request,"index.html")


def get_admission(request):
    if request.method == "POST":
        file = open(db_file, 'a')
        name = request.POST.get("name")
        phone = request.POST.get("phone")
        course = request.POST.get("course")
        course2 = request.POST.get("course2")
        data = name + "," + phone+','+course+","+course2+"\n"
        file.write(data)
        file.close()
        print(name,phone,course, course2)
    return render(request,"admission.html")