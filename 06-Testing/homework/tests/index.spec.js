const session = require('supertest-session');
const app = require('../index.js'); // Importo el archivo de entrada del server de express.

const agent = session(app);

describe('Test de APIS', () => {
  describe('GET /', () => {
    it('responds with 200', () => agent.get('/').expect(200));
    it('responds with and object with message `hola`', () =>
        agent.get('/').then((res) => {
          expect(res.body.message).toEqual('hola');
        }));
  });

  describe('GET /test', () => {
    it('responds with 200', () => agent.get('/test').expect(200));
    it('responds with and object with message `test`', () =>
      agent.get('/test').then((res) => {
        expect(res.body.message).toEqual('hola');
      }));
  });

  describe('POST /sum', () => {
    it('responds with 200', () => agent.post('/sum').expect(200));
    it('responds with the sum of 2 and 3', () =>
      agent.post('/sum')
        .send({a: 2, b: 3})
        .then((res) => {
          expect(res.body.result).toEqual(5);
        })
    );
  });

  describe('POST /producto', () => {
    it('responds with 200', () => agent.post('/product').expect(200));
    it('responds with the product of 2 and 3', () =>
      agent.post('/product')
        .send({a: 2, b: 3})
        .then((res) => {
          expect(res.body.result).toEqual(6);
        })
    );
  });

  describe('POST /sumArray', () => {
    it('responds with 200', () => agent.get('/test').expect(200));
    it('responds with and object with message `test`', () =>
      agent.post('/sumArray')
        .send({array: [2,5,7,10,11,15,20], num: 13})
        .then((res) => {
          expect(res.body.result).toEqual(true);
          expect(res.status).toEqual(200)
      }));

    it(`responds with false fi does not found`,()=>
      agent.post('/sumArray')
      .send({array: [2,5,7,10,11,15,20], num: 50})
      .then((res) => {
        expect(res.body.result).toEqual(false);
      })
    )
  })
  describe("POST /NumString",()=>{
    it(`responds with 4 if string is "hola"`,()=>
      agent.post("/numstring")
        .send({string:"hola"})
        .then((res)=>{
          expect(res.body.result).toEqual(4)
          expect(res.status).toEqual(200)
        })
    )
    
    it(`responds with 400 if string empty`,()=>
      agent.post("/numstring").send({string:""}).expect(400)
    )

    it(`responds with 400 if string a number`,()=>
      agent.post("/numstring").send({string:4}).expect(400)
    )
  })

  describe("POST /pluck",()=>{
    it(`responds with: status=200 and works fine`,()=>
      agent.post("/pluck")
        .send({obj:{nombre:"pepe",apellido:"rosas"},propiedad:"nombre"})
        .then((res)=>{
          expect(res.body.array).toEqual(["pepe"])
          expect(res.status).toEqual(200)
        })
    )

    it(`responds with 400 if typeof array isnt array`,()=>
      agent.post("/pluck").send({obj:"hola",propiedad:"hola"}).expect(400)
    )

    it(`responds with 400 if dosnt hav string`,()=>
      agent.post("/pluck").send({obj:{nombre:"pepe",apellido:"rosas"},propiedad:""}).expect(400)
    )

  })
});

