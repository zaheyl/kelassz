function join(){

    const btn = document.getElementById("joinBtn");

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const kelas = document.getElementById("kelas").value;


    if(!name || !phone || !email || !kelas){

        if(!name){
            document.getElementById("name").style.border="2px solid red";
        }

        if(!phone){
            document.getElementById("phone").style.border="2px solid red";
        }

        if(!email){
            document.getElementById("email").style.border="2px solid red";
        }

        if(!kelas){
            document.getElementById("kelas").style.border="2px solid red";
        }

        return;
    }


    if(!/[A-Z]/.test(name)){
        document.getElementById("name").style.border="2px solid red";
        alert("Enter a valid name as per IC or Passport!");
        return;
    }


    if(phone.replace(/\D/g, "").length < 10){
        document.getElementById("phone").style.border="2px solid red";
        alert("Enter a valid phone number!");
        return;
    }


    if(!email.includes("@")){
        document.getElementById("email").style.border="2px solid red";
        alert("Enter a valid email!");
        return;
    }


    // Change button text
    btn.innerHTML = "Loading QR Payment... Please Wait";
    btn.disabled = true;


    const data={
        name:name,
        phone:phone,
        email:email,
        class:kelas
    };


    fetch("https://script.google.com/macros/s/AKfycbxGPKaGZXTo4atGwGKKtqzH-HPHkVHGcSW318So-5mUUKa58HXWLyUgJAshdzZRIFp3/exec",{

        method:"POST",

        body:JSON.stringify(data),

        headers:{
            "Content-Type":"text/plain"
        }

    })


    .then(response=>response.json())


    .then(result=>{

        if(result.status==="success"){

            document.getElementById("popup").style.display="flex";
            document.body.style.overflow = "hidden";

            document.getElementById("name").value="";
            document.getElementById("phone").value="";
            document.getElementById("email").value="";
            document.getElementById("kelas").selectedIndex=0;

        }

        // Reset button
        btn.innerHTML="Join Us";
        btn.disabled=false;

    })


    .catch(error=>{

        alert("Something went wrong.");

        // Reset button
        btn.innerHTML="Join Us";
        btn.disabled=false;

    });

}

function closePopup(){ 
    document.getElementById("popup").style.display="none";
    document.body.style.overflow = "auto";
 }
