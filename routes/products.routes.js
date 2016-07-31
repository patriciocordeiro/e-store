module.exports = function(app, express, produtos) {
    var router = express.Router();

    router.post('/produtos', produtos.all)
    router.post('/produtos/:categoria', produtos.category);
    router.post('/produtos/search/search', produtos.es); //elastic search
//    router.post('/produtos/:categoria/filtro_comum', produtos.filtroComum);
    router.post('/produtos/:categoria/filtro_faixa', produtos.filtroFaixa);
    router.post('/produtos/tv/:id', produtos.unico);
    router.post('/produtos/myKart/:id', produtos.myKart);
    router.post('/produtos/reviewProduct/:id', produtos.reviewProduct);
    router.post('/produtos/showRateProduct/:id', produtos.showRatingProduct);


    app.use('/', router);
}
