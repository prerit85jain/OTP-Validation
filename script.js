const inputs = document.querySelectorAll("input"),
button = document.querySelector("button"),
expire = document.getElementById("expire");

let OTP="", expireInterval="";

generateOTPs();
function generateOTPs() {
	OTP=
		Math.floor(Math.random()*10)+
		""+
		Math.floor(Math.random()*10)+
		""+
		Math.floor(Math.random()*10)+
		""+
		Math.floor(Math.random()*10);

	alert("Your OTP is: " + OTP);

	inputs[0].focus();
	expire.innerText = 10;
	expireInterval = setInterval(function(){
		expire.innerText--;
		if(expire.innerText == 0){
			clearInterval(expireInterval);
			button.setAttribute("disabled", true);
			button.classList.remove("active");
		}
	},1000);
}

function clearOTPs() {
	inputs.forEach((input) => {
		input.value="";
		input.setAttribute("disabled", true);
	});
	clearInterval(expireInterval);
	expire.innerText = 0;
	button.setAttribute("disabled", true);
	button.classList.remove("active");
}

inputs.forEach((input, index)=>{
	input.addEventListener("keyup", function(e){
		const currentinput = input,
		nextInput = input.nextElementSibling,
		prevInput = input.previousElementSibling;

		if(nextInput && nextInput.hasAttribute("disabled") && currentinput.value!==""){
			nextInput.removeAttribute("disabled", true);
			nextInput.focus();
		}

		if(e.key === "Backspace"){
			inputs.forEach((input, index1)=>{
				if(index<=index1 && prevInput){
					input.setAttribute("disabled", true);
					prevInput.focus();
					prevInput.value = "";
				}
			})
		}

		if(inputs[3].disabled && inputs[3].value !== ""){
			inputs[3].blur();
			button.classList.add("active");
			return;
		}
		button.classList.remove("active");
	});
});

button.addEventListener("click",()=>{
	let verify="";
	inputs.forEach((input) => {
		verify +=input.value;
	});
	if(verify === OTP){
		alert("Correct");
		clearOTPs();
	}
	else{
		alert("Incorrect");
	}
});