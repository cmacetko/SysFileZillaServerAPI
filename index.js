var express = require("express");
var bodyParser = require("body-parser");
var basicAuth = require('express-basic-auth')
var FilezillaCtrl = require('ctrlfilezillaserver');

const SimpleNodeLogger = require('simple-node-logger'),
opts = {
    logDirectory: __dirname + '/logs/',
    fileNamePattern: 'logs-<DATE>.txt',
    timestampFormat: 'YYYY-MM-DD HH:mm:ss.SSS'
},  
log = SimpleNodeLogger.createRollingFileLogger(opts);

var cfg_porta = 9092;
var cfg_usuarios = { 'AAA': 'BBB', 'CCC': 'DDD' };
var cfg_pathfilezilla = "C:\\Program Files (x86)\\FileZilla Server\\";

const sendRes = function(callback, IsSucesso, data){

	if( IsSucesso == true )
	{
		
		var response = {
        httpcode: 200,
		body: data
		};
		
	}else{
		
		var response = {
        httpcode: 500,
		body: data
		};
		
	}
    
	callback.json(response);

};

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.use(function(req, res, next){

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Credentials", true);

    next();

});

app.use(basicAuth({
    users: cfg_usuarios
}))

app.get("/", function(req, res){

    sendRes(res, false, {"Msg": "Utilize um dos metodos disponiveis"});
    
});

app.post("/contas_listar", function(req, res){

    log.info("-------------------------------------");
    log.info("Funcao: contas_listar");
    log.info("Usuario: " + req.auth.user);
    log.info(req.body);

    console.log("-------------------------------------");
    console.log("Funcao: contas_listar");
    console.log("Usuario: " + req.auth.user);

    FilezillaCtrl.init(cfg_pathfilezilla).then(function(){

        FilezillaCtrl.contas_listar().then(function(DadRet){
    
            console.log(JSON.stringify(DadRet));

            log.info(">>> SUCESSO <<<")
            log.info(JSON.stringify(DadRet))

            sendRes(res, true, DadRet);
        
        }).catch(function(err){
    
            log.warn(err.message);
    
		    sendRes(res, false, {"Msg": err.message});
    
        });
    
    }).catch(function(err){
    
        log.warn(err.message);
    
		sendRes(res, false, {"Msg": err.message});
    
    });

});

app.post("/contas_alterar", function(req, res){

    log.info("-------------------------------------");
    log.info("Funcao: contas_alterar");
    log.info("Usuario: " + req.auth.user);
    log.info(req.body);

    console.log("-------------------------------------");
    console.log("Funcao: contas_alterar");
    console.log("Usuario: " + req.auth.user);

    if( req.body.Conta != "" && req.body.Senha != "" && req.body.Diretorio != "" ) 
	{

        FilezillaCtrl.init(cfg_pathfilezilla).then(function(){

            var InfDad = { Senha: req.body.Senha, Diretorio: req.body.Diretorio, Permissoes: req.body.Permissoes };

            FilezillaCtrl.contas_alterar(req.body.Conta, InfDad).then(function(){
        
                log.info(">>> SUCESSO <<<")

                sendRes(res, true);
            
            }).catch(function(err){
        
                log.warn(err.message);
        
                sendRes(res, false, {"Msg": err.message});
        
            });
        
        }).catch(function(err){
        
            log.warn(err.message);
        
            sendRes(res, false, {"Msg": err.message});
        
        });

    }else{

        log.warn("Existem campos nao preenchidos");

        sendRes(res, false, {"Msg": "Existem campos nao preenchidos"});
        
    }

});

app.post("/contas_alterar_senha", function(req, res){

    log.info("-------------------------------------");
    log.info("Funcao: contas_alterar_senha");
    log.info("Usuario: " + req.auth.user);
    log.info(req.body);

    console.log("-------------------------------------");
    console.log("Funcao: contas_alterar_senha");
    console.log("Usuario: " + req.auth.user);

    if( req.body.Conta != "" && req.body.Senha != "" ) 
	{

        FilezillaCtrl.init(cfg_pathfilezilla).then(function(){

            FilezillaCtrl.contas_alterar_senha(req.body.Conta, req.body.Senha).then(function(){
        
                log.info(">>> SUCESSO <<<")

                sendRes(res, true);
            
            }).catch(function(err){
        
                log.warn(err.message);
        
                sendRes(res, false, {"Msg": err.message});
        
            });
        
        }).catch(function(err){
        
            log.warn(err.message);
        
            sendRes(res, false, {"Msg": err.message});
        
        });

    }else{

        log.warn("Existem campos nao preenchidos");

        sendRes(res, false, {"Msg": "Existem campos nao preenchidos"});
        
    }

});

app.post("/contas_alterar_diretorio", function(req, res){

    log.info("-------------------------------------");
    log.info("Funcao: contas_alterar_diretorio");
    log.info("Usuario: " + req.auth.user);
    log.info(req.body);

    console.log("-------------------------------------");
    console.log("Funcao: contas_alterar_diretorio");
    console.log("Usuario: " + req.auth.user);

    if( req.body.Conta != "" && req.body.Diretorio != "" ) 
	{

        FilezillaCtrl.init(cfg_pathfilezilla).then(function(){

            FilezillaCtrl.contas_alterar_diretorio(req.body.Conta, req.body.Diretorio).then(function(){
        
                log.info(">>> SUCESSO <<<")

                sendRes(res, true);
            
            }).catch(function(err){
        
                log.warn(err.message);
        
                sendRes(res, false, {"Msg": err.message});
        
            });
        
        }).catch(function(err){
        
            log.warn(err.message);
        
            sendRes(res, false, {"Msg": err.message});
        
        });

    }else{

        log.warn("Existem campos nao preenchidos");

        sendRes(res, false, {"Msg": "Existem campos nao preenchidos"});
        
    }

});

app.post("/contas_alterar_permissoes", function(req, res){

    log.info("-------------------------------------");
    log.info("Funcao: contas_alterar_permissoes");
    log.info("Usuario: " + req.auth.user);
    log.info(req.body);

    console.log("-------------------------------------");
    console.log("Funcao: contas_alterar_permissoes");
    console.log("Usuario: " + req.auth.user);

    if( req.body.Conta != "" ) 
	{

        FilezillaCtrl.init(cfg_pathfilezilla).then(function(){

            FilezillaCtrl.contas_alterar_permissoes(req.body.Conta, req.body.Permissoes).then(function(){
        
                log.info(">>> SUCESSO <<<")

                sendRes(res, true);
            
            }).catch(function(err){
        
                log.warn(err.message);
        
                sendRes(res, false, {"Msg": err.message});
        
            });
        
        }).catch(function(err){
        
            log.warn(err.message);
        
            sendRes(res, false, {"Msg": err.message});
        
        });

    }else{

        log.warn("Existem campos nao preenchidos");

        sendRes(res, false, {"Msg": "Existem campos nao preenchidos"});
        
    }

});

app.post("/contas_existe", function(req, res){

    log.info("-------------------------------------");
    log.info("Funcao: contas_existe");
    log.info("Usuario: " + req.auth.user);
    log.info(req.body);

    console.log("-------------------------------------");
    console.log("Funcao: contas_existe");
    console.log("Usuario: " + req.auth.user);

    if( req.body.Conta != "" ) 
	{

        FilezillaCtrl.init(cfg_pathfilezilla).then(function(){

            FilezillaCtrl.contas_existe(req.body.Conta).then(function(DadRet){
        
                log.info(">>> SUCESSO <<<")

                sendRes(res, true, DadRet);
            
            }).catch(function(err){
        
                log.warn(err.message);
        
                sendRes(res, false, {"Msg": err.message});
        
            });
        
        }).catch(function(err){
        
            log.warn(err.message);
        
            sendRes(res, false, {"Msg": err.message});
        
        });

    }else{

        log.warn("Existem campos nao preenchidos");

        sendRes(res, false, {"Msg": "Existem campos nao preenchidos"});
        
    }

});

app.post("/contas_deletar", function(req, res){

    log.info("-------------------------------------");
    log.info("Funcao: contas_deletar");
    log.info("Usuario: " + req.auth.user);
    log.info(req.body);

    console.log("-------------------------------------");
    console.log("Funcao: contas_deletar");
    console.log("Usuario: " + req.auth.user);

    if( req.body.Conta != "" ) 
	{

        FilezillaCtrl.init(cfg_pathfilezilla).then(function(){

            FilezillaCtrl.contas_deletar(req.body.Conta).then(function(){
        
                log.info(">>> SUCESSO <<<")

                sendRes(res, true);
            
            }).catch(function(err){
        
                log.warn(err.message);
        
                sendRes(res, false, {"Msg": err.message});
        
            });
        
        }).catch(function(err){
        
            log.warn(err.message);
        
            sendRes(res, false, {"Msg": err.message});
        
        });

    }else{

        log.warn("Existem campos nao preenchidos");

        sendRes(res, false, {"Msg": "Existem campos nao preenchidos"});
        
    }

});

app.post("/contas_criar", function(req, res){

    log.info("-------------------------------------");
    log.info("Funcao: contas_criar");
    log.info("Usuario: " + req.auth.user);
    log.info(req.body);

    console.log("-------------------------------------");
    console.log("Funcao: contas_criar");
    console.log("Usuario: " + req.auth.user);

    if( req.body.Conta != "" && req.body.Senha != "" && req.body.Diretorio != "" ) 
	{

        FilezillaCtrl.init(cfg_pathfilezilla).then(function(){

            var InfDad = { Senha: req.body.Senha, Diretorio: req.body.Diretorio, Permissoes: req.body.Permissoes };

            FilezillaCtrl.contas_criar(req.body.Conta, InfDad).then(function(){
        
                log.info(">>> SUCESSO <<<")

                sendRes(res, true);
            
            }).catch(function(err){
        
                log.warn(err.message);
        
                sendRes(res, false, {"Msg": err.message});
        
            });
        
        }).catch(function(err){
        
            log.warn(err.message);
        
            sendRes(res, false, {"Msg": err.message});
        
        });

    }else{

        log.warn("Existem campos nao preenchidos");

        sendRes(res, false, {"Msg": "Existem campos nao preenchidos"});
        
    }

});

app.listen(cfg_porta, function(){ 
    
    console.log("SysFileZillaServerAPI - Porta: "  + cfg_porta);
    console.log("Desenvolvido por PALOMA MACETKO <cmacetko@gmail.com>");

    console.log("--------------");

    log.info("API Iniciada");

});