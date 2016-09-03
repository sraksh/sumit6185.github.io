cal_days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
cal_months_labels = ['Jan', 'Feb', 'March', 'April',
    'May', 'June', 'July', 'August', 'Sept',
    'Oct', 'Nov', 'Dec'
];
cal_current_date = new Date();
curr_month = cal_current_date.getMonth();
curr_year = cal_current_date.getFullYear()

pick = document.querySelector('#txt');
next = document.querySelector('#nextBtn');
previous = document.querySelector('#prevBtn');
//for year skipping
nextYr = document.querySelector('#nextYear');
previousYr = document.querySelector('#prevYear');

next.addEventListener('click', nextAction);
previous.addEventListener('click', previousAction);

//events for year buttons
nextYr.addEventListener('click', nxtYear);
previousYr.addEventListener('click', prevYear);

pick.addEventListener('click', function() {
    createTab(); //initial call on clicking the input field
    toggleTable(); //show/hide on click
    createTab = function() {}; //calling empty function so that createTab is called only once, otherwise td,tr's will be created and appended to already created one
});

/***** show/hide function  ****/
function toggleTable() {
    //console.log('click')
    if (document.querySelector(".calendar-table").style.display == "table") {
        document.querySelector(".calendar-table").style.display = "none";
    } else {

        document.querySelector(".calendar-table").style.display = "table";
    }
}

/***** creating empty td,tr's on the fly  *****/
function createTab() {
    var trow = document.querySelector('.calendar-table');
    var tr, td;
    for (i = 0; i < 6; i++) {
        tr = document.createElement('tr');
        tr.className = "tr-value";
        for (j = 0; j < 7; j++) {
            td = document.createElement('td');
            tr.appendChild(td);
        }
        trow.appendChild(tr);
    }
    populateTable(0); //call to populate the td's with values(dates)
}

function nextAction() {
    populateTable(1, curr_year);
}

function previousAction() {
    populateTable(-1, curr_year);
}

function nxtYear() {
    populateTable(0, curr_year++);
}

function prevYear() {
    populateTable(0, curr_year--);
}

/*****   populating td's with values    *****/
function populateTable(n) {
    console.log('pop')
    curr_month += n;
    //console.log('curr_month: ' + curr_month)
    /********* cyclic calendar  *******/
    if (curr_month == 12) {
        curr_month = curr_month % 12;
        curr_year++;
    } else if (curr_month == -1) {
        curr_month = 11;
        curr_year--;
    }
    //console.log('curr_month manip: ' + curr_month)
    var firstDay = new Date(curr_year, curr_month, 1);
    //console.log('firstDay: ' + firstDay)
    var startingDay = firstDay.getDay();
    // leap year check done here
    var monthLength = cal_days_in_month[curr_month]; //get month length from the predefined array
    /*********  check leap year case  ********/
    if (curr_month == 1) {
        if ((curr_year % 4 == 0 && curr_year % 100 != 0) || curr_year % 400 == 0) {
            monthLength = 29;
        }
    }
    console.log('monthLength: ' + monthLength);
    //table header title
    var monthName = cal_months_labels[curr_month]
    console.log('monthName : ' + monthName)
    mytitle = document.querySelector('.title');
    mytitle.innerHTML = monthName + " " + curr_year; //populate the table header (Aug 2016)
    var cal = document.querySelectorAll('td');
    console.log('startingDay: ' + startingDay);
    for (var i = 0; i < startingDay; i++) {
        cal[i].className = ""; //removing class to remove the hover effect
        cal[i].innerHTML = '&nbsp'; // empty fields before the first date
    }
    console.log('starting spaces end at: ' + i)
    for (; i <= monthLength + startingDay - 1; i++) {
        cal[i].className = "td-value";
        cal[i].innerHTML = i - startingDay + 1;

    }
    console.log('values end at: ' + i)
    for (; i < cal.length; i++) {
        cal[i].className = "";
        cal[i].innerHTML = "&nbsp"; // empty fields after the last date
    }
    //console.log('sent mon: ' + curr_month)
    //chooseDate(curr_month, curr_year);
    new_month = curr_month + 1;
    selected = document.querySelectorAll('td');
    console.log('selected_len: ' + selected.length)
    for (var k = 0; k < selected.length; k++) {
        selected[k].addEventListener("click", chooseDate); //date picker event
    }
}

/*****  Function for date picker  ******/
function chooseDate() {
    console.log('hey');
    if (this.innerHTML != "&nbsp;") {
        day = this.innerHTML;
        mon = new_month;
        if (mon < 10) {
            mon = "0" + mon;
        } else {
            mon = "" + mon;
        }
        if (day < 10) {
            day = "0" + day;
        }
        document.getElementById('txt').value = mon + '/' + day + '/' + curr_year;
    }
    //console.log('disp date: ' + this.innerHTML);
    //console.log('disp mon: ' + new_month);
    toggleTable();
}
