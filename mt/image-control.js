var firstWatch = true;

document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
        /*document.getElementById('image').setAttribute('style', `max-height: ${document.documentElement.clientHeight - 210}px;`);*/
		
		/*document.getElementById('image').setAttribute('style', `max-height: calc(100vh - 50px);`);*/
        imageZoom('image', 'myresult');
		
    }
};

window.addEventListener("resize", () => {
    /*document.getElementById('image').setAttribute('style', `max-height: ${document.documentElement.clientHeight - 210}px;`);*/
		
	/*document.getElementById('image').setAttribute('style', `max-height: calc(100vh - 50px);`);*/
	/*removeFooter()*/
	/*removeFooter();*/
	/*removeExtraSpace();*/
	/*document.querySelector("body > crowd-form").shadowRoot.querySelector("#actionsContainer > awsui-button > button").addEventListener("click", askCheck);*/
});

window.addEventListener("focusin", () => {
	removeFooter();
	removeExtraSpace();
	document.querySelector("body > crowd-form").shadowRoot.querySelector("#actionsContainer > awsui-button > button").addEventListener("click", askCheck);
});

function removeFooter(){
	var content=document.querySelector("body > crowd-form").shadowRoot.querySelector("#footerContainer > style").innerHTML;
	content=content.replace('background-color: white','background-color: rgba(0,28,36,0.0)');
	content=content.replace('border-top: 1px solid rgba(0,28,36,.25);','border-top: 1px solid rgba(0,28,36,0.0);');
	document.querySelector("body > crowd-form").shadowRoot.querySelector("#footerContainer > style").innerHTML=content;
}

function removeExtraSpace(){
	var all_inputs=document.querySelectorAll("crowd-input")
	for (var i = 0; i < all_inputs.length; i++) { 
		all_inputs[i].shadowRoot.querySelector("#container").shadowRoot.querySelector("div.floated-label-placeholder").hidden=true
	}	
}

function askCheck(){
	setTimeout(showText, 3000);
	setTimeout(removeText, 9000);
}

function showText(){
	var x = document.getElementsByClassName("warning");
	for (i = 0; i < x.length; i++) {
	  x[0].innerText='If it takes too long, check for missing input'
	}
}

function removeText(){
	var x = document.getElementsByClassName("warning");
	for (i = 0; i < x.length; i++) {
	  x[0].innerText=''
	}
}


function imageZoom(imgID, resultID) {
    var img, lens, result, cx, cy, ax = 0, ay = 0;
    img = document.getElementById(imgID);
    result = document.getElementById(resultID);
    /* Create lens: */
    lens = document.createElement("DIV");
    lens.setAttribute("class", "img-zoom-lens");
    /* Insert lens: */
    img.parentElement.insertBefore(lens, img);
    /* Calculate the ratio between result DIV and lens: */
    cx = result.offsetWidth / lens.offsetWidth;
    cy = result.offsetHeight / lens.offsetHeight;
    /* Set background properties for the result DIV */
    result.style.backgroundImage = "url('" + img.src + "')";
    result.style.backgroundSize = (img.width * cx) + "px " + (img.height * cy) + "px";
    /* Execute a function when someone moves the cursor over the image, or the lens: */
    lens.addEventListener("mousemove", moveLens);
    img.addEventListener("mousemove", moveLens);
    /* And also for touch screens: */
    lens.addEventListener("touchmove", moveLens);
    img.addEventListener("touchmove", moveLens);

    document.onkeydown = (evt) => {
        evt = evt || window.event;
        var charCode = evt.keyCode || evt.which;
        var charStr = String.fromCharCode(charCode);
        console.log(charCode);
        if([32, 37, 38, 39, 40].indexOf(charCode) > -1) {
            evt.preventDefault();
        }
        switch(charCode){
            case 37:{
                moveManuallyLens(ax - 40, ay);
            } break;
            case 38:{
                moveManuallyLens(ax, ay - 40);
            } break;
            case 39:{
                moveManuallyLens(ax + 40, ay);
            } break;
            case 40:{
                moveManuallyLens(ax, ay + 40);
            } break;
        }
    };

    function moveLens(e) {
        var pos, x, y;
        /* Prevent any other actions that may occur when moving over the image */
        e.preventDefault();
        /* Get the cursor's x and y positions: */
        pos = getCursorPos(e);
        /* Calculate the position of the lens: */
        x = pos.x - (lens.offsetWidth / 2);
        y = pos.y - (lens.offsetHeight / 2);
        /* Prevent the lens from being positioned outside the image: */
        if (x > img.width - lens.offsetWidth) {x = img.width - lens.offsetWidth;}
        if (x < 0) {x = 0;}
        if (y > img.height - lens.offsetHeight) {y = img.height - lens.offsetHeight;}
        if (y < 0) {y = 0;}
        ax = x;
        ay = y;

        if((x != 0 || y != 0) && firstWatch){
            firstWatch = false;
            result.classList.remove('default');
        }
        /* Set the position of the lens: */
        lens.style.left = x + "px";
        lens.style.top = y + "px";
        /* Display what the lens "sees": */
        result.style.backgroundPosition = "-" + (x * cx) + "px -" + (y * cy) + "px";
    }

    function moveManuallyLens(ex, ey){
        var x, y;
        
        /* Calculate the position of the lens: */
        x = ex;
        y = ey;
        /* Prevent the lens from being positioned outside the image: */
        if (x > img.width - lens.offsetWidth) {x = img.width - lens.offsetWidth;}
        if (x < 0) {x = 0;}
        if (y > img.height - lens.offsetHeight) {y = img.height - lens.offsetHeight;}
        if (y < 0) {y = 0;}
        ax = x;
        ay = y;

        if((x != 0 || y != 0) && firstWatch){
            firstWatch = false;
            result.classList.remove('default');
        }
        /* Set the position of the lens: */
        lens.style.left = x + "px";
        lens.style.top = y + "px";
        /* Display what the lens "sees": */
        result.style.backgroundPosition = "-" + (x * cx) + "px -" + (y * cy) + "px";
    }

    function getCursorPos(e) {
        var a, x = 0, y = 0;
        e = e || window.event;
        /* Get the x and y positions of the image: */
        a = img.getBoundingClientRect();
        /* Calculate the cursor's x and y coordinates, relative to the image: */
        x = e.pageX - a.left;
        y = e.pageY - a.top;
        /* Consider any page scrolling: */
        x = x - window.pageXOffset;
        y = y - window.pageYOffset;
        return {x : x, y : y};
    }
}