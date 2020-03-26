var list = [
    {"desc":"rice", "amount": "1", "value": "5.40"},
    {"desc":"beer", "amount": "12", "value": "1.99"},
    {"desc":"meat", "amount": "1", "value": "15.00"}
]

function getTotal(list){
    var total = 0;
    for(var key in list){
        total += list[key].amount * list[key].value;
    }
    document.getElementById("totalValue").innerHTML = formatValue(total);
    
}
function setList(list){
    var table = '<thead><tr><td> Description</td><td> Amount</td><td> Value</td><td> Action</td></tr></thead><tbody>';
      for(var key in list){
          table += '<tr><td>'+ formatDesc(list[key].desc) +'</td><td>'+formatAmount(list[key].amount)+'</td><td> ' + 
          formatValue(list[key].value)+ '</td><td><button onclick = "setUpdate('+key+');">Edit</button><button onclick = "deleteData('+key+');">Delete</button></td></tr>';
      }
      table+= '</tbody>';
      document.getElementById("listTable").innerHTML = table;
      getTotal(list);
      saveListStorage(list);

}
function formatDesc(desc){
    var str = desc.toLowerCase();
    str = str.charAt(0).toUpperCase() + str.slice(1);
    return str;
}
function formatValue(value){
    var str =  parseFloat(value).toFixed(2) + "";
    str = str.replace(".",",");
    str = "$ " + str;
    return str;
}
function formatAmount(amount){
    return parseInt(amount);

}

function addData(){
    if(!validation()){
        return;
    }
    var desc = document.getElementById("desc").value;
    var amount = document.getElementById("amount").value;
    var value = document.getElementById("value").value;
    list.unshift({"desc":desc, "amount": amount, "value":value});
    setList(list);
}

function setUpdate(id){
    if(!validation()){
        return;
    }
    var obj = list[id];
    document.getElementById("desc").value = obj.desc;
    document.getElementById("amount").value = obj.amount;
    document.getElementById("value").value  = obj.value;
    document.getElementById("btnUpdate").style.display = "inline-block";
    document.getElementById("btnAdd").style.display = "none";
    document.getElementById("inputIDUpdate").innerHTML = '<input id="idUpdate" type="hidden" value="'+id+'">';

}
function resetForm(){
    document.getElementById("desc").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("value").value = "";
    document.getElementById("btnUpdate").style.display = "none";
    document.getElementById("btnAdd").style.display = "inline-block";

    document.getElementById("inputIDUpdate").innerHTML = "";
    document.getElementById("errors").style.display = "none";
}
function updateData(){
    var id  = document.getElementById("idUpdate").value;
    var desc = document.getElementById("desc").value;
    var amount = document.getElementById("amount").value;
    var value = document.getElementById("value").value;
    list[id] = {"desc": desc, "amount": amount, "value" : value};
    resetForm();
    setList(list);
}
function deleteData(id){
    if(confirm("Delete this item?")){
        if(id === list.length - 1){
            list.pop;
        }
        else if(id === 0){
            list.shift();
        }
        else{
            var arrAux1 = list.slice(0, id);
            var arrAux2 = list.slice(id+1);
            list = arrAux1.concat(arrAux2);
        }
        setList(list);

    }

}
function validation(){
    document.getElementById("desc").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("value").value = "";
    document.getElementById("btnUpdate").style.display = "none";
    document.getElementById("btnAdd").style.display = "inline-block";

    document.getElementById("inputIDUpdate").innerHTML = "";
    document.getElementById("errors").style.display = "none";

   if(errors != ""){
        document.getElementById("errors").style.display = "block";
        document.getElementById("errors").style.backgroundColor = "rgba(85, 85, 85, 0.3)";
        document.getElementById("errors").style.color = "white";
        document.getElementById("errors").style.padding = "10px";
        document.getElementById("errors").style.margin = "10px";
        document.getElementById("errors").style.borderRadius = "13px";

        document.getElementById("errors").innerHTML = "<h3>Error:</h3>" + errors;
        return 0;
    }else{
        return 1;
    }

}
function deleteLit(){
    if(confirm("Delete this list?")){
        list = []
        setList(list);
    }
}
function saveListStorage(list){
    var jsonStr = JSON.stringify(list);
    localStorage.setItem("list", jsonStr);
}
function initListStorage(){
    var testList = localStorage.getItem("list");
    if(testList){
        list = JSON.parse(testList);
    }
    setList(list);
}
setList(list);
//console.log(getTotal(list));