/* Importa a biblioteca require e o módulo Node FS */
const { select, input, checkbox } = require("@inquirer/prompts")
const fs = require("fs").promises

/* Declara a variavel mensagem que irá conter os textos apresentados ao usuário */
let mensagem = "Bem vindo ao GoalsCheck!"

/* Declara o array que irá armazena as metas */
let metas

/* Cria a função para buscar no JSON as metas salvas */
const carregarMetas = async() => {
    try{
        const dados = await fs.readFile("metas.json", "utf-8")
        metas = JSON.parse(dados)
    }
    catch(erro) { 
        metas = [] 
    }
}

/* Cria a função que salva no arquivo JSON as adições ou remoções de metas */
const salvarMetas = async() => {
    await fs.writeFile("metas.json", JSON.stringify(metas, null, 2))
}

/* Cria função para cadastrar a meta no sistema */
const cadastrarMeta = async() => {

    const meta = await input({ message: "Digite a meta: "})

    if(meta.length == 0){
        mensagem = "A meta não pode ser vazia!"
        return
    }

    metas.push(
        {value: meta, checked: false}
    )

    mensagem = "Meta cadastrada com sucesso!"

}

/* Cria a função de listar as metas para serem marcadas ou desmarcadas */
const listarMeta = async() => {

    if (metas.length == 0) {
        mensagem = "Não existem metas!"
        return
    }

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
        mensagem = "Nenhuma meta foi adicionada!"
        return
    }

    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta
        })

        meta.checked = true

        mensagem = "Meta(s) marcada(s) como concluída(s)"
    })

}

/* Cria função que imprime as metas concluídas */
const metasRealizadas = async() => {

    const realizadas = metas.filter((meta) => {
        return meta.checked
    })

    if(realizadas.length == 0){
        mensagem = "Nenhuma meta foi realizada! :("
        return
    }

    await select({
        message: "Meta(s) realizada(s): " + realizadas.length,
        choices: [...realizadas]
    })

}

/* Cria função que imprime as metas em aberto */
const metasAbertas = async() => {

    const abertas = metas.filter((meta) => {
        return !meta.checked
    })

    if(abertas.length == 0){
        mensagem = "Não há metas em aberto! :)"
        return
    }

    await select({
        message: "Meta(s) em aberto: " + abertas.length,
        choices: [...abertas]
    })

}

/* Cria função para remover as metas que foram selecionadas */
const removerMetas = async() => {
    
    if (metas.length == 0) {
        mensagem = "Não existem metas!"
        return
    }

    const metasDesmarcadas = metas.map((meta) => {
        return { value: meta.value, checked: false }
    })

    const itensADeletar = await checkbox({
        message: "Selecione as metas que deseja remover",
        choices: [...metasDesmarcadas],
        instructions: false
    })

    if(itensADeletar.length == 0) {
        mensagem = "Nenhuma meta foi selecionada!"
        return
    }

    itensADeletar.forEach((item) => {
        metas = metas.filter((meta) => {
            return meta.value != item
        })
    })

    mensagem = "Meta(s) removida(s) com sucesso!"

}

/* Cria a função para limpar a tela toda vez que uma ação for feita pelo usuário */
const mostrarMensagem = () => {
    console.clear();

    if(mensagem != ""){
        console.log(mensagem)
        console.log("")
        mensagem = ""
    }

}

/* Cria função que vai iniciar o programa e imprimir o menu */
const start = async() => {

    await carregarMetas();

    while(true){

        mostrarMensagem();
        await salvarMetas();

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