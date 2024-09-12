const start = () => {

    while(true){
        let opc = "sair";
        switch(opc){
            case "cadastrar":
                console.log("Vamos cadastrar");
                break
            case "listar":
                console.log("Vamos listar");
                break
            case "sair":
                return
        }
    }
}

start();