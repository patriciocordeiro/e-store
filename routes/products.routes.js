module.exports = function(app, express, produtos) {
    var router = express.Router();

    router.get('/produtos', produtos.all)
    router.post('/produtos/:categoria', produtos.category);
    router.post('/produtos/:categoria/filtro_comum', produtos.filtroComum);
    router.post('/produtos/:categoria/filtro_faixa', produtos.filtroFaixa);
    router.post('/produtos/tv/:id', produtos.unico);
    router.post('/produtos/myKart/:id', produtos.myKart);


    app.use('/', router);
}