window.addEventListener('load', ajaxfn);
imgCount = 0;

function ajaxfn() {
    var xmlhttp = new XMLHttpRequest();
    var url = "slider.json";
    Title = document.querySelector('.title');
    imgblock = document.querySelector('#imgSlider');
    t = document.getElementById('title');
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            arr = JSON.parse(xmlhttp.responseText);
            for (var i = 0; i < arr.length; i++) {
                img = document.createElement('img');
                img.src = arr[i].path;
                img.title = arr[i].title;
                imgblock.appendChild(img);
            }
            window.addEventListener("keydown", handleKeyboardNav);

            function handleKeyboardNav(e) {
                var kc = e.keyCode;
                if (kc == 37) slide(1);
                else if (kc == 39) slide(-1);
            }
            window.addEventListener("keydown", titlefn);
            window.addEventListener("click", titlefn);
            titlefn();

            function titlefn() {
                console.log("title click: " + arr[imgCount].title)
                t.innerHTML = arr[imgCount].title;
            }
            imgFrame = 0;
            imgArray = document.querySelectorAll('#imgSlider img');
            var l = document.getElementById('left');
            var r = document.getElementById('right');
            l.addEventListener("click", function() {
                slide(1);
            });
            r.addEventListener("click", function() {
                slide(-1);
            });

            function slide(x) {
                if (imgCount == 4 && x == -1) {
                    imgCount = 0;
                } else if (imgCount == 0 && x == 1) {
                    imgCount = 4;
                } else {
                    imgCount -= x;
                }
                imgFrame += (x * 72);
                imgblock.style.transform = 'translateZ(-551px) rotateY(' + imgFrame + 'deg)';
                console.log('rotateY(' + (imgFrame) + 'opx)')
                console.log("imgCount: " + imgCount)
            }
            one = document.getElementById('1');
            two = document.getElementById('2');
            three = document.getElementById('3');
            four = document.getElementById('4');
            five = document.getElementById('5');
            one.addEventListener('click', function() {
                imgblock.style.transform = 'translateZ(-551px) rotateY(' + (0) + 'deg)';
                console.log('t.inner: ' + arr[3].title);
                t.innerHTML = arr[0].title;
            });
            two.addEventListener('click', function() {
                imgblock.style.transform = 'translateZ(-551px) rotateY(' + (-72) + 'deg)';
                t.innerHTML = arr[1].title;
            });
            three.addEventListener('click', function() {
                imgblock.style.transform = 'translateZ(-551px) rotateY(' + (-144) + 'deg)';
                t.innerHTML = arr[2].title;
            });
            four.addEventListener('click', function() {
                imgblock.style.transform = 'translateZ(-551px) rotateY(' + (-216) + 'deg)';
                t.innerHTML = arr[3].title;
            });
            five.addEventListener('click', function() {
                imgblock.style.transform = 'translateZ(-551px) rotateY(' + (-288) + 'deg)';
                t.innerHTML = arr[4].title;
            });
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}
