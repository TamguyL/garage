count.addEventListener("click", (event) =>{
    axios.get("/count").then(response => {
        document.getElementById("divcount").innerHTML = '<p>Le nombre totals de voitures est de '+response.data.count+'<p>'
        })
})
group.addEventListener("click", (event) =>{
    axios.get("/groupby").then(response => {
        document.getElementById("divgroup").innerHTML = '<h3>Nombre par Marques</h3>'
        response.data.marque.forEach( m =>{
            response.data.count.forEach( c =>{
                if (c[0] == m[0]) {
                    document.getElementById("divgroup").innerHTML += '<p>Le nombre total de '+m[1]+' est de '+c[1]+'<p>'
                }
            });
        });        
    })
})
nrj.addEventListener("click", (event) =>{
    axios.get("/nrj").then(response => {
        document.getElementById("divnrj").innerHTML = '<h3>Trie par marque et NRJ</h3>'
        response.data.marque.forEach( m =>{
            response.data.count.forEach( c =>{
                if (c[0] == m[0]) {
                    if (c[1] == '1') {
                        document.getElementById("divnrj").innerHTML += '<p>Le nombre total de '+m[1]+' diesel est de '+c[2]+'<p>'
                    } else if (c[1] == '2') {
                        document.getElementById("divnrj").innerHTML += '<p>Le nombre total de '+m[1]+' esssence est de '+c[2]+'<p>'
                    } else if (c[1] == '3') {
                        document.getElementById("divnrj").innerHTML += '<p>Le nombre total de '+m[1]+' hydrogène est de '+c[2]+'<p>'
                    } else {
                        document.getElementById("divnrj").innerHTML += '<p>Le nombre total de '+m[1]+' GPL est de '+c[2]+'<p>'
                    }
                }
            });
        });        
    })


            // if (element[0] == 1){
            //     if (element[1] == 1){
            //         document.getElementById("divnrj").innerHTML += '<p>Le nombre totals de Citroen diesel est de '+element[2]+'</p>'
            //     } else if (element[1] == 2) {
            //         document.getElementById("divnrj").innerHTML += '<p>Le nombre totals de Citroen essence est de '+element[2]+'</p>'
            //     } else if (element[1] == 3) {
            //         document.getElementById("divnrj").innerHTML += '<p>Le nombre totals de Citroen hydrogène est de '+element[2]+'</p>'
            //     } else {
            //         document.getElementById("divnrj").innerHTML += '<p>Le nombre totals de Citroen GPL est de '+element[2]+'</p>'
            //     }
            // } else if (element[0] == 2) {
            //     if (element[1] == 1){
            //         document.getElementById("divnrj").innerHTML += '<p>Le nombre totals de Peugeot diesel est de '+element[2]+'</p>'
            //     } else if (element[1] == 2) {
            //         document.getElementById("divnrj").innerHTML += '<p>Le nombre totals de Peugeot essence est de '+element[2]+'</p>'
            //     } else if (element[1] == 3) {
            //         document.getElementById("divnrj").innerHTML += '<p>Le nombre totals de Peugeot hydrogène est de '+element[2]+'</p>'
            //     } else {
            //         document.getElementById("divnrj").innerHTML += '<p>Le nombre totals de Peugeot GPL est de '+element[2]+'</p>'
            //     }
            // } else {
            //     if (element[1] == 1){
            //         document.getElementById("divnrj").innerHTML += '<p>Le nombre totals de Renault diesel est de '+element[2]+'</p>'
            //     } else if (element[1] == 2) {
            //         document.getElementById("divnrj").innerHTML += '<p>Le nombre totals de Renault essence est de '+element[2]+'</p>'
            //     } else if (element[1] == 3) {
            //         document.getElementById("divnrj").innerHTML += '<p>Le nombre totals de Renault hydrogène est de '+element[2]+'</p>'
            //     } else {
            //         document.getElementById("divnrj").innerHTML += '<p>Le nombre totals de Renault GPL est de '+element[2]+'</p>'
            //     }
            // }
})
nones.addEventListener("click", (event) =>{
    axios.get("/nones").then(response => {
        document.getElementById("divnones").innerHTML = '<h3>Listes Voiture :</h3>'
        response.data.modele.forEach( m =>{
            response.data.voiture.forEach( v =>{
                if (v.id_model == m.id_model) {
                    document.getElementById("divnones").innerHTML += '<p>'+m.marque+' '+m.modele+' '+v.carburant+'<p>'
                }
            });
        });
        })
})