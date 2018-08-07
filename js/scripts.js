$(document).ready(function () {
    var i = 0;
    i = ADDInput(i);
    $("#btn-add").click(function () {
        i = ADDInput(i);
    });
    $("#btn-calcul").click(function () {
        var tab = [];
        for (var x = 0; x < i; x++) {
            var inp = $("#input" + x).val();
            var pattern = new RegExp("^\-?\d*\.?\d*");

            if (pattern.test(inp) && inp != "") {
                tab.push(parseFloat(inp));
            }
        }
        tab = tab.sort(function (a, b) { return a - b }); 
        var mean_text="(";
        var sort_text="";
        var mode_text="";
        for(var x = 0; x < tab.length; x++){
           mean_text=mean_text+tab[x];
           sort_text=sort_text+tab[x];
           if(x<tab.length-1){
            mean_text+="+";
            sort_text+=",";
           }        
        }
        mode_tab=Mode(tab);
        mode_text=mode_tab[0]+" times :"
        mean_text=mean_text+")/"+tab.length;
        for (var j=0;j<mode_tab[1].length;j++){
           mode_text=mode_text+tab[mode_tab[1][j]];
           if(j<mode_tab[1].length - 1){
               mode_text+=",";
           }
        }
        $("#sort").html("The sorted table is  ترتيب القيم : <mark>" + sort_text+"</mark>");
        $("#min").html("The Min is القيمة الاصغر : <mark>" + tab[0]+"</mark>");
        $("#max").html("The Max is القيمة الاكبر : <mark>" + tab[tab.length - 1]+"</mark>");
       
        $("#mean").html("حساب المعدل "+mean_text+"<br> The Mean  is المعدل  : <mark>" + Mean(tab)+"</mark>");
        $("#median").html("Tha Median(Q2) is الوسيط : <mark>" + Q2(tab)+"</mark>");
        $("#q1").html("The Quartile(Q1) is : <mark>" + Q1(tab)+"</mark>");
        $("#q3").html("The Quartile(Q3) is :<mark>" + Q3(tab)+"</mark>");

        $("#mode").html("The Mode عدد التكرارات is :<mark>" + mode_text+"</mark>");
        $("#range").html("The Range  (MAX - MIN) is نطاق:<mark>" + (tab[tab.length - 1]-tab[0])  +"</mark>");
        $("#q_range").html("The INTERQUARTILE RANGE  (Q3 - Q1) is النطاق الربيعي:<mark>" + (Q3(tab) - Q1(tab))  +"</mark>");
        $("#variance").html("The Variance  is : <mark>" + Variance(tab).toFixed(2)+"</mark>");
        $("#sd").html("The standard deviation  is : <mark>" + Math.sqrt(Variance(tab)).toFixed(2)+"</mark>");
        
    });
    $("#btn-reset").click(function () {
        i = 0;
        $("#tr-thead").html("");
        $("#tr-tbody").html("");
        i = ADDInput(i);
    });
});
function ADDInput(i) {
    var input = "<input class='form-control form-control-md' placeholder='ادخل رقم' type='text' id='input" + i + "' >";
    $("#tr-thead").append("<th>x<sub>"+i+"</sub></th>");
    $("#tr-tbody").append("<td>"+input+"</td>");
    i++;
    return i;
}
function Mean(tab) {
    var somme = 0;
    for (var i in tab) {
        somme = somme + tab[i];
    }
    return (somme / tab.length).toFixed(2);
}
function Q2(tab) {
    if (tab.length % 2 == 0) {
        return (tab[(tab.length / 2) - 1] + tab[tab.length / 2]) / 2;
    }
    return tab[parseInt(tab.length / 2)];
}

function Q1(tab) {
    if (tab.length % 2 == 0) {
        if (tab.length / 2 % 2 == 0) {
            return (tab[(tab.length / 4) - 1] + tab[tab.length / 4]) / 2;
        }
        else {
            return tab[parseInt(tab.length / 4)];
        }

    }
    else {
        if (parseInt(tab.length / 2) % 2 == 0) {
            return (tab[parseInt(tab.length / 4) - 1] + tab[(parseInt(tab.length / 4))]) / 2;
        }
        else {
            return tab[parseInt(tab.length / 4)];
        }
    }

}
function Q3(tab){
    if (tab.length % 2 == 0) {
        if ((tab.length / 2) % 2 == 0) {
            return (tab[(tab.length * 3 / 4) - 1] + tab[tab.length * 3 / 4]) / 2;
        }
        else {
            return tab[parseInt(tab.length * 3 / 4)];
        }
    }
    else {
        if (parseInt(tab.length / 2) % 2 == 0) {
            return (tab[parseInt(tab.length*3 / 4) + 1] + tab[(parseInt(tab.length*3 / 4))]) / 2;
        }
        else {
            return tab[parseInt(tab.length * 3 / 4)];
        }
    }
}
function Mode(tab){
    var nF=0;
    var tab_nF=[];
    var tab_nF_i=[];
    for(var i=0;i<tab.length;i++){
        nF=0;
        for(var j=i;j<tab.length;j++){
            if(tab[i] == tab[j]){
                nF++;
            }           
          }
          tab_nF.push(nF);
    }
    var max=Math.max(...tab_nF);
    
    for(var i=0;i<tab_nF.length;i++){
        if(tab_nF[i] == max){
            tab_nF_i.push(i);
        }
    }
    return [max,tab_nF_i];

}
function Variance(tab){
    var mean=Mean(tab);
    var somme=0;
    for(var i =0;i<tab.length;i++){
        somme+=Math.pow((tab[i]-mean),2);

    }
    return somme/tab.length;
}



