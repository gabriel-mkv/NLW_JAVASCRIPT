/* Importa a biblioteca require */
const { select, input, checkbox } = require("@inquirer/prompts")

/* Declara o array que irá armazena as metas */
let metas = []

/* Cria função para cadastrar a meta no sistema */
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

/* Cria a função de listar as metas para serem marcadas ou desmarcadas */
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

/* Cria função que imprime as metas concluídas */
const metasRealizadas = async() => {

    const realizadas = metas.filter((meta) => {
        return meta.checked
    })

    if(realizadas.length == 0){
        console.log("Nenhuma meta foi realizada! :(")
        return
    }

    await select({
        message: "Metas realizadas: " + realizadas.length,
        choices: [...realizadas]
    })

}

/* Cria função que imprime as metas em aberto */
const metasAbertas = async() => {

    const abertas = metas.filter((meta) => {
        return !meta.checked
    })

    if(abertas.length == 0){
        console.log("Não há metas em aberto! :)")
        return
    }

    await select({
        message: "Metas em aberto: " + abertas.length,
        choices: [...abertas]
    })

}

/* Cria função para remover as metas que foram selecionadas */
const removerMetas = async() => {
    const metasDesmarcadas = metas.map((meta) => {
        return { value: meta.value, checked: false }
    })

    const itensADeletar = await checkbox({
        message: "Selecione as metas que deseja remover",
        choices: [...metasDesmarcadas],
        instructions: false
    })

    if(itensADeletar.length == 0) {
        console.log("Nenhuma meta foi selecionada!")
        return
    }

    itensADeletar.forEach((item) => {
        metas = metas.filter((meta) => {
            return meta.value != item
        })
    })

    console.log("Meta(s) removidas com sucesso!")

}

/* Cria função que vai iniciar o programa e imprimir o menu */
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
                    name: "Metas em aberto",
                    value: "abertas"
                },
                {
                    name: "Remover metas",
                    value: "remover"
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
            case "abertas":
                await metasAbertas();
                break
            case "remover":
                await removerMetas();
                break
            case "sair":
                console.log("Até mais!");
                return
        }
    }
}

start();