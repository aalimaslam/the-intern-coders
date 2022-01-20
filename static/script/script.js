const $ = s => document.querySelector(s);
const studentName = $("#name");
const course = $("#course");
const secondCourse = $("#secondCourse");
const form = $("#form");
const link = $("#link")
form.addEventListener("submit", e=>{
    e.preventDefault();

    if(studentName.value == '' && course.value == '') {
        alert("Enter The Details");
        return;
    }
    const admit = new Admission(studentName.value,course.value,secondCourse.value,link)

    link.onclick = ()=>{
        if(link.href == '#'){
            alert("Click On Generate!");
            return;
        }
        admit.saveDetails();
    }
})

class Admission{
    course = {
        courseTaken : '',
        courseAmount : '',
        secondaryCourses : {
            secondaryCourseTaken : '',
            secondaryCourseAmount : ''
        }
    }

    
    constructor(name="unnamed",courseName="basics",secondCourse = "", link,admissionNumber = new Date().getTime()){
        this.name = name; 
        this.courseName = courseName
        this.secondCourse = secondCourse;
        this.link = link
        this.admissionNumber = admissionNumber

        if(this.courseName != ''){
            
            if(this.courseName.toLowerCase() == "basics" || this.courseName.toLowerCase() == "basic"){
                this.course.courseTaken = "Basics"
                this.course.courseAmount = "1500"
            }
            else if(this.courseName.toLowerCase() == "web design" || this.courseName.toLowerCase() == "web designing" || this.courseName == "web dev" || this.courseName == "web" || this.courseName == "web development"){
                this.course.courseTaken = "Web Development"
                this.course.courseAmount = "3500"
            }
            else if(this.courseName.toLowerCase() == "c" || this.courseName.toLowerCase() == "basic c programming" || this.courseName.toLowerCase() == "basic c" || this.courseName.toLowerCase() == "c programming"){
                this.course.courseTaken = "Basic C Programming"
                this.course.courseAmount = "2000"
            }    
        }

        if(this.secondCourse != '' && this.courseName != ''){
            if(this.secondCourse.toLowerCase() == "basics" || this.secondCourse.toLowerCase() == "basic"){
                this.course.secondaryCourses.secondaryCourseTaken = "Basics"
                this.course.secondaryCourses.secondaryCourseAmount = "1500"
            }
            else if(this.secondCourse.toLowerCase() == "web design" || this.secondCourse.toLowerCase() == "web designing" || this.secondCourse == "web dev" || this.secondCourse == "web" || this.secondCourse == "web development"){
                this.course.secondaryCourses.secondaryCourseTaken = "Web Development"
                this.course.secondaryCourses.secondaryCourseAmount = "3500"
            }
            else if(this.secondCourse.toLowerCase() == "c" || this.secondCourse.toLowerCase() == "basic c programming" || this.secondCourse.toLowerCase() == "basic c" || this.secondCourse.toLowerCase() == "c programming"){
                this.course.secondaryCourses.secondaryCourseTaken = "Basic C Programming"
                this.course.secondaryCourses.secondaryCourseAmount = "2000"
            }
        }
    }
    getStudentName(){
        return this.name;   
    }
    getStudentDetails(){
        let details = ''
        if(this.secondCourse != ''){
            details = `${this.name}'s Admission Number is ${this.admissionNumber} ; has Taken ${this.course.courseTaken} and ${this.course.secondaryCourses.secondaryCourseTaken} @ ${this.course.courseAmount} and ${this.course.secondaryCourses.secondaryCourseAmount} Respectively; Has admitted on ${new Date().getDate()}/${new Date().getMonth() + 1 }/${new Date().getFullYear()}`
            
        }
        else if(this.courseName != ''){
            details = `${this.name}'s and Admission Number is ${this.admissionNumber} ; has Taken ${this.course.courseTaken} @ ${this.course.courseAmount}`
        }
        console.log(details);
        return details
    }

    getAdmissionNumber(){
        console.log(`${this.name}'s Admission Number is : ${this.admissionNumber}`)
    }
    getCourseDetails(){
        let details = ''
        if(this.secondCourse != ''){
            details = `${this.name} Has Taken ${this.course.courseTaken} with ${this.course.secondaryCourses.secondaryCourseTaken} @ ${this.course.courseAmount} and ${this.course.secondaryCourses.secondaryCourseAmount} Respectively`
            
        }
        else if(this.courseName != ''){
            details = `${this.name} Has Taken ${this.course.courseTaken} @ ${this.course.courseAmount}`;
        }
        console.log(details);
        return details;
    }
    saveDetails(){
        let details = this.makeTextFile()
        console.log(details);

        this.link.href= details;
        this.link.download= details;
    }
    makeTextFile() {
        let textFile = null 
        let details = this.getStudentDetails()
        var data = new Blob([details], {type: 'text/plain'});
        
        // If we are replacing a previously generated file we need to
        // manually revoke the object URL to avoid memory leaks.
        if (textFile !== null) {
            window.URL.revokeObjectURL(textFile);
        }
        
        textFile = window.URL.createObjectURL(data);
        
        // returns a URL you can use as a href
        return textFile;
    };
}


// var textFile = null,