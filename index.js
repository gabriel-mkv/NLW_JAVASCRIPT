const { select, input, checkbox } = require("@inquirer/prompts")

let metas = []

const cadastrarMeta = async() => {
    const meta = await input({ message: "Digite a meta: "})

    if(meta.length == 0){
        console.log("A meta não pode ser vazia!")
        return
    }

    metas.push(
        {value: meta, checked: false}
    )
}

const listarMeta = async() => {
    const respostas = await checkbox
    (
        {
            message: "Setas para mudar de meta, espaço para marcar ou desmarcar e enter para finalizar essa etapa",
            choices: [...metas],
            instructions: false
        }
    )

    metas.forEach((m) => {
        m.checked = false
    })

    if(respostas.length == 0){
        console.log("Nenhuma meta foi adicionada!")
        return
    }

    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta
        })

        meta.checked = true

        console.log("Meta(s) marcadas como concluída(s)")
    })

}

const metasRealizadas = async() => {

    const realizadas = metas.filter((meta) => {
        return meta.checked
    })

    if(realizadas.length == 0){
        console.log("Nenhuma meta foi realizada!")
        return
    }

    await select({
        message: "Metas realizadas:",
        choices: [...realizadas]
    })

}

const start = async() => {

    while(true){
        
        const opc = await select({
            message: "Menu  >\n",
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
                    name: "Metas realizadas",
                    value: "realizadas"
                },
                {
                    name: "Sair",
                    value: "sair"
                },
            ],
        })

        switch(opc){
            case "cadastrar":
                await cadastrarMeta();
                break
            case "listar":
                await listarMeta();
                break
            case "realizadas":
                await metasRealizadas();
                break
            case "sair":
                console.log("Até mais!");
                return
        }
    }
}

start();