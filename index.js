const { select } = require("@inquirer/prompts")

const start = async() => {

    while(true){
        
        const opc = await select({
            message: "Menu  >",
            choices: [
                {
                    name: "Cadastrar meta",
                    value: "cadastrar"
                },
                {
                    name: "Listar metas",
                    value: "listar"
                },
                {
                    name: "Sair",
                    value: "sair"
                },
            ]
        })

        switch(opc){
            case "cadastrar":
                console.log("Vamos cadastrar");
                break
            case "listar":
                console.log("Vamos listar");
                break
            case "sair":
                console.log("Até mais!");
                return
        }
    }
}

start();