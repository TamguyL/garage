const express = require("express");
const app = express();
const pool = require('mysql2/promise').createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'garage',
  multipleStatements: true,
});
const mio = require('socket.io')
const server = app.listen(8888,() => { console.log('serveur ecoute le port 8888') })
const io = mio(server)

app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'));
app.set("view engine", "ejs");


// -------------------------------------
// -------------- All BdD --------------
app.get("/", function(req, res) {
    pool
        .getConnection()
        .then((conn) => {
            const res = conn.query(
                {   sql:'SELECT * FROM boites;'+
                        'SELECT * FROM carburants;'+
                        'SELECT * FROM marques;'+
                        'SELECT * FROM modeles;'+
                        'SELECT * FROM voitures;'
                },
            );
            conn.release();
            return res;
        })
        .then((result) => {
            res.render('index', {
                                    boites : result[0][0],
                                    carburants : result[0][1],
                                    marques : result[0][2],
                                    modeles : result[0][3],
                                    voitures: result[0][4],
                                })
        })
        .catch((err) => {
            console.log(err);
        });
});

// ------------------------------------
// -------------- Axios ---------------
app.get('/count', function (req, res) {
  pool.getConnection()
    .then((conn) => {
      const res = conn.query(
        {
        sql: 'SELECT COUNT(*) FROM voitures',
        rowsAsArray: true,
      },
    );
      conn.release();
      return res;
    })
    .then((count) => {
      let obj = { count: count[0]}
      res.json(obj);
    })
    .catch((err) => {
      console.log(err);
    });
})
app.get('/groupby', function (req, res) {
  pool.getConnection()
    .then((conn) => {
      const res = conn.query(
        {
        sql: 'SELECT modeles.id_marqu,COUNT(*) FROM voitures INNER JOIN modeles WHERE voitures.id_model = modeles.id_model GROUP BY modeles.id_marqu;'+
        'SELECT * FROM marques;',
        rowsAsArray: true,
      },
    );
      conn.release();
      return res;
    })
    .then((count) => {
      let obj = { count: count[0][0], marque: count[0][1]}
      res.json(obj);
    })
    .catch((err) => {
      console.log(err);
    });
})
app.get('/nrj', function (req, res) {
  pool.getConnection()
    .then((conn) => {
      const res = conn.query(
        {
        sql: 'SELECT modeles.id_marqu,voitures.id_carbu,COUNT(*) FROM voitures INNER JOIN modeles WHERE voitures.id_model = modeles.id_model GROUP BY modeles.id_marqu,voitures.id_carbu;'+
        'SELECT * FROM marques;',
        rowsAsArray: true,
      },
    );
      conn.release();
      return res;
    })
    .then((count) => {
      let obj = { count: count[0][0], marque: count[0][1]}
      res.json(obj);
    })
    .catch((err) => {
      console.log(err);
    });
})
app.get('/nones', function (req, res) {
  pool.getConnection()
    .then((conn) => {
      const res = conn.query(
        {
        sql: 'SELECT voitures.id_model,carburants.carburant FROM voitures INNER JOIN carburants WHERE voitures.id_carbu = carburants.id_carbu && carburants.id_carbu != 2 && voitures.id_boite != 1;'+
        'SELECT modeles.id_model,modeles.modele,marques.marque FROM modeles INNER JOIN marques WHERE modeles.id_marqu = marques.id_marqu;',
        rowsAsArray: false,
      },
    );
      conn.release();
      return res;
    })
    .then((count) => {
      let obj = { voiture: count[0][0], modele : count[0][1]}
      res.json(obj);
    })
    .catch((err) => {
      console.log(err);
    });
})

// ------------------------------------
// -------------- CRUD ----------------
// -------------- cree ----------------
app.post("/ajout_voitu", function (req, res) {
  let modele = req.body.modele;
  let boite = req.body.boite;
  let carbu = req.body.carburant;
  pool.getConnection()
    .then((connect) => {
      const result = connect.query("INSERT INTO voitures(id_model,id_boite,id_carbu) VALUES (?,?,?);",
        [modele,boite,carbu]
      );
      connect.release();
      return result;
    })
    .then(() => {
      console.log('Voiture ajouter')
      res.redirect('/');
    })
    .catch((err) => {
      console.log(err);
    });
})
app.post("/new_marqu", function (req, res) {
  let marqu = req.body.new_marqu;
  pool.getConnection()
    .then((connect) => {
      const result = connect.query("INSERT INTO marques(marque) VALUES (?);",
        [marqu]
      );
      connect.release();
      return result;
    })
    .then(() => {
      console.log('New Marque ajouté')
      res.redirect('/');
    })
    .catch((err) => {
      console.log(err);
    });
})
app.post("/new_model", function (req, res) {
  let id = req.body.id_marqu;
  let model = req.body.new_model;
  pool.getConnection()
    .then((connect) => {
      const result = connect.query("INSERT INTO modeles(id_marqu,modele) VALUES (?,?);",
        [id,model]
      );
      connect.release();
      return result;
    })
    .then(() => {
      console.log('New Model ajouté à la marque '+id)
      res.redirect('/');
    })
    .catch((err) => {
      console.log(err);
    });
})
app.post("/new_carbu", function (req, res) {
  let carbu = req.body.new_carbu;
  pool.getConnection()
    .then((connect) => {
      const result = connect.query("INSERT INTO carburants(carburant) VALUES (?);",
        [carbu]
      );
      connect.release();
      return result;
    })
    .then(() => {
      console.log('New Carburant ajouté')
      res.redirect('/');
    })
    .catch((err) => {
      console.log(err);
    });
})
app.post("/new_boite", function (req, res) {
  let boite = req.body.new_boite;
  pool.getConnection()
    .then((connect) => {
      const result = connect.query("INSERT INTO boites(boite) VALUES (?);",
        [boite]
      );
      connect.release();
      return result;
    })
    .then(() => {
      console.log('New boite ajouté')
      res.redirect('/');
    })
    .catch((err) => {
      console.log(err);
    });
})
// -------- modif / supprime ----------
app.post("/mod_marqu", function (req, res) {
  let id = req.body.id_marqu;
  let marqu = req.body.marqu;
  let btn = req.body.btn;
  if (btn == 'mod') {
    pool.getConnection()
    .then((connect) => {
      const result = connect.query("UPDATE marques SET marque=? WHERE id_marqu=?;",
        [marqu,id]
      );
      connect.release();
      return result;
    })
    .then(() => {
      console.log('Marque '+id+' '+marqu+' Modifier')
      res.redirect('/');
    })
    .catch((err) => {
      console.log(err);
    });
  } else if (btn == 'sup') {
    pool.getConnection()
    .then((connect) => {
      const result = connect.query("DELETE FROM marques WHERE id_marqu=?;",
        [id]
      );
      connect.release();
      return result;
    })
    .then(() => {
      console.log('Marque '+id+' '+marqu+' Supprimé')
      res.redirect('/');
    })
    .catch((err) => {
      console.log(err);
    });
  }
})
app.post("/mod_model", function (req, res) {
  let id_model = req.body.id_model;
  let id_marqu = req.body.id_marqu;
  let model = req.body.model;
  let btn = req.body.btn;
  if (btn == 'mod') {
    pool.getConnection()
    .then((connect) => {
      const result = connect.query("UPDATE modeles SET id_marqu=?,modele=? WHERE id_model=?;",
        [id_marqu,model,id_model]
      );
      connect.release();
      return result;
    })
    .then(() => {
      console.log('Modele '+id_model+' '+model+' Modifier')
      res.redirect('/');
    })
    .catch((err) => {
      console.log(err);
    });
  } else if (btn == 'sup') {
    pool.getConnection()
    .then((connect) => {
      const result = connect.query("DELETE FROM modeles WHERE id_model=?;",
        [id_model]
      );
      connect.release();
      return result;
    })
    .then(() => {
      console.log('Modele '+id_model+' '+model+' Supprimé')
      res.redirect('/');
    })
    .catch((err) => {
      console.log(err);
    });
  }
})
app.post("/mod_carbu", function (req, res) {
  let id = req.body.id;
  let carbu = req.body.carbu;
  let btn = req.body.btn;
  if (btn == 'mod') {
    pool.getConnection()
    .then((connect) => {
      const result = connect.query("UPDATE carburants SET carburant=? WHERE id_carbu=?;",
        [carbu,id]
      );
      connect.release();
      return result;
    })
    .then(() => {
      console.log('Carburant '+id+' '+carbu+' Modifier')
      res.redirect('/');
    })
    .catch((err) => {
      console.log(err);
    });
  } else if (btn == 'sup') {
    pool.getConnection()
    .then((connect) => {
      const result = connect.query("DELETE FROM carburants WHERE id_carbu=?;",
        [id]
      );
      connect.release();
      return result;
    })
    .then(() => {
      console.log('Carburant '+id+' '+carbu+' Supprimé')
      res.redirect('/');
    })
    .catch((err) => {
      console.log(err);
    });
  }
})
app.post("/mod_boite", function (req, res) {
  let id = req.body.id;
  let boite = req.body.boite;
  let btn = req.body.btn;
  if (btn == 'mod') {
    pool.getConnection()
    .then((connect) => {
      const result = connect.query("UPDATE boites SET boite=? WHERE id_boite=?;",
        [boite,id]
      );
      connect.release();
      return result;
    })
    .then(() => {
      console.log('Boite '+id+' '+boite+' Modifier')
      res.redirect('/');
    })
    .catch((err) => {
      console.log(err);
    });
  } else if (btn == 'sup') {
    pool.getConnection()
    .then((connect) => {
      const result = connect.query("DELETE FROM boites WHERE id_boite=?;",
        [id]
      );
      connect.release();
      return result;
    })
    .then(() => {
      console.log('Boite '+id+' '+boite+' Supprimé')
      res.redirect('/');
    })
    .catch((err) => {
      console.log(err);
    });
  }
})